export function extractAsin(url: string): string | null {
  const regex = /\/(?:dp|product|ASIN|e|gp)\/(B[0-9A-Z]{9}|\d{7,9}X)/;
  const match = url.match(regex);
  return match && match[1] ? match[1] : null;
}
