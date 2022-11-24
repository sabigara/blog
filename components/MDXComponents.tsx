/* eslint-disable react/display-name */
import React, { useMemo } from "react"
import { ComponentMap, getMDXComponent } from "mdx-bundler/client"
import Image from "./Image"
import TOCInline from "./TOCInline"
import Pre from "./Pre"
import { BlogNewsletterForm } from "./NewsletterForm"
import LinkOrEmbed from "@/components/LinkOrEmbed"

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
}

interface Props {
  layout: string
  mdxSource: string
  [key: string]: unknown
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
