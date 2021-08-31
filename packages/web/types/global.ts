import { Media } from "./elements/media"
import { NotificationBanner } from "./elements/notification-banner"
import { Footer } from "./layout/footer"
import { Navbar } from "./layout/navbar"
import { Metadata } from "./meta/metadata"

/**
 * Model definition for Global
 */
export interface Global {
  id: string
  metadata: Metadata
  metaTitleSuffix: string
  favicon?: Media
  notificationBanner: NotificationBanner
  navbar: Navbar
  footer: Footer
}
