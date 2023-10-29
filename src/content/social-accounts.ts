import type { SocialAccount } from "@/types/social-account";

// 本当は`content`ディレクトリに入れるべきかもしれないが、Contentlayerを経由するわけではないし
// importは`src`以下からに制限していたほうが良さそうなのでよりあえずここで。
export const socialAccounts = [
  {
    url: "https://twitter.com/_sabigara",
    channel: "Twitter",
  },
  {
    url: "https://soundcloud.com/sabigara",
    channel: "SoundCloud",
  },
  {
    url: "https://github.com/sabigara",
    channel: "GitHub",
  },
  {
    url: "https://zenn.dev/sabigara",
    channel: "Zenn",
  },
  {
    url: "mailto:lemonburst1958@gmail.com",
    channel: "Email",
  },
] as const satisfies readonly SocialAccount[];
