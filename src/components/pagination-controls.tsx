import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { PerPageSelect } from "@/components/per-page-select"

type PaginationControlsProps = {
  page: number
  perPage: number
  pageRange: (number | "...")[]
  isFirstPage: boolean
  isLastPage: boolean
  goToPage: (page: number) => void
  onPerPageChange: (value: number) => void
}

export function PaginationControls({
  page,
  perPage,
  pageRange,
  isFirstPage,
  isLastPage,
  goToPage,
  onPerPageChange,
}: PaginationControlsProps) {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <PerPageSelect value={perPage} onChange={onPerPageChange} />

      {/* Pagination */}
      <Pagination className="flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className={isFirstPage ? "pointer-events-none opacity-50" : ""}
              onClick={(e) => {
                e.preventDefault()
                if (!isFirstPage) goToPage(page - 1)
              }}
            />
          </PaginationItem>

          {pageRange.map((p, i) =>
            p === "..." ? (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  className="w-full px-4"
                  href="#"
                  isActive={p === page}
                  onClick={(e) => {
                    e.preventDefault()
                    goToPage(p)
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              className={isLastPage ? "pointer-events-none opacity-50" : ""}
              onClick={(e) => {
                e.preventDefault()
                if (!isLastPage) goToPage(page + 1)
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default PaginationControls
