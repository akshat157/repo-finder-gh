export const getTotalPages = (
  total: number,
  perPage: number,
  apiCap: number = 1000
) => {
  // NOTE: GitHub has a cap of 1000 items per search so the
  // per page count should be capped.
  const capped = Math.min(total, apiCap)
  return Math.max(1, Math.ceil(capped / perPage))
}

export const getPageRange = (
  current: number,
  total: number,
  maxItems = 7
): (number | "...")[] => {
  if (total <= maxItems) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | "...")[] = []

  const midItemsCount = maxItems - 2
  let start = current - Math.floor(midItemsCount / 2)
  let end = current + Math.floor(midItemsCount / 2)

  if (start < 2) {
    start = 2
    end = start + midItemsCount - 1
  }

  if (end > total - 1) {
    end = total - 1
    start = end - midItemsCount + 1
  }

  pages.push(1)

  if (start > 2) {
    pages.push("...")
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < total - 1) {
    pages.push("...")
  }

  pages.push(total)

  return pages
}
