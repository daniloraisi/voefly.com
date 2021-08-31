export type ButtonType = "primary" | "secondary"

/**
 * Model definition for Button
 */
export interface Button {
  id: string
  text?: string
  type?: ButtonType
}
