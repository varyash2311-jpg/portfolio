/**
 * Собирает статику для Cloudflare Pages: index.html + images/ + videos/
 * (пути в portfolio_site_varvara_shiryaeva7.html относительные от корня сайта).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const out = path.join(root, 'dist-portfolio');
const htmlSrc = path.join(root, 'portfolio_site_varvara_shiryaeva7.html');
const exhibitionSrc = path.join(root, 'skazki_narodov_sssr_exhibition.html');

if (!fs.existsSync(htmlSrc)) {
    console.error('Не найден:', htmlSrc);
    process.exit(1);
}

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.copyFileSync(htmlSrc, path.join(out, 'index.html'));

if (fs.existsSync(exhibitionSrc)) {
    const skazkiOut = path.join(out, 'skazki');
    fs.mkdirSync(skazkiOut, { recursive: true });
    fs.copyFileSync(exhibitionSrc, path.join(skazkiOut, 'index.html'));
    console.log('Выставка: /skazki/');
}

for (const dir of ['images', 'videos']) {
    const src = path.join(root, dir);
    if (fs.existsSync(src)) {
        fs.cpSync(src, path.join(out, dir), { recursive: true });
    }
}

console.log('Готово:', out);
