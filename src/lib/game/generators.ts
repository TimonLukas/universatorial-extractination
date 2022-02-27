import type { Currency } from "./currency"
import type { Buyable, Nameable, Rebuyable } from "@/lib/game/types"
import type { AllOf } from "@/lib/game/util"

export enum GeneratorNames {
  DRONE = "Drone",
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

export type Generator = Readonly<
  Buyable &
    Rebuyable &
    Nameable & {
      production: Production[]
    }
>
