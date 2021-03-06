import type { GameState } from "../state"
import type { GameValue } from "../types"
import type { ComputedRef } from "vue"
import { fromEntries } from "@/lib/object"
import { generatorNames } from "../generators"
import { computed } from "vue"

export type GeneratorBonuses = GameValue<ComputedRef<number>, "generators">

export const useGeneratorBonuses = (state: GameState): GeneratorBonuses => {
  return {
    generators: fromEntries(
      generatorNames.map((name) => [name, computed(() => 1)])
    ),
  }
}
