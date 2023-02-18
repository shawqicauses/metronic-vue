export default function createQueryString(page, limit) {
  const queryString = ["?", "page", "=", page, "&", "limit", "=", limit].join("")
  return queryString
}
