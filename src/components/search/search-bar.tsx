import { Input } from "../ui/input"
import { useState } from "react"
import { Field } from "../ui/field"
import { Button } from "../ui/button"

export default function SearchBar() {
  const [query, setQuery] = useState("")

  const search = () => {
    if (query.length === 0) return

    console.info("searching with query: ", query)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        search()
      }}
    >
      <Field>
        <Input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />
      </Field>
      <Field>
        <Button className="mt-2" type="submit">
          Search
        </Button>
      </Field>
    </form>
  )
}
