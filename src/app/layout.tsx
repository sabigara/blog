import "./globals.css";
import "./prism.css";

import { Inter } from "next/font/google";
import Script from "next/script";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { generateMetadataFactory } from "@/lib/metadata/create-metadata";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link href="/icon.svg" rel="icon" type="image/svg+xml" />
        <link href="/favicon.ico" rel="icon" sizes="any" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
        <link href="/manifest.webmanifest" rel="manifest" />
        <Script
          data-cf-beacon={`{"token": "97727030f84245d7985ffb295d72de53"}`}
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <Header />
        <main className="min-h-screen container px-container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export const generateMetadata = generateMetadataFactory({
  title: {
    default: "Sabigara",
    template: "%s | Sabigara",
  },
  description: "Sabigaraのポートフォリオ/ブログ",
});
