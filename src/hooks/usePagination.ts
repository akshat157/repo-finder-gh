import { getPageRange, getTotalPages } from "@/lib/pagination"
import { useMemo, type RefObject } from "react"

export function usePagination({
  page,
  onPageChange,
  perPage,
  totalItems,
  resultsContainerRef,
}: {
  page: number
  onPageChange: (p: number) => void
  perPage: number
  totalItems: number
  resultsContainerRef: RefObject<HTMLDivElement | null>
}) {
  const totalPages = useMemo(
    () => getTotalPages(totalItems, perPage),
    [totalItems, perPage]
  )

  const pageRange = useMemo(
    () => getPageRange(page, totalPages),
    [page, totalPages]
  )

  const isFirstPage = page === 1
  const isLastPage = page === totalPages

  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages) {
      onPageChange(p)
      resultsContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return {
    totalPages,
    pageRange,
    isFirstPage,
    isLastPage,
    goToPage,
  }
}
