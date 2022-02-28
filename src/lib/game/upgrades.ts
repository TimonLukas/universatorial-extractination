import type { Buyable } from "./types"
import type { GeneratorNames } from "./generators"
import type { Cost } from "./cost"
import type { Currency } from "./currency"

export enum UpgradeId {
  _001_START_THINKING,
  _002_INITIAL_ENERGY,
  _003_DRONE_EFFICIENCY_1,
  _004_DRONE_LIFETIME_1,
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
  | {
      targetType: "special"
      target: "droneLifetime"
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
