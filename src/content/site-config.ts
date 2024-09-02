const isProd = process.env.NODE_ENV === "production";

const staticUrl = isProd
  ? "https://static.sabigara.com"
  : "http://localhost:3700";

export const siteConfig = {
  url: isProd ? "https://sabigara.com" : "http://localhost:3700",
  fontUrl: `${staticUrl}/fonts/NotoSansJP-Bold.ttf`,
} as const;
