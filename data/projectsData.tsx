import Link from "@/components/Link"
import React from "react"

type Project = {
  title: string
  description: React.ReactNode
  imgSrc: string
  href: string
}

const projectsData: Project[] = [
  {
    title: "Reaktr",
    description: (
      <>
        アップロードした音楽にリアクティブな動画を生成するサービス。
        <Link href="https://www.producthunt.com/posts/reaktr">Product Huntのデイリー2位</Link>
        を獲得。
        <Link href="https://gigazine.net/news/20220219-reaktr-audio-reactive-video/">Gigazine</Link>
        などのメディアにも多数掲載
      </>
    ),
    imgSrc: "/static/images/reaktr.jpeg",
    href: "https://reaktr.app",
  },
  {
    title: "Lorem JPsum",
    description: (
      <>
        日本語ダミーテキストをマルコフ連鎖で自動生成するサービス。
        <Link href="https://internet.watch.impress.co.jp/docs/yajiuma/1381865.html">
          やじうまWatch
        </Link>
        などに掲載。
      </>
    ),
    imgSrc: "/static/images/lorem.png",
    href: "https://lorem-jpsum.vercel.app",
  },
  {
    title: "ツイヨミ",
    description: "Twitter上のマンガスレッドを見開きでイッキ読みできるサービス。",
    imgSrc: "/static/images/twiyomi.png",
    href: "https://twiyomi.vercel.app",
  },
  {
    title: "なんでも暗記マーカー",
    description: "撮影した教材にマーカーを引いて、自分だけの暗記帳を作れるサービス。",
    imgSrc: "/static/images/ankimarker.png",
    href: "https://ankimarker.vercel.app",
  },
  {
    title: "muu",
    description: "ミュージシャンとしてのスキルを可視化できるバンドメンバー募集サイト。",
    imgSrc: "/static/images/muu.png",
    href: "https://muu.app",
  },
]

export default projectsData
