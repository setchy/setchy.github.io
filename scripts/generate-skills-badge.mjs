// Generates the skills badge URL from skills.json
// Run: npm run generate:skills-badge
import { readFileSync } from 'node:fs';

const skills = JSON.parse(readFileSync(new URL('../src/data/skills.json', import.meta.url), 'utf-8'));

const slugs = skills.flatMap((cat) => cat.skills.map((s) => s.slug));

const url = `https://skills.syvixor.com/api/icons?perline=10&i=${slugs.join(',')}`;

console.log('Badge URL:\n');
console.log(url);
console.log('\nMarkdown:\n');
console.log(`[![Skills][skills-badge]][skills-icons]`);
console.log(`\n[skills-icons]: https://github.com/syvixor/skills-icons`);
console.log(`[skills-badge]: ${url}`);
