import type { IconType } from "react-icons";

import {
  EnvelopIcon,
  GithubIcon,
  SoundcloudIcon,
  TwitterIcon,
  ZennIcon,
} from "@/components/icons";

type IWebChannel = {
  Icon: IconType;
  label: string;
};

export const WebChannel = {
  Twitter: {
    Icon: TwitterIcon,
    label: "Twitter",
  },
  GitHub: {
    Icon: GithubIcon,
    label: "GitHub",
  },
  SoundCloud: {
    Icon: SoundcloudIcon,
    label: "SoundCloud",
  },
  Zenn: {
    Icon: ZennIcon,
    label: "Zenn",
  },
  Email: {
    Icon: EnvelopIcon,
    label: "Email",
  },
} as const satisfies Record<string, IWebChannel>;
