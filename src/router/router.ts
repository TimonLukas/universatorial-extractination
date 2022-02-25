import { createRouter, createWebHashHistory } from "vue-router"
import * as views from "@/views"

export enum GameRoute {
  MAIN = "main",
  SETTINGS = "settings",
  NOT_FOUND = "not-found",
}
export const gameRoutes = Object.values(GameRoute)

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: GameRoute.MAIN,
      component: views.MainView,
    },
    {
      path: "/settings",
      name: GameRoute.SETTINGS,
      component: views.SettingsView,
    },
  ],
})
