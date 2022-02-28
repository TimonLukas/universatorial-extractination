import { Currency } from "@/lib/game/currency"
import type { Upgrade } from "@/lib/game/upgrades"

const cost = (currency: Currency, amount: number) => ({
  currency,
  amount,
})
export const costs = (...definitions: Parameters<typeof cost>[]) =>
  definitions.map(([currency, amount]) => cost(currency, amount))

const withKey =
  <Key extends keyof Upgrade, Value extends Upgrade[Key]>(
    key: Key,
    value: Value
  ) =>
  <T extends Partial<Upgrade>>(input: T): T & { [k in Key]: Value } => ({
    ...input,
    [key]: value,
  })

export const tBase = withKey("type", "base")
export const tMultiplier = withKey("type", "multiplier")

export const cEnergy = withKey("category", Currency.ENERGY)
export const cThoughts = withKey("category", Currency.THOUGHTS)

export const upgrade = <
  T extends Omit<Upgrade, "category" | "type" | "targetType" | "target">
>(
  category: Upgrade["category"],
  type: Upgrade["type"],
  targetType: Upgrade["targetType"],
  target: Upgrade["target"],
  input: T
): Upgrade =>
  ({
    ...input,
    category,
    type,
    targetType,
    target,
  } as Upgrade)
