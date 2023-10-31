import type { IconType } from "react-icons";

import { HatenaBookmarkIcon, TwitterIcon } from "@/components/icons";

type IShareChannel = {
  Icon: IconType;
  label: string;
};

export const ShareChannel = {
  Twitter: {
    Icon: TwitterIcon,
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
