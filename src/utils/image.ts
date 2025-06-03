import path from "path";
import { writeFile } from "fs/promises";

export async function uploadImahe(file: File): Promise<string | null> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name}`;
  const uploadDit = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadDit, fileName);
  try {
    await writeFile(filePath, buffer);
    return `/uploads/${fileName}`;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}
