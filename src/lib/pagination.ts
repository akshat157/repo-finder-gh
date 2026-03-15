export const getTotalPages = (
  total: number,
  perPage: number,
  apiCap: number = 1000
) => {
  // NOTE: GitHub has a cap of 1000 items per search so the
  // per page count should be capped.
  const capped = Math.min(total, apiCap)
  return Math.ceil(capped / perPage)
}

export const getPageRange = (current: number, total: number, delta = 2) => {
  const range: (number | "...")[] = []

  const start = Math.max(2, current - delta)
  const end = Math.min(total - 1, current + delta)

  range.push(1)

  if (start > 2) {
    range.push("...")
  }

  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  if (end < total - 1) {
    range.push("...")
  }

  if (total > 1) {
    range.push(total)
  }

  return range
}
