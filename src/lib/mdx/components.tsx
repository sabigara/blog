import type { MDXComponents } from "mdx/types";

import { MdxImg } from "@/components/mdx-img";
import { MdxLink } from "@/components/mdx-link";
import { Message } from "@/components/message";
import { OgLink } from "@/components/og-link";

export const mdxComponents = {
  a: (props) => <MdxLink {...props} />,
  Image: (props) => <MdxImg {...props} />,
  Message: (props) => <Message {...props} className="my-8" />,
  OgLink,
} satisfies MDXComponents;
