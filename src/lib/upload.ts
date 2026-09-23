import "server-only";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

// Production'da UPLOAD_DIR deploy klasörünün dışında kalıcı bir yol olmalı; aksi halde her deploy'da yüklemeler silinir.
export const UPLOAD_DIR = process.env.UPLOAD_DIR ?? path.join(process.cwd(), "public", "uploads");

export async function saveUploadedFile(file: File | null | undefined): Promise<string | null> {
  if (!file || file.size === 0) return null;

  await mkdir(UPLOAD_DIR, { recursive: true });

  const ext = path.extname(file.name) || "";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, safeName), buffer);

  return `/uploads/${safeName}`;
}
