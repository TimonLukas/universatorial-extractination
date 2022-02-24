import { createRouter, createWebHistory } from "vue-router"
import * as views from "@/views"

export enum GameRoute {
  MAIN = "main",
  SETTINGS = "settings",
  NOT_FOUND = "not-found",
}
export const gameRoutes = Object.values(GameRoute)

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
