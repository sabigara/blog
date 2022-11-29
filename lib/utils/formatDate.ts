export default function formatDate(date: Date | string) {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toISOString().slice(0, 10)
}
