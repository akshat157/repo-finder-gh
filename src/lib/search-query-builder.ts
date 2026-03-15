export function buildSearchQuery(
  q: string,
  languages: string[],
  stars?: number
) {
  let query = q

  if (languages.length) {
    query += " " + languages.map((l) => `language:${l}`).join(" ")
  }

  if (stars) {
    query += ` stars:>${stars}`
  }

  return query
}
