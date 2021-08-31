import classNames from "classnames"
import { MouseEventHandler } from "react"
import { MdClose } from "react-icons/md"
import Markdown from "react-markdown"
import { NotificationBanner as Type } from "types"

type Props = {
  data: Type
  closeSelf: MouseEventHandler<HTMLButtonElement>
}

const NotificationBanner = ({ data: { text, type }, closeSelf }: Props) => {
  return (
    <div
      className={classNames("text-white p-2 fixed bottom-0 w-full", {
        "bg-secondary-600 text-primary-900": type === "warning",
        "bg-primary-900": type === "info",
        "bg-red-600": type === "alert",
      })}
    >
      <div className="container flex flex-row justify-between items-center">
        <div className="rich-text-banner flex-1">
          <Markdown>{text!}</Markdown>
        </div>
        <button onClick={closeSelf} className="p-1 flex-shrink-0">
          <MdClose className="h-6 w-auto" color="#fff" />
        </button>
      </div>
    </div>
  )
}

export default NotificationBanner
