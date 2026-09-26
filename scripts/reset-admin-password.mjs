// Canlı SQLite veritabanında admin şifresini sıfırlar. Şifre ekranda görünmeden sorulur (komut geçmişine yazılmaz).
// Kullanım (sunucuda, uygulama klasörünün içinde better-sqlite3 ve bcryptjs yüklüyken):
//   node reset-admin-password.mjs /home/KULLANICI/eticaretus-data/prod.db [kullanıcı-adı]
import { createRequire } from "node:module";

const [dbPath, username = "admin"] = process.argv.slice(2);
if (!dbPath) {
  console.error("Kullanım: node reset-admin-password.mjs <db-yolu> [kullanıcı-adı]");
  process.exit(1);
}

// Paketler önce uygulama klasöründen, yoksa script'in yanındaki node_modules'dan yüklenir
// (Next derlemesi bcryptjs'i koda gömdüğü için sunucudaki uygulama klasöründe bulunmayabilir).
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
const bcrypt = load("bcryptjs");

const ENTER = new Set(["\r", "\n", "\u0004"]);
const BACKSPACE = new Set(["\u007f", "\b"]);
const CTRL_C = "\u0003";

// Karakter karakter okur: yapıştırılan şifre tek parça gelse de doğru işlenir; ikinci soru için artan girdi saklanır.
let leftover = "";
function askHidden(question) {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    process.stdout.write(question);
    if (stdin.isTTY) stdin.setRawMode(true);
    stdin.setEncoding("utf8");
    let value = "";
    const finish = (rest) => {
      if (stdin.isTTY) stdin.setRawMode(false);
      stdin.pause();
      stdin.off("data", consume);
      leftover = rest;
      process.stdout.write("\n");
      resolve(value);
    };
    const consume = (chunk) => {
      for (let i = 0; i < chunk.length; i++) {
        const ch = chunk[i];
        if (ENTER.has(ch)) {
          finish(chunk.slice(i + 1).replace(/^\n/, ""));
          return true;
        }
        if (ch === CTRL_C) {
          process.stdout.write("\n");
          process.exit(1);
        }
        if (BACKSPACE.has(ch)) value = value.slice(0, -1);
        else value += ch;
      }
      return false;
    };
    if (leftover) {
      const pending = leftover;
      leftover = "";
      if (consume(pending)) return;
    }
    stdin.on("data", consume);
    stdin.resume();
  });
}

const db = new Database(dbPath);
const user = db.prepare("SELECT id FROM AdminUser WHERE email = ?").get(username);
if (!user) {
  const all = db.prepare("SELECT email FROM AdminUser").all().map((u) => u.email);
  console.error(`"${username}" adlı yönetici yok. Mevcut: ${all.join(", ") || "(hiç yok)"}`);
  process.exit(1);
}

const password = await askHidden("Yeni şifre: ");
const again = await askHidden("Yeni şifre (tekrar): ");
if (password.length < 8) {
  console.error("Şifre en az 8 karakter olmalı, hiçbir şey değişmedi.");
  process.exit(1);
}
if (password !== again) {
  console.error("Şifreler eşleşmiyor, hiçbir şey değişmedi.");
  process.exit(1);
}

db.prepare("UPDATE AdminUser SET passwordHash = ?, updatedAt = ? WHERE id = ?").run(bcrypt.hashSync(password, 10), new Date().toISOString(), user.id);
console.log(`✔ "${username}" şifresi güncellendi. Yeni şifreyle giriş yapabilirsiniz.`);
process.exit(0);
