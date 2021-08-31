import { Media } from "types/elements/media"

/**
 * Model definition for Metadata
 */
export interface Metadata {
  id: string
  metaTitle: string
  metaDescription: string
  shareImage?: Media
  twitterCardType?: "summary" | "summary_large_image" | "app" | "player"
  twitterUsername?: string
}
