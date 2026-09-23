# Hostinger'da Yayına Alma (eticaretus.com.tr)

Bu proje Node.js gerektirir (Next.js sunucu tarafında çalışır). Hostinger'da **VPS** veya
**Node.js Web Apps** destekleyen Business/Cloud plan gerekir; klasik paylaşımlı (Premium/Single) hosting çalışmaz.

## Neden kalıcı klasör?

Veritabanı SQLite dosyasıdır ve panelden yüklenen görseller diske yazılır. Deploy klasörü her güncellemede
yenilenebileceği için bu iki şey **deploy klasörünün dışında** tutulur:

- `DATABASE_URL="file:/var/www/eticaretus-data/prod.db"`
- `UPLOAD_DIR="/var/www/eticaretus-data/uploads"`

## VPS (Ubuntu) adımları

```bash
# 1) Node 22 + araçlar
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git build-essential python3
sudo npm i -g pm2

# 2) Kod
sudo mkdir -p /var/www/eticaretus /var/www/eticaretus-data/uploads
cd /var/www/eticaretus
git clone <REPO_URL> .

# 3) Ortam değişkenleri
cp .env.example .env
nano .env   # SESSION_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, DATABASE_URL, UPLOAD_DIR

# 4) Kurulum (better-sqlite3 sunucuda derlenir; postinstall prisma client üretir)
npm ci
npx prisma migrate deploy --config prisma7.config.ts
npm run seed          # ilk admin + varsayılan içerikler (tekrar çalıştırmak güvenli)
npm run build

# 5) Çalıştır
pm2 start "npm start" --name eticaretus
pm2 save && pm2 startup
```

`SESSION_SECRET` için: `openssl rand -hex 32`

### Nginx + SSL

`/etc/nginx/sites-available/eticaretus`:

```nginx
server {
  server_name eticaretus.com.tr www.eticaretus.com.tr;
  client_max_body_size 10M;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/eticaretus /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d eticaretus.com.tr -d www.eticaretus.com.tr
```

### DNS

Alan adı sağlayıcısında `eticaretus.com.tr` ve `www` için **A kaydı → VPS IP'si**.

## Güncelleme (yeni sürüm)

```bash
cd /var/www/eticaretus
git pull
npm ci
npx prisma migrate deploy --config prisma7.config.ts
npm run build
pm2 restart eticaretus
```

## Yayına almadan önce kontrol listesi

- [ ] `ADMIN_PASSWORD` ve `SESSION_SECRET` güçlü/rastgele
- [ ] Panel → Genel Ayarlar: telefon, e-posta, adres, sosyal medya, GTM/GA4/Clarity kodları
- [ ] Panel → Genel Ayarlar: kampanya geri sayımı **gerçek bitiş tarihiyle** (ya da kapalı)
- [ ] Google Search Console'a `https://eticaretus.com.tr/sitemap.xml` gönder
- [ ] `/admin` yolunu ve `dev.db`/`prod.db` dosyasını yedekle (günlük cron ile `prod.db` + `uploads/` kopyası)
