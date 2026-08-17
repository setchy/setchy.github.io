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
  const themeIcon = document.querySelector<HTMLElement>('[data-theme-icon]');
  const themeBtn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');

  function applyIcon() {
    if (!themeIcon) return;
    const theme = document.documentElement.getAttribute('data-theme');
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  themeBtn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
    applyIcon();
  });
  applyIcon();

  // Mobile nav toggle
  const navToggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const navLinks = document.querySelector<HTMLElement>('[data-nav-links]');
  navToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
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
      resultsEl.innerHTML = found
        .map((item) => {
          return (
            '<li><a href="' +
            item.url +
            '">' +
            item.title +
            '<small>' +
            item.date +
            '</small></a></li>'
          );
        })
        .join('');
    });
  }

  // OSS role filtering
  const filterButtons = document.querySelectorAll<HTMLButtonElement>('.role-filter');
  if (filterButtons.length) {
    const allCards = document.querySelectorAll<HTMLElement>('.project-card[data-role]');
    const allSections = document.querySelectorAll<HTMLElement>('.project-section[data-category]');

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const role = btn.getAttribute('data-role-filter');

        allCards.forEach((card) => {
          if (role === 'all' || card.getAttribute('data-role') === role) {
            card.removeAttribute('hidden');
          } else {
            card.setAttribute('hidden', '');
          }
        });

        allSections.forEach((section) => {
          const visibleCards = section.querySelectorAll('.project-card:not([hidden])');
          section.hidden = visibleCards.length === 0;
        });
      });
    });
  }
})();

export {};
