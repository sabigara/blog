import type { IconType } from "react-icons";
import {
  TbBrandGithub,
  TbBrandSoundcloud,
  TbBrandTwitter,
} from "react-icons/tb";

import ZennSvg from "@/assets/svg/zenn.svg";

type Website = {
  Icon: IconType;
  hostname: string;
  label: string;
};

export const Website = {
  Twitter: {
    hostname: "twitter.com",
    Icon: TbBrandTwitter,
    label: "Twitter",
  },
  GitHub: {
    hostname: "github.com",
    Icon: TbBrandGithub,
    label: "GitHub",
  },
  SoundCloud: {
    hostname: "soundcloud.com",
    Icon: TbBrandSoundcloud,
    label: "SoundCloud",
  },
  Zenn: {
    hostname: "zenn.dev",
    Icon: ZennSvg,
    label: "Zenn",
  },
} as const satisfies Record<string, Website>;
