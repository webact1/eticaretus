-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'main',
    "siteName" TEXT NOT NULL DEFAULT 'eticaretus',
    "logoUrl" TEXT,
    "logoLightUrl" TEXT,
    "logoDarkUrl" TEXT,
    "faviconUrl" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "whatsappNumber" TEXT NOT NULL DEFAULT '905016165900',
    "whatsappMessage" TEXT NOT NULL DEFAULT 'Merhaba, eticaretus.com.tr üzerinden bilgi almak istiyorum.',
    "whatsappAvatarUrl" TEXT,
    "instagramUrl" TEXT,
    "linkedinUrl" TEXT,
    "facebookUrl" TEXT,
    "gtmId" TEXT,
    "ga4Id" TEXT,
    "metaPixelId" TEXT,
    "clarityId" TEXT,
    "gscVerification" TEXT,
    "campaignEnabled" BOOLEAN NOT NULL DEFAULT false,
    "campaignText" TEXT NOT NULL DEFAULT 'Kampanya sona eriyor',
    "campaignEndsAt" DATETIME,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_SiteSettings" ("address", "clarityId", "email", "facebookUrl", "faviconUrl", "ga4Id", "gscVerification", "gtmId", "id", "instagramUrl", "linkedinUrl", "logoDarkUrl", "logoLightUrl", "logoUrl", "metaPixelId", "phone", "siteName", "updatedAt", "whatsappAvatarUrl", "whatsappMessage", "whatsappNumber") SELECT "address", "clarityId", "email", "facebookUrl", "faviconUrl", "ga4Id", "gscVerification", "gtmId", "id", "instagramUrl", "linkedinUrl", "logoDarkUrl", "logoLightUrl", "logoUrl", "metaPixelId", "phone", "siteName", "updatedAt", "whatsappAvatarUrl", "whatsappMessage", "whatsappNumber" FROM "SiteSettings";
DROP TABLE "SiteSettings";
ALTER TABLE "new_SiteSettings" RENAME TO "SiteSettings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
