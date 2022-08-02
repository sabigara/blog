import { Octokit } from '@octokit/rest'
import fetch from 'node-fetch'

const owner = 'sabigara'
const repo = 'zenn-contents'
const octokit = new Octokit()

export async function getZennContents(): Promise<{ fileName: string; text: string }[]> {
  const resp = await octokit.repos.getContent({
    owner,
    repo,
    path: 'articles',
  })
  if (!Array.isArray(resp.data)) throw new Error('zenn posts is not an array')

  const files = await Promise.all(
    resp.data.map(async (file) => {
      const text = await fetchAndDecode(file.download_url)
      return { fileName: file.name, text }
    })
  )
  return files
}

async function fetchAndDecode(url: string) {
  const resp = await fetch(url)
  if (resp.status !== 200) {
    throw new Error(`Failed to fetch ${url}: ${resp.status}`)
  }
  return resp.text()
}
