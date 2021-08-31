export interface MediaFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path?: string
  size: number
  width: number
  height: number
}

export interface Media {
  id: string
  name: string
  alternativeText: string
  caption?: string
  width: number
  height: number
  formats: {
    large?: MediaFormat
    small?: MediaFormat
    medium?: MediaFormat
    thumbnail?: MediaFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl?: string
  provider: string
  provider_metadata: any
  create_at: string
  updated_at: string
}
