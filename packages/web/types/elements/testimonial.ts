import { Media } from "./media"

/**
 * Model definition for Testimonial
 */
export interface Testimonial {
  id: string
  logo?: Media
  picture?: Media
  text?: string
  authorName?: string
  authorTitle?: string
  link?: string
}
