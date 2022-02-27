import { fromEntries } from "@/lib/object"

export type AllOf<
  Type extends { [tk in TypeKey]: Type[tk] } & { [k in Key]: Type[k] },
  TypeKey extends string,
  Key extends string
> = Record<Type[TypeKey], Type[Key]>

export const toAllOf = <
  Type extends AllOf<Record<string, unknown>, string, string>
>(
  value: Partial<Type>,
  allKeys: (keyof Type)[],
  initialValue: Type[keyof Type]
): Type => {
  const existingKeys = Object.keys(value) as (keyof Type)[]
  const missingKeys = allKeys.filter(
    (key) => !existingKeys.includes(key)
  ) as Exclude<keyof Type, keyof typeof value>[]

  const missingObject = fromEntries(
    missingKeys.map((key) => [key, initialValue])
  )

  return {
    ...value,
    ...missingObject,
  } as Type
}
