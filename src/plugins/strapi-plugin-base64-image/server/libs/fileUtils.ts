import fs from "fs/promises";
import path from "path";

export async function writeFile(value: string, fileName: string) {
  await fs.mkdir(path.dirname(fileName), { recursive: true });

  const base64 = value.replace("data:image/webp;base64,", "");
  const bstr = atob(base64);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  fs.writeFile(fileName, Buffer.from(u8arr));
}

export async function deleteFile(file?: string | null) {
  if (!file) {
    return;
  }
  await fs.rm(file.startsWith("/") ? file.substring(1) : file, { force: true });
}
