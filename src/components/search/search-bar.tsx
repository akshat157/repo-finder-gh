import { useState } from "react"
import { SearchRepositories } from "@/api/github"
import type { TRepo } from "@/types/TRepo"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group"

export default function SearchBar({
  setSearchResults,
}: {
  setSearchResults: React.Dispatch<React.SetStateAction<TRepo[] | null>>
}) {
  const [query, setQuery] = useState("")

  const search = async () => {
    if (query.length === 0) return

    const repos = await SearchRepositories({
      q: query,
    })

    if (!repos) {
      console.error("Could not get results")
      return
    }

    setSearchResults(repos)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        search()
      }}
    >
      <InputGroup>
        <InputGroupInput
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
          placeholder="Type to search..."
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton type="submit" variant="secondary">
            Search
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}
