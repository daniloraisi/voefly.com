import Image, { ImageProps } from "next/image"
import { Media } from "types"

type Props = {
  media: Media
} & Omit<ImageProps, "src">

const NextImage = ({ media, ...props }: Props) => {
  const { provider_metadata, alternativeText } = media

  // The image has a fixed width and height
  if (props.width && props.height) {
    return (
      <Image
        src={provider_metadata.public_id}
        alt={alternativeText || ""}
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNUlfffDwACWAFUCYgi4QAAAABJRU5ErkJggg=="
        placeholder="blur"
        lazyBoundary="5px"
        {...props}
      />
    )
  }

  // The image is responsive
  return (
    <Image
      layout="responsive"
      width={media.width}
      height={media.height}
      objectFit="contain"
      src={provider_metadata.public_id}
      alt={alternativeText || ""}
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNUlfffDwACWAFUCYgi4QAAAABJRU5ErkJggg=="
      placeholder="blur"
      lazyBoundary="5px"
      {...props}
    />
  )
}

export default NextImage
