export function cutExtraWords(value, tags) {
  if (tags.length > 2) {
    tags.splice(2)
  }

  return value
}
