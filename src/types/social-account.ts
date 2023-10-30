import type { WebChannel } from "@/constants/web-channel";

export type SocialAccount = {
  channel: keyof typeof WebChannel;
  url: string;
};
