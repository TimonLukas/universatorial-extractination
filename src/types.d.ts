declare module "vue-glsl" {
  import { Component } from "vue"
  import type { default as GlCanvas } from "vue-glsl/src/components/GlCanvas.vue"
  import type { default as GlProgram } from "vue-glsl/src/components/GlProgram.vue"
  import type * as GlUniform from "vue-glsl/src/components/GlUniform.vue"

  type CollectType = Map<GlCanvas | GlProgram | keyof GlUniform>

  type Installer = {
    component(component: Component): void
    collect(): CollectType
  }
  function install(installer: Installer): void
  export = install
}
