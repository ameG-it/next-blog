import path from "path";
import { writeFile } from "fs/promises";

export async function uploadImage(file: File): Promise<string | null> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name}`;
  const uploadDit = path.join(process.cwd(), "public", "images");
  const filePath = path.join(uploadDit, fileName);
  try {
    await writeFile(filePath, buffer);
    return `/images/${fileName}`;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}
