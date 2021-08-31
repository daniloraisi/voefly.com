import { ButtonType } from "types"
import { buttonAppearance } from "./types"

type backgroundType = "light" | "dark"

export function getButtonAppearance(
  type?: ButtonType,
  background?: backgroundType
): buttonAppearance {
  switch (type) {
    case "primary":
      if (background === "light") return "dark"

      return "white"
    case "secondary":
      if (background === "light") return "dark-outline"

      return "white-outline"
    default:
      return "dark"
  }
}
