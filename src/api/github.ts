import type { TRepo } from "@/types/TRepo"
import type { TSortReposBy } from "@/types/TSortBy"
import { Octokit } from "@octokit/rest"

export async function SearchRepositories({
  q,
  sortBy,
}: {
  q: string
  sortBy?: TSortReposBy
}): Promise<TRepo[] | null> {
  const octokit = new Octokit()

  const result = await octokit.rest.search.repos({
    q,
    sort: sortBy,
  })

  if (!result) {
    return null
  }
  const repos = result.data.items.map((item) => ({
    name: item.name,
    owner: item.owner?.login || null,
    stars: item.stargazers_count,
    url: item.html_url,
  }))

  return repos
}
