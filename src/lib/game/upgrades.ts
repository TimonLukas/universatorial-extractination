import type { Buyable } from "./types"
import type { GeneratorNames } from "./generators"
import { Currency } from "./currency"
import type { Cost } from "@/lib/game/cost"

export enum UpgradeId {
  _01INITIAL_ENERGY = "initial-energy",
}

type Targeting =
  | {
      targetType: "generator"
      target: GeneratorNames
    }
  | {
      targetType: "total"
      target: Currency
    }

export type Upgrade = {
  id: UpgradeId
  category: Currency
  name: string
  description: string
  type: "base" | "multiplier"
  value: number
  revealAfter: Cost[]
} & Buyable &
  Targeting

const upgradesByCurrency: Record<Currency, Upgrade[]> = {
  [Currency.THOUGHTS]: [
    {
      id: UpgradeId._01INITIAL_ENERGY,
      category: Currency.THOUGHTS,
      name: "Initial energy",
      description: "Start collecting some energy",
      type: "base",
      revealAfter: [{ currency: Currency.THOUGHTS, amount: 0 }],
      baseCost: [
        {
          currency: Currency.THOUGHTS,
          amount: 0,
        },
      ],
      targetType: "total",
      target: Currency.ENERGY,
      value: 0.1,
    },
  ],
  [Currency.ENERGY]: [],
}
const allUpgrades = [
  ...upgradesByCurrency.thought,
  ...upgradesByCurrency.energy,
]

function upgradeArrayToMap(upgrades: Upgrade[]): Record<UpgradeId, Upgrade> {
  return Object.fromEntries(
    upgrades.map((upgrade) => [upgrade.id, upgrade])
  ) as Record<UpgradeId, Upgrade>
}

export const upgrades: Record<UpgradeId, Upgrade> =
  upgradeArrayToMap(allUpgrades)
