export function apply<T extends Record<string, unknown>>(
  input: T,
  mapFn: (value: T[keyof T]) => T[keyof T]
): T {
  const entries = Object.entries(input as Record<string, T[keyof T]>)
  const mappedEntries = entries.map(([key, value]) => [key, mapFn(value)])
  return Object.fromEntries(mappedEntries)
}
