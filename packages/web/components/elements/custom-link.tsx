import Link from "next/link"
import { ReactNode } from "react"
import { ButtonLink, Link as Type } from "types"

type Props = {
  link: Type | ButtonLink
  children: ReactNode[] | ReactNode
  locale?: string
}

const CustomLink = ({ link, children }: Props) => {
  const isInternalLink = link?.url?.startsWith("/")

  // For internal links, use the Next.js Link component
  if (isInternalLink) {
    return (
      <Link href="/[[...slug]]" as={link.url}>
        <a>{children}</a>
      </Link>
    )
  }

  // Plain <a> tags for external links
  if (link?.newTab) {
    return (
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <a href={link?.url} target="_self">
      {children}
    </a>
  )
}

export default CustomLink
