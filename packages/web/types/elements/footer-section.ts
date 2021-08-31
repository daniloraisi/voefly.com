import { Link } from "../links/link"

/**
 * Model definition for FooterSection
 */
export interface FooterSection {
  id: string
  title?: string
  links: Link[]
}
