// Client-side interactions: dark mode toggle, mobile nav, search overlay.

interface SearchItem {
  title: string;
  url: string;
  body?: string;
  tags?: string;
  date: string;
}

declare global {
  interface Window {
    __SEARCH_INDEX__: SearchItem[];
  }
}

(function () {
  const themeBtn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');

  themeBtn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
  });

  // Mobile nav toggle
  const navToggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const navLinks = document.querySelector<HTMLElement>('[data-nav-links]');
  navToggle?.addEventListener('click', () => {
    const open = navLinks?.classList.toggle('open');
    navToggle?.setAttribute('aria-expanded', String(Boolean(open)));
  });

  // Search overlay
  const searchToggle = document.querySelector<HTMLButtonElement>('[data-search-toggle]');
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input') as HTMLInputElement | null;
  const results = document.getElementById('search-results');

  if (searchToggle && overlay && input && results) {
    const overlayEl = overlay;
    const inputEl = input;
    const resultsEl = results;

    fetch('/search.json')
      .then((r) => r.json())
      .then((index: SearchItem[]) => {
        window.__SEARCH_INDEX__ = index;
      });

    function openOverlay() {
      overlayEl.classList.add('open');
      inputEl.focus();
    }
    function closeOverlay() {
      overlayEl.classList.remove('open');
    }

    searchToggle.addEventListener('click', openOverlay);
    overlayEl.addEventListener('click', (e: MouseEvent) => {
      if (e.target === overlayEl) closeOverlay();
    });
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeOverlay();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openOverlay();
      }
    });

    inputEl.addEventListener('input', () => {
      const q = inputEl.value.trim().toLowerCase();
      if (!q) {
        resultsEl.innerHTML = '';
        return;
      }
      const found = (window.__SEARCH_INDEX__ || []).filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          (item.body ?? '').toLowerCase().includes(q) ||
          (item.tags ?? '').toLowerCase().includes(q)
        );
      });
      if (found.length === 0) {
        resultsEl.innerHTML = '<li class="search-empty">No results found</li>';
        return;
      }
      const snippet = (text: string, needle: string) => {
        const i = text.toLowerCase().indexOf(needle);
        if (i === -1) return '';
        const start = Math.max(0, i - 48);
        const end = Math.min(text.length, i + needle.length + 72);
        return (start > 0 ? '…' : '') + text.slice(start, end).trim() + (end < text.length ? '…' : '');
      };
      resultsEl.innerHTML = found
        .map((item) => {
          const snip = snippet(item.body ?? '', q);
          const meta = snip ? snip : item.date;
          return (
            '<li><a href="' +
            item.url +
            '">' +
            item.title +
            '<small>' +
            meta +
            '</small></a></li>'
          );
        })
        .join('');
    });
  }

  // Generic filtering driven by FilterLegend's data-filter-group contract:
  // a legend group wires chips to cards ([data-filter-card]) and sections
  // ([data-filter-section]) that share the same group id. Used by the OSS
  // role filter and the Industry/Library type filters.
  const filterGroups = document.querySelectorAll<HTMLElement>('[data-filter-group]');
  filterGroups.forEach((groupEl) => {
    const group = groupEl.getAttribute('data-filter-group') ?? '';
    if (!group) return;
    const buttons = Array.from(groupEl.querySelectorAll<HTMLButtonElement>('button[data-filter-value]'));
    if (buttons.length === 0) return;
    const cards = Array.from(document.querySelectorAll<HTMLElement>(`[data-filter-card="${group}"]`));
    const sections = Array.from(document.querySelectorAll<HTMLElement>(`[data-filter-section="${group}"]`));

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const value = btn.getAttribute('data-filter-value');

        cards.forEach((card) => {
          if (value === 'all' || card.getAttribute('data-filter-value') === value) {
            card.removeAttribute('hidden');
          } else {
            card.setAttribute('hidden', '');
          }
        });

        sections.forEach((section) => {
          const visibleCards = section.querySelectorAll<HTMLElement>(
            `[data-filter-card="${group}"]:not([hidden])`,
          );
          section.hidden = visibleCards.length === 0;
        });
      });
    });
  });

  // Count-up numbers for [data-count-up] stats (starts when scrolled into view)
  const initCountUps = () => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-count-up]'));
    if (!els.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fmt = new Intl.NumberFormat('en-US');
    const easeOutQuad = (t: number) => 1 - Math.pow(1 - t, 2);

    // Longer counts need more time to climb without large per-frame jumps.
    const durationFor = (target: number) =>
      Math.min(2400, 900 + Math.max(0, String(Math.round(target)).length - 2) * 400);

    const run = (el: HTMLElement) => {
      const raw = el.dataset.countTo ?? el.textContent?.replace(/[^\d]/g, '') ?? '0';
      const target = Number(raw);
      if (reduced || Number.isNaN(target)) {
        el.textContent = fmt.format(target);
        return;
      }
      const duration = durationFor(target);
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        el.textContent = fmt.format(Math.round(target * easeOutQuad(p)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              run(entry.target as HTMLElement);
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 },
      );
      els.forEach((el) => io.observe(el));
    } else {
      els.forEach(run);
    }
  };
  initCountUps();
})();

export {};
