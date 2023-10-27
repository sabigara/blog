import "./globals.css";
import "./prism.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { createMetadata } from "@/lib/metadata/create-metadata";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen container px-container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export const metadata: Metadata = createMetadata({
  title: {
    default: "Sabigara",
    template: "%s | Sabigara",
  },
  description: "Sabigaraのポートフォリオサイトです",
});
