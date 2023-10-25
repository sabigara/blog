export function extractDomain(url: string) {
  const domain = url.match(/^https?:\/\/([^/]+)/)
  return domain ? domain[1] : url
}
