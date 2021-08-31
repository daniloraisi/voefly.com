import { Feature } from "./feature"

/**
 * Model definition for Plan
 */
export interface Plan {
  id: string
  name?: string
  description?: string
  features: Feature[]
  isRecommended?: boolean
  price?: number
  pricePeriod?: string
}
