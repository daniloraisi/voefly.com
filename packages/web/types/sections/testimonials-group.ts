import { Logos } from "../elements/logos"
import { Testimonial } from "../elements/testimonial"
import { Link } from "../links/link"

/**
 * Model definition for TestimonialsGroup
 */
export interface TestimonialsGroup {
  id: string
  title?: string
  description?: string
  link?: Link
  logos?: Logos[]
  testimonials?: Testimonial[]
}
