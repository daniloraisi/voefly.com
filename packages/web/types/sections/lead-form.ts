import { Button } from "../links/button"

/**
 * Model definition for LeadForm
 */
export interface LeadForm {
  id: string
  title?: string
  emailPlaceholder?: string
  submitButton?: Button
  location?: string
}
