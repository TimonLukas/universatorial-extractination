import { Currency } from "./currency"
import type { Buyable, Nameable, Rebuyable } from "@/lib/game/types"
import type { AllOf } from "@/lib/game/util"

const DEFAULT_COST_COEFFICIENT = 1.5

export enum GeneratorNames {
  DRONE = "drone",
}
export const generatorNames = Object.values(GeneratorNames) as GeneratorNames[]

export type ProductionTarget =
  | {
      type: "generators"
      target: GeneratorNames
    }
  | {
      type: "currencies"
      target: Currency
    }

export type Production = {
  amount: number
} & ProductionTarget
export type AllProductions = AllOf<Production, "target", "amount">

export type Generator = Buyable &
  Rebuyable &
  Nameable & {
    production: Production[]
  }

export const generators: Record<GeneratorNames, Generator> = {
  [GeneratorNames.DRONE]: {
    name: "Drone",
    baseCost: [{ currency: Currency.ENERGY, amount: 1 }],
    costCoefficient: DEFAULT_COST_COEFFICIENT,
    production: [
      {
        type: "currencies",
        target: Currency.THOUGHTS,
        amount: 0.01,
      },
      {
        type: "currencies",
        target: Currency.ENERGY,
        amount: 0.1,
      },
    ],
  },
}
