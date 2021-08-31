import { Link } from "../links/link"
import { Media } from "./media"

/**
 * Model definition for FeatureRow
 */
export interface FeatureRow {
  id: string
  title: string
  description?: string
  media?: Media
  link?: Link
}
