import { Media } from "types/elements/media"

/**
 * Model definition for LargeVideo
 */
export interface LargeVideo {
  id: string
  title?: string
  description?: string
  video?: Media
  poster?: Media
}
