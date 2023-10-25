// generic function to convert undefined properties to null
export function undefinedFieldsToNull<T>(obj: T): T {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] === undefined) {
      return { ...acc, [key]: null }
    }
    return { ...acc, [key]: obj[key] }
  }, {} as T)
}
