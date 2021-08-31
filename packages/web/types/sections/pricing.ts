import { Plan } from "../elements/plan"

/**
 * Model definition for Pricing
 */
export interface Pricing {
  id: string
  title?: string
  plans?: Plan[]
}
