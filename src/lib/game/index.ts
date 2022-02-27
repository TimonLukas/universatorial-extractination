import { useMemoize } from "@vueuse/core"
import { reactive, unref } from "vue"
import type { GameState } from "@/lib/game/state"
import { initialize } from "@/lib/game/state"
import { useValues } from "@/lib/game/values"
import { currencies } from "@/lib/game/currency"
import { GeneratorNames, generatorNames } from "@/lib/game/generators"

const createGame = (): { state: GameState } & ReturnType<typeof useValues> => {
  const state = reactive<GameState>(initialize())
  const { prices, bonuses, generatorProductions, totalProductions, upgrades } =
    useValues(state)

  let lastUpdateExecution = Date.now()
  const update = (): void => {
    const elapsedTimeInMs = Date.now() - lastUpdateExecution
    const elapsedTimeInS = elapsedTimeInMs / 1000
    lastUpdateExecution = Date.now()

    state.generators[GeneratorNames.DRONE].bought = state.droneLifetimes.length

    currencies.forEach((currency) => {
      state.currencies[currency] +=
        unref(totalProductions.currencies[currency]) * elapsedTimeInS
    })

    generatorNames.forEach((generator) => {
      state.generators[generator].generated +=
        unref(totalProductions.generators[generator]) * elapsedTimeInS
    })

    state.droneLifetimes
      .map((_, i) => i)
      .filter((index) => {
        state.droneLifetimes[index] -= elapsedTimeInMs

        return state.droneLifetimes[index] < 0
      })
      .sort((a, b) => b - a)
      .forEach((index) => state.droneLifetimes.splice(index, 1))

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
