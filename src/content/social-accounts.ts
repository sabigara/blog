import type { SocialAccount } from "@/types/social-account";

export const socialAccounts = [
  {
    url: "https://twitter.com/_sabigara",
    channel: "Twitter",
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
    url: "https://soundcloud.com/sabigara",
    channel: "SoundCloud",
  },
  {
    url: "mailto:lemonburst1958@gmail.com",
    channel: "Email",
  },
] as const satisfies readonly SocialAccount[];
