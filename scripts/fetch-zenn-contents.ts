import remarkZennFrontmatter from "@/lib/remark-zenn-frontmatter"
import { getZennContents } from "@/lib/zenn"
import { remark } from "remark"
import remarkFrontmatter from "remark-frontmatter"
import fs from "fs/promises"
import path from "path"
import { format } from "prettier"

const zennDir = path.join("data", "blog", "zenn")

async function main() {
  const contents = await getZennContents()
  await removeFilesInDir(zennDir)

  for (const { fileName, text } of contents) {
    const transformed = await remark()
      .use(remarkFrontmatter)
      .use(remarkZennFrontmatter)
      .process(text)
    await fs.writeFile(
      path.join(zennDir, fileName),
      format(transformed.toString(), { parser: "markdown-nocjsp" })
    )
  }
}

async function removeFilesInDir(dir: string) {
  const files = await fs.readdir(dir)
  for (const file of files) {
    if (file === ".gitkeep") continue
    await fs.unlink(path.join(dir, file))
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
