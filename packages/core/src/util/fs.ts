import fs from 'node:fs'
import path from 'pathe'
import { pascalCase } from 'scule'

export async function ensureDir(folder: string) {
  if (!fs.existsSync(folder)) {
    await fs.promises.mkdir(folder, { recursive: true })
  }
}

export function getPrettyFilename(text: string) {
  return pascalCase(text.replace(/\W+/g, '_'))
}

export async function copyDir(src: string, dest: string) {
  await ensureDir(dest)
  const entries = await fs.promises.readdir(src)

  for (const entry of entries) {
    const srcPath = path.join(src, entry)
    const destPath = path.join(dest, entry)

    fs.statSync(srcPath).isDirectory()
      ? await copyDir(srcPath, destPath)
      : await fs.promises.copyFile(srcPath, destPath)
  }
}
