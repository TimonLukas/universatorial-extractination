import type { Cost } from "@/lib/game/cost"
import { costs } from "@/lib/game/data/upgrades.dsl"
import { Currency } from "@/lib/game/currency"

export enum GoalId {
  _001_DRONES,
}

export type Goal = { id: GoalId; cost: Cost[] }

export const goals: Record<GoalId, Goal> = [
  {
    id: GoalId._001_DRONES,
    cost: costs([Currency.ENERGY, 1]),
  },
]
