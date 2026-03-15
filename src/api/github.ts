import type { TRepo } from "@/types/TRepo"
import type { TSearchResult } from "@/types/TSearchResult"
import type { TSortReposBy } from "@/types/TSortReposBy"
import { Octokit } from "@octokit/rest"

const octokit = new Octokit()

export async function SearchRepos({
  q,
  sortBy,
  page = 1,
  perPage = 10,
}: {
  q: string
  sortBy?: TSortReposBy
  page: number
  perPage: number
}): Promise<TSearchResult | null> {
  try {
    const result = await octokit.rest.search.repos({
      q,
      sort: sortBy,
      page,
      per_page: perPage,
    })
    if (!result) {
      return null
    }
    const repos = result.data.items.map(
      (item) =>
        ({
          id: item.id,
          name: item.name,
          owner: item.owner?.login || null,
          stars: item.stargazers_count,
          url: item.html_url,
          description: item.description || null,
          topics: item.topics,
          language: item.language,
        }) as TRepo
    )

    const totalCount = result.data.total_count

    return {
      repos,
      totalCount,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
