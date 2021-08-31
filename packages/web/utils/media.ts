export function getStrapiMedia(url?: string) {
  if (!url) {
    return ""
  } else {
    if (url.startsWith("http") || url.startsWith("//")) {
      return url
    }

    return `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }${url}`
  }
}
