import { useState } from "react"
import SearchBar from "./components/search/search-bar"
import type { TRepo } from "./types/TRepo"
import { Card, CardContent, CardTitle } from "./components/ui/card"

export function App() {
  const [searchResults, setSearchResults] = useState<TRepo[] | null>(null)

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="border-b px-4 py-2">
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </header>

      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="border-b bg-background p-4">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
            <SearchBar setSearchResults={setSearchResults} />

            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              filters will go here
            </div>
          </div>
        </div>

        <div className="px-4 py-2 text-sm">
          Found <span className="font-bold text-primary">{totalRepos}</span>{" "}
          repositories. Showing {(page - 1) * perPage + 1} - {page * perPage} of
          the first thousand repositories.
        </div>

        <ResultsContainer ref={resultsContainerRef} items={repos} />
        <div className="flex items-center justify-between bg-background px-4 py-4">
          <PerPageSelect value={perPage} onChange={handlePerPageChange} />

          {/* Pagination */}
          <Pagination className="flex justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href=""
                  className={
                    isFirstPage ? "pointer-events-none opacity-50" : ""
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    if (!isFirstPage) goToPage(page - 1)
                  }}
                />
              </PaginationItem>

              {pageRange.map((p, i) =>
                p === "..." ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      className="w-full px-4"
                      href=""
                      isActive={p === page}
                      onClick={(e) => {
                        e.preventDefault()
                        goToPage(p)
                      }}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  href=""
                  className={isLastPage ? "pointer-events-none opacity-50" : ""}
                  onClick={(e) => {
                    e.preventDefault()
                    if (!isLastPage) goToPage(page + 1)
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  )
}

export default App
