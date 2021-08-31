import { Page, PageContext } from "types"
import { fetchAPI } from "./api"

export async function getLocalizedPage(
  targetLocale: string,
  pageContext: PageContext
) {
  const localization = pageContext.localizations.find(
    (localization: any) => localization.locale === targetLocale
  )
  const localePage = await fetchAPI<Page>(`/pages/${localization?.id}`)
  return localePage
}

export function localizePath(page: any) {
  const { locale, defaultLocale, slug } = page

  if (locale === defaultLocale) return `/${slug}`

  return `/${locale}/${slug}`
}

export function getLocalizedPaths(page: PageContext) {
  const paths = page.locales?.map((locale) => {
    return {
      locale,
      href: localizePath({ ...page, locale }),
    }
  })

  return paths
}
