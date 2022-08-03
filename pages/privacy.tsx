import siteMetadata from "@/data/siteMetadata"
import { PageSEO } from "@/components/SEO"

export default function Privacy() {
  return (
    <>
      <PageSEO title="Privacy policy" description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Privacy Policy
          </h1>
        </div>
        <div className="container py-12">
          <article className="prose">
            <h2>アクセス解析</h2>
            <p>
              当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。このGoogleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
            </p>
            <p>
              この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関しての詳細はGoogleアナリティクスサービス利用規約やポリシーと規約ページをご覧ください。
            </p>
          </article>
        </div>
      </div>
    </>
  )
}
