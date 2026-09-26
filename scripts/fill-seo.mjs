// SEO başlık/açıklaması boş olan kayıtları prisma/seo-defaults.json'daki metinlerle doldurur. Panelden elle girilmiş dolu
// değerlere dokunmaz; yalnız başlığın sonuna elle eklenmiş "| eticaretus" ekini temizler (site bunu zaten otomatik ekliyor).
// Kullanım (uygulama klasöründe ya da better-sqlite3'ün bulunduğu yerde):
//   node fill-seo.mjs <db-yolu> <seo-defaults.json>
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";

const [dbPath, jsonPath] = process.argv.slice(2);
if (!dbPath || !jsonPath) {
  console.error("Kullanım: node fill-seo.mjs <db-yolu> <seo-defaults.json>");
  process.exit(1);
}

const fromApp = createRequire(process.cwd() + "/");
const fromScript = createRequire(import.meta.url);
const load = (name) => {
  try {
    return fromApp(name);
  } catch {
    return fromScript(name);
  }
};
const Database = load("better-sqlite3");

const TABLES = ["Provider", "Package", "Service", "Page", "BlogPost"];
const LABEL_COLUMN = { Provider: "name", Package: "name", Service: "name", Page: "title", BlogPost: "title" };
const SUFFIX = /\s*[|–—-]\s*eticaretus(\.com\.tr)?\s*$/i;
const empty = (v) => v === null || v === undefined || String(v).trim() === "";

const db = new Database(dbPath);
const defaults = JSON.parse(readFileSync(jsonPath, "utf-8"));
let filled = 0;
const missing = [];

for (const table of TABLES) {
  const rows = db.prepare(`SELECT id, slug, ${LABEL_COLUMN[table]} AS label, seoTitle, seoDescription FROM ${table}`).all();
  const update = db.prepare(`UPDATE ${table} SET seoTitle = ?, seoDescription = ? WHERE id = ?`);
  for (const row of rows) {
    const d = defaults[table]?.[row.slug];
    let title = empty(row.seoTitle) ? (d?.seoTitle ?? null) : String(row.seoTitle).replace(SUFFIX, "").trim();
    const description = empty(row.seoDescription) ? (d?.seoDescription ?? null) : row.seoDescription;
    if (empty(title)) title = null;
    if (title !== row.seoTitle || description !== row.seoDescription) {
      update.run(title, description, row.id);
      filled++;
      console.log(`✔ ${table} / ${row.slug}`);
    }
    if (empty(title) || empty(description)) missing.push(`${table} / ${row.slug} (${row.label})`);
  }
}

console.log(`\n${filled} kayıt güncellendi.`);
if (missing.length > 0) {
  console.log("Hâlâ SEO alanı eksik olan kayıtlar (panelden doldurun):");
  for (const m of missing) console.log(`  - ${m}`);
} else {
  console.log("Tüm kayıtların SEO başlık ve açıklaması dolu.");
}
