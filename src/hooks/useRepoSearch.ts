import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { SearchRepos } from "@/api/github"
import type { TSortReposBy } from "@/types/TSortReposBy"

export function useRepoSearch({
  q,
  sortBy,
  order,
  page,
  minStars,
  languages,
  perPage,
}: {
  q: string
  sortBy?: TSortReposBy
  order: "asc" | "desc"
  page: number
  minStars: number
  languages: string[]
  perPage: number
}) {
  return useQuery({
    queryKey: ["repos", q, sortBy, order, languages, minStars, page, perPage],

    queryFn: () =>
      SearchRepos({
        q,
        sortBy,
        order,
        page,
        perPage,
      }),

    enabled: !!q,
    staleTime: 60 * 5 * 1000,
    placeholderData: keepPreviousData,
  })
}
