import PropTypes from "prop-types"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import { RichText as Type } from "types"

type Props = {
  data: Type
}

const RichText = ({ data }: Props) => {
  return (
    <div className="prose md:max-w-none md:grid md:grid-cols-6 container py-12 text-justify">
      <Markdown
        className="md:col-start-2 md:col-span-4"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {data.content!}
      </Markdown>
    </div>
  )
}

RichText.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.string,
  }),
}

export default RichText
