import { useCallback, useEffect, useState } from "react"
import { SearchRepos } from "@/api/github"
import type { TSearchResult } from "@/types/TSearchResult"
import { Field } from "./ui/field"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import type { TSortReposBy } from "@/types/TSortReposBy"

export default function SearchBar({
  page,
  perPage,
  sortBy,
  setSearchResults,
}: {
  page: number
  perPage: number
  sortBy: TSortReposBy
  setSearchResults: React.Dispatch<React.SetStateAction<TSearchResult | null>>
}) {
  const [inputValue, setInputValue] = useState("")
  const [query, setQuery] = useState("")

  const search = useCallback(async () => {
    if (!query) return

    const result = await SearchRepos({
      q: query,
      page,
      sortBy,
      perPage,
    })

    if (!result) {
      console.error("Could not get results")
      return
    }

    setSearchResults(result)
  }, [query, page, perPage, sortBy, setSearchResults])

  // Run search ONLY when page or query changes
  useEffect(() => {
    search()
  }, [page, query, search])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        if (!inputValue.trim()) return

        // Reset page externally if needed
        setQuery(inputValue.trim())
      }}
    >
      <Field orientation="horizontal">
        <Input
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search GitHub repositories..."
        />
        <Button type="submit">Search</Button>
      </Field>
    </form>
  )
}
