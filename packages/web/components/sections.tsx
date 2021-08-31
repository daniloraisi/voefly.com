import { useRouter } from "next/router"
import { ContentSections } from "types"
import BottomActions from "./sections/bottom-action"
import FeatureColumnsGroup from "./sections/feature-columns-group"
import FeatureRowsGroup from "./sections/feature-rows-group"
import Hero from "./sections/hero"
import LargeVideo from "./sections/large-video"
import LeadForm from "./sections/lead-form"
import Map from "./sections/map"
import Pilots from "./sections/pilots"
import Pricing from "./sections/pricing"
import RichText from "./sections/rich-text"
import Staff from "./sections/staff"
import Stats from "./sections/stats"
import TestimonialsGroup from "./sections/testimonials-group"

const components = {
  "sections.hero": Hero,
  "sections.large-video": LargeVideo,
  "sections.feature-columns-group": FeatureColumnsGroup,
  "sections.feature-rows-group": FeatureRowsGroup,
  "sections.bottom-actions": BottomActions,
  "sections.testimonials-group": TestimonialsGroup,
  "sections.rich-text": RichText,
  "sections.pricing": Pricing,
  "sections.staff": Staff,
  "sections.stats": Stats,
  "sections.lead-form": LeadForm,
  "sections.map": Map,
  "sections.pilots": Pilots,
}

type SectionProps = {
  sectionData: ContentSections
}

const Section = ({ sectionData }: SectionProps) => {
  const SectionComponent = components[sectionData.__component]
  if (!SectionComponent) return null

  return <SectionComponent data={sectionData} />
}

const PreviewModeBanner = () => {
  const router = useRouter()
  const exitURL = `/api/exit-preview?redirect=${encodeURIComponent(
    router.asPath
  )}`

  return (
    <div className="py-4 bg-red-600 text-red-100 font-semibold uppercase tracking-wide">
      <div className="container">
        Preview mode is on.{" "}
        <a className="underline" href={exitURL}>
          Turn off
        </a>
      </div>
    </div>
  )
}

type Props = {
  sections: ContentSections[]
  preview: boolean
}

const Sections = ({ sections, preview }: Props) => (
  <div className="flex flex-col">
    {/* Show a banner if preview mode is on */}
    {preview && <PreviewModeBanner />}
    {/* Show the actual sections */}
    {sections.map((section) => (
      <Section
        sectionData={section}
        key={`${section.__component}${section.id}`}
      />
    ))}
  </div>
)

export default Sections
