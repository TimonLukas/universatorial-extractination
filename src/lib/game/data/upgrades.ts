import { Currency } from "../currency"
import type { Upgrade } from "../upgrades"
import { UpgradeId } from "../upgrades"
import { fromEntries } from "@/lib/object"
import { GeneratorNames } from "@/lib/game/generators"

export const upgrades: Upgrade[] = [
  {
    id: UpgradeId._001_START_THINKING,
    category: Currency.ENERGY,
    name: "Start thinking",
    description: "You are...?",
    type: "base",
    revealAfter: [{ currency: Currency.ENERGY, amount: 0 }],
    baseCost: [{ currency: Currency.ENERGY, amount: 0 }],
    targetType: "total",
    target: Currency.THOUGHTS,
    value: 0.1,
  },
  {
    id: UpgradeId._002_INITIAL_ENERGY,
    category: Currency.THOUGHTS,
    name: "Initial energy",
    description: "Start collecting some energy",
    type: "base",
    revealAfter: [{ currency: Currency.THOUGHTS, amount: 0.0 }],
    baseCost: [
      {
        currency: Currency.THOUGHTS,
        amount: 1,
      },
    ],
    targetType: "total",
    target: Currency.ENERGY,
    value: 0.1,
  },
  {
    id: UpgradeId._003_DRONE_EFFICIENCY,
    category: Currency.THOUGHTS,
    name: "Drone efficiency",
    description: "Better drones!",
    type: "multiplier",
    revealAfter: [{ currency: Currency.THOUGHTS, amount: 2.5 }],
    baseCost: [
      {
        currency: Currency.THOUGHTS,
        amount: 5,
      },
    ],
    targetType: "generator",
    target: GeneratorNames.DRONE,
    value: 2,
  },
]

export const upgradesById: Record<UpgradeId, Upgrade> = fromEntries(
  upgrades.map((upgrade) => [upgrade.id, upgrade])
)

export const upgradesByTargetType: Record<Upgrade["targetType"], Upgrade[]> = {
  total: upgrades.filter((upgrade) => upgrade.targetType === "total"),
  generator: upgrades.filter((upgrade) => upgrade.targetType === "generator"),
}
