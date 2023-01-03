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
import BorderRadiusCalculator from "@/components/BorderRadiusCalculator"

export const MDXComponents: ComponentMap = {
  Image,
  TOCInline,
  a: LinkOrEmbed,
  pre: Pre,
  Message,
  BlogNewsletterForm,
  BorderRadiusCalculator,
}

interface Props {
  mdxSource: string
}

export const MDXRenderer = ({ mdxSource }: Props) => {
  const MDXContent = useMDXComponent(mdxSource)
  return <MDXContent components={MDXComponents} />
}
