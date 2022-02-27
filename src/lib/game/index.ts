import { useMemoize } from "@vueuse/core"
import { reactive, unref } from "vue"
import type { GameState } from "@/lib/game/state"
import { initialize } from "@/lib/game/state"
import { useValues } from "@/lib/game/values"
import { currencies } from "@/lib/game/currency"
import { generatorNames } from "@/lib/game/generators"

const createGame = (): { state: GameState } & ReturnType<typeof useValues> => {
  const state = reactive<GameState>(initialize())
  const { prices, bonuses, generatorProductions, totalProductions, upgrades } =
    useValues(state)

  let lastUpdateExecution = Date.now()
  const update = (): void => {
    const elapsedTimeInS = (Date.now() - lastUpdateExecution) / 1000
    lastUpdateExecution = Date.now()

    currencies.forEach((currency) => {
      state.currencies[currency] +=
        unref(totalProductions.currencies[currency]) * elapsedTimeInS
    })

    generatorNames.forEach((generator) => {
      state.generators[generator].generated +=
        unref(totalProductions.generators[generator]) * elapsedTimeInS
    })

    requestAnimationFrame(update)
  }
  update()

  return {
    state,
    prices,
    bonuses,
    generatorProductions,
    totalProductions,
    upgrades,
  }
}

export default useMemoize(createGame)
export * from "./actions"

export type Game = ReturnType<typeof createGame>
