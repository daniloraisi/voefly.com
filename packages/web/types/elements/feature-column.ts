import { Media } from "./media"

/**
 * Model definition for FeatureColumn
 */
export interface FeatureColumn {
  id: string
  title: string
  description?: string
  icon?: Media
}
