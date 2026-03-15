import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { SearchRepos } from "@/api/github"
import type { TSortReposBy } from "@/types/TSortReposBy"

export function useRepoSearch({
  query,
  sortBy,
  page,
  perPage,
}: {
  query: string
  sortBy?: TSortReposBy
  page: number
  perPage: number
}) {
  return useQuery({
    queryKey: ["repos", query, sortBy, page, perPage],

    queryFn: () =>
      SearchRepos({
        q: query,
        sortBy,
        page,
        perPage,
      }),

    enabled: !!query,
    staleTime: 60 * 5 * 1000,
    placeholderData: keepPreviousData,
  })
}
