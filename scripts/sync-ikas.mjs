// ikas iş ortaklığı veri güncellemesi (2026-09-29) — yerel ve canlı SQLite veritabanında aynı şekilde çalışır, tekrar çalıştırmak güvenlidir.
//  - ikas sağlayıcısı, 4 paketi (Lift, Scale, Scale Plus, Premium) ve özellik karşılaştırması (prisma/ikas-catalog.json) eklenir/güncellenir
//  - IdeaSoft ve ikas logoları sağlayıcılara bağlanır; IdeaSoft paketlerindeki "% indirim" etiketleri kaldırılır (fiyat müşteriye özel)
//  - "yalnız IdeaSoft" varsayan birkaç metin, yalnızca hâlâ eski varsayılan haliyle duruyorsa güncellenir (panelden değiştirilmişse dokunulmaz)
//  - "IdeaSoft mu ikas mı?" ve "Fiyatlar neden sitede yok?" soruları SSS'ye eklenir (yoksa)
// Kullanım (uygulama klasöründe ya da better-sqlite3'ün bulunduğu yerde):
//   node sync-ikas.mjs <db-yolu> <ikas-catalog.json>
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";

const [dbPath, catalogPath] = process.argv.slice(2);
if (!dbPath || !catalogPath) {
  console.error("Kullanım: node sync-ikas.mjs <db-yolu> <ikas-catalog.json>");
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

const catalog = JSON.parse(readFileSync(catalogPath, "utf-8"));
const db = new Database(dbPath);
const now = () => new Date().toISOString().replace("Z", "+00:00");
const log = (m) => console.log(`✔ ${m}`);

db.transaction(() => {
  // --- ikas sağlayıcısı ---
  const p = catalog.provider;
  const existing = db.prepare("SELECT id FROM Provider WHERE slug = ?").get(p.slug);
  const providerId = existing?.id ?? "provider-ikas";
  if (existing) {
    db.prepare(`UPDATE Provider SET name=?, logoUrl=?, shortDescription=?, description=?, advantages=?, suitableFor=?, status=?, "order"=?,
      seoTitle=COALESCE(NULLIF(seoTitle,''), ?), seoDescription=COALESCE(NULLIF(seoDescription,''), ?), updatedAt=? WHERE id=?`).run(
      p.name, p.logoUrl, p.shortDescription, p.description, JSON.stringify(p.advantages), p.suitableFor, p.status, p.order, p.seoTitle, p.seoDescription, now(), providerId,
    );
    log("ikas sağlayıcısı güncellendi");
  } else {
    db.prepare(`INSERT INTO Provider (id, slug, name, logoUrl, shortDescription, description, advantages, suitableFor, status, "order", seoTitle, seoDescription, noindex, createdAt, updatedAt)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,0,?,?)`).run(
      providerId, p.slug, p.name, p.logoUrl, p.shortDescription, p.description, JSON.stringify(p.advantages), p.suitableFor, p.status, p.order, p.seoTitle, p.seoDescription, now(), now(),
    );
    log("ikas sağlayıcısı eklendi");
  }
  // Gizli sağlayıcılar ikas'ın arkasına alınır.
  db.prepare(`UPDATE Provider SET "order" = "order" + 2 WHERE status != 'active' AND slug NOT IN ('ideasoft', ?) AND "order" <= ?`).run(p.slug, p.order);
  db.prepare("UPDATE Provider SET logoUrl = '/images/partners/ideasoft.svg' WHERE slug = 'ideasoft' AND (logoUrl IS NULL OR logoUrl = '')").run();

  // --- özellik kategorileri ve özellikler ---
  const featureId = new Map();
  for (const c of catalog.categories) {
    const catId = `ikas-cat-${c.order}`;
    db.prepare(`INSERT INTO FeatureCategory (id, name, "order") VALUES (?,?,?) ON CONFLICT(id) DO UPDATE SET name=excluded.name, "order"=excluded."order"`).run(catId, c.name, c.order);
    for (const f of c.features) {
      const id = `ikas-feature-${f.key}`;
      db.prepare(`INSERT INTO Feature (id, categoryId, name, "order") VALUES (?,?,?,?) ON CONFLICT(id) DO UPDATE SET categoryId=excluded.categoryId, name=excluded.name, "order"=excluded."order"`).run(id, catId, f.name, f.order);
      featureId.set(f.key, id);
    }
  }
  log(`${catalog.categories.length} kategori, ${featureId.size} özellik`);

  // --- paketler ve özellik değerleri ---
  for (const pkg of catalog.packages) {
    const row = db.prepare("SELECT id FROM Package WHERE providerId = ? AND slug = ?").get(providerId, pkg.slug);
    const pkgId = row?.id ?? `ikas-pkg-${pkg.slug}`;
    if (row) {
      db.prepare(`UPDATE Package SET name=?, shortDescription=?, featured=?, "order"=?, active=1,
        seoTitle=COALESCE(NULLIF(seoTitle,''), ?), seoDescription=COALESCE(NULLIF(seoDescription,''), ?), updatedAt=? WHERE id=?`).run(
        pkg.name, pkg.shortDescription, pkg.featured ? 1 : 0, pkg.order, pkg.seoTitle, pkg.seoDescription, now(), pkgId,
      );
    } else {
      db.prepare(`INSERT INTO Package (id, providerId, slug, name, shortDescription, featured, "order", active, seoTitle, seoDescription, createdAt, updatedAt)
        VALUES (?,?,?,?,?,?,?,1,?,?,?,?)`).run(pkgId, providerId, pkg.slug, pkg.name, pkg.shortDescription, pkg.featured ? 1 : 0, pkg.order, pkg.seoTitle, pkg.seoDescription, now(), now());
    }
    for (const c of catalog.categories) {
      for (const f of c.features) {
        const v = f.values[pkg.slug];
        db.prepare(`INSERT INTO PackageFeature (id, packageId, featureId, included, value) VALUES (?,?,?,?,?)
          ON CONFLICT(packageId, featureId) DO UPDATE SET included=excluded.included, value=excluded.value`).run(
          `ikas-pf-${pkg.slug}-${f.key}`, pkgId, featureId.get(f.key), v.included ? 1 : 0, v.value,
        );
      }
    }
    log(`ikas ${pkg.name} paketi`);
  }

  // --- fiyat müşteriye özel: yüzdelik indirim etiketleri kaldırılır ---
  const cleared = db.prepare("UPDATE Package SET campaignLabel = NULL WHERE campaignLabel LIKE '%ndirim%'").run().changes;
  if (cleared) log(`${cleared} paketten indirim etiketi kaldırıldı`);

  // --- yalnız eski varsayılan haliyle duran metinler ---
  const patch = (table, column, from, to, where = "") => {
    const n = db.prepare(`UPDATE ${table} SET ${column} = REPLACE(${column}, ?, ?) WHERE instr(${column}, ?) > 0 ${where}`).run(from, to, from).changes;
    if (n) log(`${table}.${column}: metin güncellendi`);
  };
  db.prepare("UPDATE HomeContent SET heroBadge = 'IdeaSoft ve ikas Resmi İş Ortağı' WHERE heroBadge = 'IdeaSoft Resmi İş Ortağı'").run();
  patch("WhyUsPoint", "description", "göre IdeaSoft paketleri arasından", "göre IdeaSoft ve ikas paketleri arasından");
  patch("Page", "content", "IdeaSoft'un resmi iş ortağı olarak", "IdeaSoft ve ikas'ın resmi iş ortağı olarak");
  patch("Page", "seoDescription", "danışmanlık veren IdeaSoft iş ortağıdır", "danışmanlık veren IdeaSoft ve ikas iş ortağıdır");
  patch("Service", "seoDescription", "IdeaSoft altyapısında e-ticaret sitenizi", "IdeaSoft veya ikas altyapısında e-ticaret sitenizi");
  patch("Service", "seoDescription", "IdeaSoft paket seçimi", "IdeaSoft ve ikas paket seçimi");
  patch("BlogPost", "content", "Güncel içerik ve fiyatları her zaman Paketler sayfamızda bulabilirsiniz.", "Güncel paket içeriklerini Paketler sayfamızda bulabilir, size özel indirimli fiyat için bize ulaşabilirsiniz.");

  // --- SSS ---
  const faqs = [
    {
      id: "faq-ideasoft-ikas",
      question: "IdeaSoft mu ikas mı, hangisini seçmeliyim?",
      answer:
        "İki altyapı da güçlü; doğru seçim ürün yapınıza, satış kanallarınıza ve hedeflerinize bağlı. IdeaSoft geniş tema seçenekleri, gelişmiş SEO araçları ve reklam desteğiyle öne çıkar. ikas ise hazır sanal POS, anlaşmalı kargo fiyatları ve yapay zekâ destekli ürün içerikleriyle hızlı bir başlangıç sağlar. İhtiyacınızı dinleyip size uygun olanı birlikte seçiyoruz.",
      order: 5,
    },
    {
      id: "faq-ozel-fiyat",
      question: "Paket fiyatları neden sitede yazmıyor?",
      answer:
        "IdeaSoft ve ikas iş ortağı olarak her işletmeye seçtiği pakete ve süreye göre özel indirimli fiyat sunuyoruz. WhatsApp'tan ya da teklif formundan paketinizi iletin, size özel fiyatı aynı gün paylaşalım.",
      order: 6,
    },
  ];
  for (const f of faqs) {
    const dup = db.prepare("SELECT id FROM Faq WHERE id = ? OR question = ?").get(f.id, f.question);
    if (!dup) {
      db.prepare(`INSERT INTO Faq (id, question, answer, category, "order", active) VALUES (?,?,?,NULL,?,1)`).run(f.id, f.question, f.answer, f.order);
      log(`SSS eklendi: ${f.question}`);
    }
  }
})();

console.log("\nTamamlandı.");
