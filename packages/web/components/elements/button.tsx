import classNames from "classnames"
import { ButtonHTMLAttributes } from "react"
import { Button as Type } from "types"
import { buttonAppearance } from "utils/types"
import Loader from "./loader"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  button: Type
  appearance?: buttonAppearance
  loading?: boolean
  compact?: boolean
}

const Button = ({
  button,
  appearance,
  compact = false,
  onClick,
  loading = false,
  type,
}: Props) => {
  return (
    <button onClick={onClick} type={type}>
      <div
        className={classNames(
          "flex w-full justify-center lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm border-2 rounded-md",
          { "px-8 py-4": !compact },
          { "px-6 py-2": compact },
          {
            "bg-primary-900 text-white border-primary-900 hover:bg-white hover:text-primary-900":
              appearance === "dark",
            "text-primary-600 border-primary-600 hover:text-primary-600 hover:bg-primary-600":
              appearance === "dark-outline",
            "bg-white text-secondary-600 border-white": appearance === "white",
            "text-white border-white hover:bg-white hover:text-primary-600":
              appearance === "white-outline",
          }
        )}
      >
        {loading && <Loader />}
        {button.text}
      </div>
    </button>
  )
}

export default Button
