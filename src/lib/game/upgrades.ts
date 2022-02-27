import type { Buyable } from "./types"
import type { GeneratorNames } from "./generators"
import type { Cost } from "./cost"
import type { Currency } from "./currency"

export enum UpgradeId {
  _001_START_THINKING,
  _002_INITIAL_ENERGY,
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

export type Upgrade = Readonly<
  {
    id: UpgradeId
    category: Currency
    name: string
    description: string
    type: "base" | "multiplier"
    value: number
    revealAfter: Cost[]
  } & Buyable &
    Targeting
>
