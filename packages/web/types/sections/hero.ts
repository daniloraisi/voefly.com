import { Logos } from "types/elements/logos"
import { Media } from "types/elements/media"
import { ButtonLink } from "../links/button-link"

/**
 * Model definition for Hero
 */
export interface Hero {
  id: string
  title?: string
  label?: string
  description?: string
  picture?: Media
  smallTextWithLink?: string
  buttons?: ButtonLink[]
  logos?: Logos[]
}
