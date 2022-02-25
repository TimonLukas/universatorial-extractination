import UiButton from "./UiButton.vue"
import { action } from "@storybook/addon-actions"

export default {
  title: "UI/Button",
  component: UiButton,
}

const Template = (args: never) => ({
  setup: () => ({ args, click: action("click") }),
  components: { UiButton },
  template: `<ui-button @click="click">Click me!</ui-button>`,
})

export const Default = Template.bind({})
