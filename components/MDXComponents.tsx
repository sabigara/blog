/* eslint-disable react/display-name */
import React from "react"
import { useMDXComponent } from "next-contentlayer/hooks"
import { ComponentMap } from "mdx-bundler/client"
import Image from "./Image"
import TOCInline from "./TOCInline"
import Pre from "./Pre"
import { BlogNewsletterForm } from "./NewsletterForm"
import LinkOrEmbed from "@/components/LinkOrEmbed"
import Message from "@/components/Message"
import clsx from "clsx"

const Wrapper: React.ComponentType<{ layout: string }> = ({ layout, ...rest }) => {
  const Layout = require(`../layouts/${layout}`).default
  return <Layout {...rest} />
}

export const MDXComponents: ComponentMap = {
  Image,
  TOCInline,
  a: LinkOrEmbed,
  pre: Pre,
  wrapper: Wrapper,
  BlogNewsletterForm,
  Message: ({ className, ...props }) => <Message {...props} className={clsx(className, "my-6")} />,
}

interface Props {
  layout: string
  mdxSource: string
  [key: string]: unknown
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const MDXContent = useMDXComponent(mdxSource)

  return <MDXContent layout={layout} components={MDXComponents} {...rest} />
}
