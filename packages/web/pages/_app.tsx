import "@/styles/index.css"
import { DefaultSeo } from "next-seo"
import type { AppContext, AppProps as NextAppProps } from "next/app"
import App from "next/app"
import ErrorPage from "next/error"
import Head from "next/head"
import { Router } from "next/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { Global } from "types"
import { getGlobalData } from "utils/api"
import { getStrapiMedia } from "utils/media"

type AppProps<P = any> = {
  pageProps: {
    global: Global
  }
} & Omit<NextAppProps<P>, "pageProps">

Router.events.on("routeChangeStart", () => NProgress.start())
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { global } = pageProps

  if (global == null) return <ErrorPage statusCode={404} />

  const { metadata } = global

  return (
    <>
      {/* Favicon */}
      <Head>
        <link rel="shortcut icon" href={getStrapiMedia(global.favicon?.url)} />
      </Head>
      {/* Global site metadata */}
      <DefaultSeo
        titleTemplate={`%s | ${global.metaTitleSuffix}`}
        title={metadata?.metaTitle}
        description={metadata?.metaDescription}
        openGraph={{
          images: Object.values(metadata?.shareImage?.formats!).map((image) => {
            return {
              url: getStrapiMedia(image.url),
              width: image.width,
              height: image.height,
            }
          }),
        }}
        twitter={{
          cardType: metadata?.twitterCardType,
          handle: metadata?.twitterUsername,
        }}
      />
      {/* Display the content */}
      <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const globalLocale = await getGlobalData(appContext.router.locale!)

  return {
    ...appProps,
    pageProps: {
      global: globalLocale,
    },
  }
}

export default MyApp
