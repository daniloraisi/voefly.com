import { Media } from "types/elements/media"
import { ButtonLink } from "../links/button-link"
import { Link } from "../links/link"

/**
 * Model definition for Navbar
 */
export interface Navbar {
  id: string
  links: Link[]
  button?: ButtonLink
  logo: Media
}
