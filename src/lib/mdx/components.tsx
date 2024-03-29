import type { MDXComponents } from "mdx/types";

import { MdxImg } from "@/components/mdx-img";
import { MdxLink } from "@/components/mdx-link";
import { Message } from "@/components/message";
import { OgLink } from "@/components/og-link";
import { StaticTweet } from "@/components/tweet/static-tweet";

export const mdxComponents = {
  a: (props) => <MdxLink {...props} />,
  Image: (props) => <MdxImg {...props} />,
  Message: (props) => <Message {...props} className="my-8" />,
  OgLink,
  Tweet: StaticTweet,
} satisfies MDXComponents;
