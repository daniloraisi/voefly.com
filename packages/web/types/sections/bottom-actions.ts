import { ButtonLink } from "../links/button-link"

/**
 * Model definition for BottomActions
 */
export interface BottomActions {
  id: string
  title?: string
  buttons?: ButtonLink[]
}
