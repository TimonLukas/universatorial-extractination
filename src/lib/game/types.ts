import type { GameState } from "@/lib/game/state"
import type { Cost } from "@/lib/game/cost"

export type Buyable = {
  baseCost: Cost[]
}

export type Rebuyable = {
  costCoefficient: number
}

export type Nameable = {
  name: string
}

export type GameValue<T, P extends keyof GameState = keyof GameState> = {
  [K in P]: Record<keyof GameState[K], T>
}
