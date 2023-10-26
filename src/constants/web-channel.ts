import type { IconType } from "react-icons";
import {
  TbBrandGithub,
  TbBrandSoundcloud,
  TbBrandTwitter,
  TbMail,
} from "react-icons/tb";

import ZennSvg from "@/assets/svg/zenn.svg";

type IWebChannel = {
  Icon: IconType;
  label: string;
};

export const WebChannel = {
  Twitter: {
    Icon: TbBrandTwitter,
    label: "Twitter",
  },
  GitHub: {
    Icon: TbBrandGithub,
    label: "GitHub",
  },
  SoundCloud: {
    Icon: TbBrandSoundcloud,
    label: "SoundCloud",
  },
  Zenn: {
    Icon: ZennSvg,
    label: "Zenn",
  },
  Email: {
    Icon: TbMail,
    label: "Email",
  },
} as const satisfies Record<string, IWebChannel>;
