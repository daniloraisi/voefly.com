import { Metadata } from "./meta/metadata"
import { BottomActions } from "./sections/bottom-actions"
import { FeatureColumnsGroup } from "./sections/feature-columns-group"
import { FeatureRowsGroup } from "./sections/feature-rows-group"
import { Hero } from "./sections/hero"
import { LargeVideo } from "./sections/large-video"
import { LeadForm } from "./sections/lead-form"
import { Map } from "./sections/map"
import { Pilots } from "./sections/pilots"
import { Pricing } from "./sections/pricing"
import { RichText } from "./sections/rich-text"
import { Staff } from "./sections/staff"
import { Stats } from "./sections/stats"
import { TestimonialsGroup } from "./sections/testimonials-group"

type Localizations = {
  id: string
  locale: string
}

export interface PageContext {
  locale: string
  locales: string[] | undefined
  defaultLocale: string | undefined
  slug: string | undefined
  localizations: Localizations[]
  localizedPaths?: {
    locale: string
    href: string
  }[]
}

export type ContentSections =
  | ({ __component: "sections.hero" } & Hero)
  | ({ __component: "sections.bottom-actions" } & BottomActions)
  | ({ __component: "sections.feature-columns-group" } & FeatureColumnsGroup)
  | ({ __component: "sections.feature-rows-group" } & FeatureRowsGroup)
  | ({ __component: "sections.testimonials-group" } & TestimonialsGroup)
  | ({ __component: "sections.large-video" } & LargeVideo)
  | ({ __component: "sections.rich-text" } & RichText)
  | ({ __component: "sections.pricing" } & Pricing)
  | ({ __component: "sections.staff" } & Staff)
  | ({ __component: "sections.stats" } & Stats)
  | ({ __component: "sections.lead-form" } & LeadForm)
  | ({ __component: "sections.map" } & Map)
  | ({ __component: "sections.pilots" } & Pilots)

/**
 * Model definition for Page
 */
export interface Page {
  id: string
  shortName?: string
  metadata: Metadata
  locale: string
  localizations: Localizations[]
  contentSections: ContentSections[]
  slug?: string
}
