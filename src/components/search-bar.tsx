import { Field } from "./ui/field"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react"

export default function SearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void
}) {
  const [inputValue, setInputValue] = useState("")

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        const q = inputValue.trim()
        if (!q) return

        onSearch(q)
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
