/**
 * Model definition for NotificationBanner
 */
export interface NotificationBanner {
  id: string
  text?: string
  type: "alert" | "info" | "warning"
}
