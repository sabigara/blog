import remarkZennFrontmatter from '@/lib/remark-zenn-frontmatter'
import { getZennContents } from '@/lib/zenn'
import { remark } from 'remark'
import remarkFrontmatter from 'remark-frontmatter'
import fs from 'fs/promises'
import path from 'path'
import { format } from 'prettier'

async function main() {
  const contents = await getZennContents()
  for (const { fileName, text } of contents) {
    const transformed = await remark()
      .use(remarkFrontmatter)
      .use(remarkZennFrontmatter)
      .process(text)
    await fs.writeFile(
      path.join('data', 'blog', 'zenn', fileName),
      format(transformed.toString(), { parser: 'markdown-nocjsp' })
    )
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
