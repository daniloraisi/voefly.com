import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import Sections from "@/components/sections"
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next"
import ErrorPage from "next/error"
import { useRouter } from "next/router"
import { ContentSections, Global, Metadata, Page, PageContext } from "types"
import { fetchAPI, getGlobalData, getPageData } from "utils/api"
import { getLocalizedPaths } from "utils/localize"

type Props = {
  preview: boolean
  sections: ContentSections[]
  metadata: Metadata
  global: Global
  pageContext: PageContext
}

const DynamicPage = ({
  sections,
  metadata,
  preview,
  global,
  pageContext,
}: Props) => {
  const router = useRouter()

  if (!router.isFallback && !sections?.length) {
    return <ErrorPage statusCode={404} />
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO */}
      <Seo metadata={metadata} />
      {/* Display content sections */}
      <Sections sections={sections} preview={preview} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async (
  context: GetStaticPathsContext
) => {
  const allPages = context.locales!.map(async (locale) => {
    const localePages = await fetchAPI<Page[]>(`/pages?_locale=${locale}`)
    return localePages
  })
  const pages = (await Promise.all(allPages)).flat()
  const paths = pages.map((page) => {
    const slugArray = !page.slug ? undefined : page.slug.split("/")

    return {
      params: { slug: slugArray },
      locale: page.locale,
    }
  })

  return { paths, fallback: "blocking" }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { params, locale, locales, defaultLocale, preview = null } = context
  const globalLocale = await getGlobalData(locale!)
  const pageData = await getPageData(
    { slug: !params?.slug ? [""] : params.slug },
    locale!,
    preview!
  )

  if (pageData == null) {
    return { props: {} }
  }

  const { contentSections, metadata, localizations, slug } = pageData
  const pageContext: PageContext = {
    locale: pageData.locale,
    locales,
    defaultLocale,
    slug,
    localizations,
  }

  const localizedPaths = getLocalizedPaths(pageContext)

  return {
    props: {
      preview,
      sections: contentSections,
      metadata,
      global: globalLocale,
      pageContext: {
        ...pageContext,
        localizedPaths,
      },
    },
    revalidate: 120,
  }
}

export default DynamicPage
