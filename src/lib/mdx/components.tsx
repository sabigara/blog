import type { MDXComponents } from "mdx/types";
import Image from "next/image";

import { Link } from "@/components/link";
import { Message } from "@/components/message";

export const mdxComponents = {
  a: (props) => (
    // @ts-expect-error
    <Link {...props} />
  ),
  Image: (props) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image {...props} />
  ),
  Message: (props) => <Message {...props} className="my-8" />,
} satisfies MDXComponents;
