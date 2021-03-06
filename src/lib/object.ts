export function apply<T extends Record<string, unknown>>(
  input: T,
  mapFn: (value: T[keyof T]) => T[keyof T]
): T {
  const entries = Object.entries(input as Record<string, T[keyof T]>)
  const mappedEntries = entries.map(([key, value]) => [key, mapFn(value)])
  return Object.fromEntries(mappedEntries)
}

export function fromEntries<Key extends PropertyKey, Value>(
  entries: [key: Key, value: Value][]
): Record<Key, Value> {
  return Object.fromEntries(entries) as Record<Key, Value>
}
