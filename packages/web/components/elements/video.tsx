import { Media } from "types"
import { getStrapiMedia } from "utils/media"

type Props = {
  media: Media
  poster?: Media
  className?: string
  controls?: boolean
  autoPlay?: boolean
}

const Video = ({
  media,
  poster,
  className,
  controls = true,
  autoPlay = false,
}: Props) => {
  const fullVideoUrl = getStrapiMedia(media.url!)
  const fullPosterUrl = getStrapiMedia(poster?.url!)

  return (
    <video
      className={className}
      poster={fullPosterUrl}
      controls={controls}
      autoPlay={autoPlay}
    >
      <source src={fullVideoUrl} type={media.mime} />
    </video>
  )
}

export default Video
