export const sortOptions = [
  { label: "Best Match", value: undefined },
  { label: "Stars", value: "stars" },
  { label: "Forks", value: "forks" },
  { label: "Help Wanted Issues", value: "help-wanted-issues" },
  { label: "Recently Updated", value: "updated" },
] as const

export type TSortReposBy = (typeof sortOptions)[number]["value"]
