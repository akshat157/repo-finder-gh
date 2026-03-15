import { Field, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"

type StarCountFilterProps = {
  value: number
  onChange: (v: number) => void
}

export function StarCountFilter({ value, onChange }: StarCountFilterProps) {
  return (
    <Field orientation="horizontal" className="w-fit text-nowrap">
      <FieldLabel htmlFor="star-count-filter">Star count &gt;</FieldLabel>

      <Input
        id="star-count-filter"
        type="number"
        min={0}
        placeholder="Stars >"
        className="w-30"
        value={value ?? 0}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </Field>
  )
}

export default StarCountFilter
