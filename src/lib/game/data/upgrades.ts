import { Currency } from "../currency"
import type { Upgrade } from "../upgrades"
import { UpgradeId } from "../upgrades"
import { fromEntries } from "@/lib/object"
import { GeneratorNames } from "@/lib/game/generators"
import { costs, upgrade } from "./upgrades.dsl"

const { ENERGY, THOUGHTS } = Currency

export const upgrades: Upgrade[] = [
  upgrade(ENERGY, "base", "total", THOUGHTS, {
    id: UpgradeId._001_START_THINKING,
    name: "Start thinking",
    description: "You are...?",
    revealAfter: costs([ENERGY, 0]),
    baseCost: costs([ENERGY, 0]),
    value: 0.1,
  }),
  upgrade(THOUGHTS, "base", "total", ENERGY, {
    id: UpgradeId._002_INITIAL_ENERGY,
    name: "Initial energy",
    description: "Start collecting some energy",
    revealAfter: costs([THOUGHTS, 0]),
    baseCost: costs([THOUGHTS, 1]),
    value: 0.1,
  }),
  upgrade(THOUGHTS, "multiplier", "generator", GeneratorNames.DRONE, {
    id: UpgradeId._003_DRONE_EFFICIENCY_1,
    name: "Drone efficiency I",
    description: "Better drones!",
    revealAfter: costs([THOUGHTS, 2.5]),
    baseCost: costs([THOUGHTS, 5]),
    value: 2,
  }),
  upgrade(THOUGHTS, "multiplier", "special", "droneLifetime", {
    id: UpgradeId._004_DRONE_LIFETIME_1,
    category: Currency.ENERGY,
    name: "Drone lifetime I",
    description: "Let them live just a bit longer",
    revealAfter: costs([THOUGHTS, 5], [ENERGY, 10]),
    baseCost: costs([ENERGY, 25], [THOUGHTS, 10]),
    value: 2,
  }),
]

export const upgradesById: Record<UpgradeId, Upgrade> = fromEntries(
  upgrades.map((upgrade) => [upgrade.id, upgrade])
)

export const upgradesByTargetType: Record<Upgrade["targetType"], Upgrade[]> = {
  total: upgrades.filter((upgrade) => upgrade.targetType === "total"),
  generator: upgrades.filter((upgrade) => upgrade.targetType === "generator"),
  special: upgrades.filter((upgrade) => upgrade.targetType === "special"),
}
