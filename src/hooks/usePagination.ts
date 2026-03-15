import { getPageRange, getTotalPages } from "@/lib/pagination"
import { useMemo, useState, type RefObject } from "react"

export function usePagination(
  resultsContainerRef: RefObject<HTMLDivElement | null>,
  totalItems: number,
  perPage: number
) {
  const [page, setPage] = useState(1)

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
      setPage(p)
      resultsContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return {
    page,
    setPage,
    totalPages,
    pageRange,
    isFirstPage,
    isLastPage,
    goToPage,
  }
}
