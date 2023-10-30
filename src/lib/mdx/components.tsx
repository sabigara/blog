import type { MDXComponents } from "mdx/types";
import Image from "next/image";

import { MdxLink } from "@/components/mdx-link";
import { Message } from "@/components/message";
import { OgLink } from "@/components/og-link";

export const mdxComponents = {
  a: (props) => <MdxLink {...props} />,
  Image: (props) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image {...props} />
  ),
  Message: (props) => <Message {...props} className="my-8" />,
  OgLink,
} satisfies MDXComponents;
