import type { TSortReposBy } from "@/types/TSortReposBy"
import OrderSelect from "./order-select"
import { SortBySelect } from "./sort-by-select"
import { LanguageFilter } from "./language-filter"
import StarCountFilter from "./star-count-filter"

type SearchFiltersProps = {
  sortBy: TSortReposBy
  sortOrder: "asc" | "desc"
  languages: string[]
  minStars: number
  onSortByChange: (v: TSortReposBy) => void
  onSortOrderChange: (v: "asc" | "desc") => void
  onLanguagesChange: (v: string[]) => void
  onMinStarCountChange: (v: number) => void
}

export default function SearchFilters({
  sortBy,
  sortOrder,
  languages,
  minStars,
  onSortByChange,
  onSortOrderChange,
  onLanguagesChange,
  onMinStarCountChange,
}: SearchFiltersProps) {
  return (
    <div className="flex flex-col gap-3 text-sm text-muted-foreground">
      <div className="flex gap-3">
        <SortBySelect value={sortBy} onChange={onSortByChange} />
        <OrderSelect value={sortOrder} onChange={onSortOrderChange} />
      </div>
      <LanguageFilter value={languages} onChange={onLanguagesChange} />
      <StarCountFilter value={minStars} onChange={onMinStarCountChange} />
    </div>
  )
}
