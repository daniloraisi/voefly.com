/**
 * Model definition for ButtonLink
 */
export interface ButtonLink {
  id: string
  url?: string
  newTab?: boolean
  text?: string
  type?: "primary" | "secondary"
}
