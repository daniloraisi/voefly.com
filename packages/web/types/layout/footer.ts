import { Media } from "types/elements/media"
import { FooterSection } from "../elements/footer-section"

/**
 * Model definition for Footer
 */
export interface Footer {
  id: string
  logo?: Media
  columns: FooterSection[]
  smallText?: string
}
