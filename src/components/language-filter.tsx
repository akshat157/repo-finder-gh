import { languages } from "@/constants/languages"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "./ui/combobox"
import { Field, FieldLabel } from "./ui/field"

export function LanguageFilter({
  value,
  onChange,
}: {
  value: string[]
  onChange: (v: string[]) => void
}) {
  return (
    <div>
      <Field orientation="horizontal" className="w-fit text-nowrap">
        <FieldLabel htmlFor="language-filter">Language Filter</FieldLabel>
        <Combobox
          id="language-filter"
          items={languages}
          multiple
          value={value}
          onValueChange={onChange}
        >
          <ComboboxChips>
            <ComboboxValue>
              {value.map((item) => (
                <ComboboxChip key={item}>{item}</ComboboxChip>
              ))}
            </ComboboxValue>
            <ComboboxChipsInput placeholder="Add Languages" />
          </ComboboxChips>
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    </div>
  )
}
