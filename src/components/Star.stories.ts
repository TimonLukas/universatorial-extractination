import { reactive } from "vue"

import Star from "./Star.vue"

export default {
  title: "Shaders/Star",
  component: Star,
}

const param = (value: number, min: number, max: number) =>
  reactive({ value, min, max })

// storybook remounts the component on every control value change
// this means it's best to implement our own control system for now
const paramRow = (name: string, key: string, step: number) => `
  <tr>
    <td>${name}</td>
    <td><input type="number" v-model.number="${key}.min" /></td>
    <td><input type="range" v-model.number="${key}.value" :min="${key}.min" :max="${key}.max" step="${step}" /></td>
    <td><input type="number" v-model.number="${key}.max" /></td>
    <td>{{ ${key}.value }}</td>
  </tr>
`

const Template = (args: never) => ({
  components: { Star },
  setup: () => ({
    args,
    width: param(1000, 256, 1920),
    height: param(600, 256, 1920),
    speedFactor: param(0, -10, 20),
    brightness: param(0, 0, 1),
    coronaFactor: param(1, 0, 5),
    sphereRadius: param(1, 0, 1),
    totalRadius: param(1, 0, 2),
    glowFactor: param(1, 0, 2),
  }),
  template: `
    Based on <a href="https://www.shadertoy.com/view/4dXGR4">https://www.shadertoy.com/view/4dXGR4</a><br />
    <div :style="{ width: \`\${width.value}px\`, height: \`\${height.value}px\` }">
      <star
        :speed-factor="speedFactor.value"
        :brightness="brightness.value"
        :corona-factor="coronaFactor.value"
        :sphere-radius="sphereRadius.value"
        :total-radius="totalRadius.value"
        :glow-factor="glowFactor.value"
      />
    </div>
    <br />
    <table>
      <thead>
      <tr>
        <th>variable</th>
        <th>min</th>
        <th></th>
        <th>max</th>
        <th>value</th>
      </tr>
      </thead>
      ${paramRow("Width", "width", 1)}
      ${paramRow("Height", "height", 1)}
      ${paramRow("Speed factor", "speedFactor", 0.01)}
      ${paramRow("Brightness", "brightness", 0.01)}
      ${paramRow("Corona factor", "coronaFactor", 0.01)}
      ${paramRow("Sphere radius", "sphereRadius", 0.01)}
      ${paramRow("Total radius", "totalRadius", 0.01)}
      ${paramRow("Glow factor", "glowFactor", 0.01)}
    </table>
  `,
})

export const Default = Template.bind({})
