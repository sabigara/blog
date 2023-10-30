export const siteConfig = {
  url:
    process.env.NODE_ENV === "production"
      ? "https://sabigara.com"
      : "http://localhost:3700",
} as const;
