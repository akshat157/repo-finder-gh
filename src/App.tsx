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

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults?.map((repo) => (
              <a key={repo.name + repo.owner} href={repo.url} target="_blank">
                <Card className="transition-shadow hover:shadow-xl">
                  <CardTitle className="px-4 pt-4">
                    Repo name: {repo.name}
                  </CardTitle>

                  <CardContent className="flex flex-col gap-2">
                    <span>Repo owner: {repo.owner}</span>
                    <span>Repo stars: {repo.stars}</span>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
