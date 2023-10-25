import type { Website } from "@/constants/website";

export type SocialLink = {
  url: string;
  website: keyof typeof Website;
};
