import { sortOptions, type TSortReposBy } from "@/types/TSortReposBy"
import { Field, FieldLabel } from "./ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

type SortSelectProps = {
  value?: TSortReposBy
  onChange: (value: TSortReposBy) => void
}

export function SortBySelect({ value, onChange }: SortSelectProps) {
  const selected = sortOptions.find((o) => o.value === value)
  return (
    <div>
      <Field orientation="horizontal" className="w-fit text-nowrap">
        <FieldLabel htmlFor="select-per-page">Sort By</FieldLabel>

        <Select
          value={value ?? "none"}
          onValueChange={(v) =>
            onChange(v === "none" ? undefined : (v as TSortReposBy))
          }
        >
          <SelectTrigger className="w-48" id="select-per-page">
            <SelectValue placeholder="Sort by">{selected?.label}</SelectValue>
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.label} value={opt.value ?? "none"}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </div>
  )
}
