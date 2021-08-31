import { LargeVideo as Type } from "types"
import Video from "../elements/video"

type Props = {
  data: Type
}

const LargeVideo = ({ data }: Props) => {
  return (
    <section>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      {/* Video wrapper */}
      <div>
        <Video media={data.video!} poster={data.poster} />
      </div>
    </section>
  )
}

export default LargeVideo
