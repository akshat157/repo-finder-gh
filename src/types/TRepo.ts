export type TRepo = {
  id: number
  name: string
  owner: string | null
  stars: number
  url: string
  description: string | null
  topics: string[]
  language: string
}
