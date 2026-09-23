-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReferenceLogo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brandName" TEXT NOT NULL,
    "logoUrl" TEXT,
    "link" TEXT,
    "altText" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sourceType" TEXT NOT NULL DEFAULT 'ideasoft_reference',
    "sourceUrl" TEXT
);
INSERT INTO "new_ReferenceLogo" ("active", "altText", "brandName", "id", "link", "logoUrl", "order", "sourceType", "sourceUrl") SELECT "active", "altText", "brandName", "id", "link", "logoUrl", "order", "sourceType", "sourceUrl" FROM "ReferenceLogo";
DROP TABLE "ReferenceLogo";
ALTER TABLE "new_ReferenceLogo" RENAME TO "ReferenceLogo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
