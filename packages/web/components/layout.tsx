import { ReactNode, useEffect, useState } from "react"
import { Global, PageContext } from "types"
import Footer from "./elements/footer"
import Navbar from "./elements/navbar"
import NotificationBanner from "./elements/notification-banner"

type Props = {
  children: ReactNode
  global: Global
  pageContext: PageContext
}

const Layout = ({ children, global, pageContext }: Props) => {
  const { navbar, footer, notificationBanner } = global

  const [bannerIsShown, setBannerIsShown] = useState(false)

  useEffect(() => {
    const cookieAccept = localStorage.getItem("fly-cookie-consent")

    if (cookieAccept && cookieAccept === "accept") setBannerIsShown(false)
    else setBannerIsShown(true)
  }, [])

  const cookieConsent = () => {
    localStorage.setItem("fly-cookie-consent", "accept")
    setBannerIsShown(false)
  }

  return (
    <div className="flex flex-col justify-between min-h-screen">
      {/* Aligned to the top */}
      <div className="flex-1">
        <Navbar navbar={navbar} pageContext={pageContext} />
        <div>{children}</div>
      </div>
      {/* Aligned to the bottom */}
      <Footer footer={footer} />
      {notificationBanner && bannerIsShown && (
        <NotificationBanner
          data={notificationBanner}
          closeSelf={cookieConsent}
        />
      )}
    </div>
  )
}

export default Layout
