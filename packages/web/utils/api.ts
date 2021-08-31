import { Global, Page } from "types"

export function getStrapiURL(path: string) {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`
}

export async function fetchAPI<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  }
  const requestUrl = getStrapiURL(path)
  const response = await fetch(requestUrl, mergedOptions)

  if (!response.ok) {
    console.error(response.statusText)
    throw new Error(`An error occured, please try again`)
  }

  const data: T = await response.json()
  return data
}

export async function getPageData(
  params: any,
  locale: string,
  preview: boolean
) {
  const slug = params.slug.join("/")
  const pagesData: Page[] = await fetchAPI<Page[]>(
    `/pages?slug=${slug}&_locale=${locale}${
      preview ? "&_publicationState=preview" : ""
    }`
  )

  if (pagesData == null || pagesData.length === 0) {
    return null
  }

  return pagesData[0]
}

export async function getGlobalData(locale: string) {
  const global: Global = await fetchAPI<Global>(`/global?_locale=${locale}`)
  return global
}
