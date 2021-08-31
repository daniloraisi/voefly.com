import classNames from "classnames"
import { ButtonLink as Type } from "types"
import { buttonAppearance } from "utils/types"
import CustomLink from "./custom-link"

type Props = {
  button: Type
  appearance: buttonAppearance
  compact?: boolean
}

const ButtonContent = ({ button, appearance, compact }: Props) => {
  return (
    <div
      className={classNames(
        "block w-full lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm border-2 rounded-md",
        { "px-8 py-4": !compact },
        { "px-6 py-2": compact },
        {
          "bg-primary-900 text-white border-primary-900 hover:bg-white hover:text-primary-900":
            appearance === "dark",
          "text-primary-600 border-primary-600 hover:text-white hover:bg-primary-600":
            appearance === "dark-outline",
          "bg-primary-600 text-white border-primary-600 hover:text-white hover:bg-secondary-600 hover:border-secondary-600":
            appearance === "white",
          "text-white border-white hover:bg-white hover:text-primary-600":
            appearance === "white-outline",
        }
      )}
    >
      {button.text}
    </div>
  )
}

const ButtonLink = ({ button, appearance, compact = false }: Props) => {
  return (
    <CustomLink link={button}>
      <ButtonContent
        button={button}
        appearance={appearance}
        compact={compact}
      />
    </CustomLink>
  )
}

export default ButtonLink
