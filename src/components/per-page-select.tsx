import { Field, FieldLabel } from "./ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

type PerPageSelectProps = {
  value: number
  onChange: (value: number) => void
}

export function PerPageSelect({ value, onChange }: PerPageSelectProps) {
  return (
    <div>
      <Field orientation="horizontal" className="w-fit text-nowrap">
        <FieldLabel htmlFor="select-per-page">Results per page</FieldLabel>

        <Select
          value={String(value)}
          onValueChange={(v) => {
            onChange(Number(v))
          }}
        >
          <SelectTrigger className="w-24" id="select-per-page">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </div>
  )
}
