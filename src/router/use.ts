import { computed, reactive } from "vue"
import type { RouteRecordNormalized } from "vue-router"
import { onBeforeRouteUpdate, useRoute } from "vue-router"
import { GameRoute, gameRoutes } from "@/router"
import { useMemoize } from "@vueuse/core"

type Change<T> = {
  previous: T
  current: T
}
type RouteChange = Change<RouteRecordNormalized[]>

export const useRoutes = useMemoize(() => {
  const routes = reactive<RouteChange>({
    previous: [],
    current: useRoute().matched,
  })

  onBeforeRouteUpdate(async (to, from) => {
    routes.previous = from.matched
    routes.current = to.matched
  })

  return routes
})

export const useGameRoute = useMemoize(() =>
  computed<GameRoute>(() => {
    const route = useRoute()

    const activeGameRoute = route.matched.find((route) =>
      gameRoutes.includes(route.name as GameRoute)
    )

    if (typeof activeGameRoute === "undefined") {
      return GameRoute.NOT_FOUND
    }

    return activeGameRoute.name as GameRoute
  })
)

export const useIsInRouteChange = useMemoize(
  <From extends GameRoute, To extends Exclude<GameRoute, From>>(
    from: From,
    to: To
  ) => {
    const routes = useRoutes()

    return computed(
      () =>
        routes.previous.some((route) => route.name === from) &&
        routes.current.some((route) => route.name === to)
    )
  }
)
