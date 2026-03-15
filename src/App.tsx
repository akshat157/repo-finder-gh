import { useRef, useState } from "react"
import SearchBar from "./components/search-bar"
import { usePagination } from "./hooks/usePagination"
import ResultsContainer from "./components/results-container"
import type { TSortReposBy } from "./types/TSortReposBy"
import { SortBySelect } from "./components/sort-by-select"
import PaginationControls from "./components/pagination-controls"
import { useRepoSearch } from "./hooks/useRepoSearch"
import { Spinner } from "./components/ui/spinner"
import { LanguageFilter } from "./components/language-filter"
import OrderSelect from "./components/order-select"
import StarCountFilter from "./components/star-count-filter"
import { buildSearchQuery } from "./lib/search-query-builder"

export function App() {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(25)
  const [sortBy, setSortBy] = useState<TSortReposBy>(undefined)
  const [minStars, setMinStars] = useState(0)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [languages, setLanguages] = useState<string[]>([])
  const resultsContainerRef = useRef<HTMLDivElement | null>(null)

  const handlePageChange = (value: number) => {
    setPage(value)
  }

  const handlePerPageChange = (value: number) => {
    setPerPage(value)
    setPage(1)
  }

  const queryWithFilters = buildSearchQuery(query, languages, minStars)

  const { data, isLoading } = useRepoSearch({
    q: queryWithFilters,
    sortBy,
    order: sortOrder,
    page,
    minStars,
    languages,
    perPage,
  })

  const repos = data?.repos ?? []
  const totalRepos = data?.totalCount ?? 0

  const { pageRange, isFirstPage, isLastPage, goToPage } = usePagination({
    page,
    onPageChange: handlePageChange,
    perPage,
    totalItems: totalRepos,
    resultsContainerRef,
  })

  const hasSearched = !!query

  const resStart = (page - 1) * perPage + 1
  const resEnd = Math.min(page * perPage, totalRepos)

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="border-b px-4 py-2">
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </header>

      <main className="mx-auto flex min-w-lg flex-1 flex-col overflow-hidden md:min-w-4xl lg:min-w-6xl xl:mx-20 xl:min-w-7xl">
        <div className="border-b p-4">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
            <SearchBar
              onSearch={(q) => {
                setPage(1)
                setQuery(q)
              }}
            />

            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <SortBySelect value={sortBy} onChange={setSortBy} />
                <OrderSelect value={sortOrder} onChange={setSortOrder} />
              </div>
              <LanguageFilter value={languages} onChange={setLanguages} />
              <StarCountFilter value={minStars} onChange={setMinStars} />
            </div>
          </div>
        </div>
        {hasSearched && !isLoading && repos.length === 0 && (
          <div className="flex h-full items-center justify-center py-16 text-center text-muted-foreground">
            No repositories found for "{query}"
          </div>
        )}
        {!hasSearched && (
          <div className="flex h-full flex-col items-center justify-center py-24 text-muted-foreground">
            <div className="text-lg font-semibold">
              GitHub Repository Finder
            </div>
            <div className="text-sm">
              Enter a search term like repository name, owner or partial
              description text to begin.
            </div>
          </div>
        )}
        {hasSearched && (
          <>
            {isLoading && (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <Spinner className="size-8" role="" />
              </div>
            )}
            {!isLoading && repos.length !== 0 && (
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="px-4 py-2 text-sm">
                  Found{" "}
                  <span className="font-bold text-primary">{totalRepos}</span>{" "}
                  repositories for <span>"{query}"</span>. Showing {resStart} -{" "}
                  {resEnd} of the first 1000 repositories.
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
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App
