import { useRef, useState } from "react"
import SearchBar from "./components/search-bar"
import type { TSearchResult } from "./types/TSearchResult"
import { usePagination } from "./hooks/usePagination"
import ResultsContainer from "./components/results-container"
import type { TSortReposBy } from "./types/TSortReposBy"
import { SortBySelect } from "./components/sort-by-select"
import PaginationControls from "./components/pagination-controls"

export function App() {
  const [searchResult, setSearchResult] = useState<TSearchResult | null>(null)
  const [perPage, setPerPage] = useState(25)
  const [sortBy, setSortBy] = useState<TSortReposBy>(undefined)

  const repos = searchResult?.repos ?? []
  const totalRepos = searchResult?.totalCount ?? 0

  const resultsContainerRef = useRef<HTMLDivElement | null>(null)

  const { page, setPage, pageRange, isFirstPage, isLastPage, goToPage } =
    usePagination(resultsContainerRef, totalRepos, perPage)

  const handlePerPageChange = (value: number) => {
    setPerPage(value)
    setPage(1)
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="border-b px-4 py-2">
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </header>

      <main className="mx-auto flex min-w-lg flex-1 flex-col overflow-hidden lg:max-w-7xl md:lg:min-w-4xl">
        <div className="bg-background p-4">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
            <SearchBar
              page={page}
              sortBy={sortBy}
              perPage={perPage}
              setSearchResults={setSearchResult}
            />

            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <SortBySelect value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>

        <div className="px-4 py-2 text-sm">
          Found <span className="font-bold text-primary">{totalRepos}</span>{" "}
          repositories. Showing {(page - 1) * perPage + 1} - {page * perPage} of
          the first thousand repositories.
        </div>

        <ResultsContainer ref={resultsContainerRef} items={repos} />
        <PaginationControls
          page={page}
          perPage={perPage}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          pageRange={pageRange}
          goToPage={goToPage}
          onPerPageChange={handlePerPageChange}
        />
      </main>
    </div>
  )
}

export default App
