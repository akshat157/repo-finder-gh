import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react"
import { Field, FieldLabel } from "./ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

type OrderSelectProps = {
  value: "asc" | "desc"
  onChange: (v: "asc" | "desc") => void
}

export function OrderSelect({ value, onChange }: OrderSelectProps) {
  return (
    <Field orientation="horizontal" className="w-fit text-nowrap">
      <FieldLabel htmlFor="order-select">Order</FieldLabel>
      <Select
        id="order-select"
        value={value}
        onValueChange={(v) => onChange(v as "asc" | "desc")}
      >
        <SelectTrigger className="w-30">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">
            <ArrowDownWideNarrow /> Desc
          </SelectItem>
          <SelectItem value="asc">
            <ArrowUpWideNarrow /> Asc
          </SelectItem>
        </SelectContent>
      </Select>
    </Field>
  )
}

export default OrderSelect
