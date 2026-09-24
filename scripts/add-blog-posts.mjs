// Canlı SQLite veritabanına rehber yazılarını ekler (slug varsa dokunmaz).
// Kullanım (sunucuda, uygulama klasörünün içinde better-sqlite3 yüklüyken):
//   node add-blog-posts.mjs /home/KULLANICI/eticaretus-data/prod.db /path/to/blog-posts.json
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { randomBytes } from "node:crypto";

const [dbPath, jsonPath] = process.argv.slice(2);
if (!dbPath || !jsonPath) {
  console.error("Kullanım: node add-blog-posts.mjs <db-yolu> <blog-posts.json>");
  process.exit(1);
}

const require = createRequire(process.cwd() + "/");
const Database = require("better-sqlite3");
const db = new Database(dbPath);
const posts = JSON.parse(readFileSync(jsonPath, "utf-8"));

const find = db.prepare("SELECT id FROM BlogPost WHERE slug = ?");
const insert = db.prepare(
  `INSERT INTO BlogPost (id, slug, title, excerpt, coverImageUrl, content, category, published, seoTitle, seoDescription, publishedAt, createdAt, updatedAt)
   VALUES (@id, @slug, @title, @excerpt, @coverImageUrl, @content, @category, 1, @seoTitle, @seoDescription, @publishedAt, @now, @now)`,
);

for (const p of posts) {
  if (find.get(p.slug)) {
    console.log(`• Zaten var: ${p.slug}`);
    continue;
  }
  insert.run({ id: "c" + randomBytes(11).toString("hex"), now: new Date().toISOString(), ...p });
  console.log(`✔ Eklendi: ${p.slug}`);
}
