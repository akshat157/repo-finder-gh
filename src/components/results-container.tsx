import type { TRepo } from "@/types/TRepo"
import RepoCard from "./repo-card"
import { type RefObject } from "react"

export function ResultsContainer({
  items,
  ref,
}: {
  items: TRepo[]
  ref: RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={ref}
      className="h-full overflow-y-auto rounded-2xl border bg-accent"
    >
      <div className="grid w-full flex-1 grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  )
}

export default ResultsContainer
