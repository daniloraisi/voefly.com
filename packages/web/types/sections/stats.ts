import { StatCard } from "types/elements/stat-card"

export interface Stats {
  id: string
  title?: string
  subTitle?: string
  stats?: StatCard[]
  apiUrl?: string
}
