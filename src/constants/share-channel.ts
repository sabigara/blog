import type { IconType } from "react-icons";

import { HatenaBookmarkIcon, TwitterFillIcon } from "@/components/icons";

type IShareChannel = {
  Icon: IconType;
  label: string;
};

export const ShareChannel = {
  Twitter: {
    Icon: TwitterFillIcon,
    label: "Twitter",
  },
  Hatena: {
    Icon: HatenaBookmarkIcon,
    label: "Hatena",
  },
  // Clipboard: {
  //   Icon: ClipboardIcon,
  //   label: "Copy URL",
  // },
} as const satisfies Record<string, IShareChannel>;
