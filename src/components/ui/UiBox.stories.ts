import UiBox from "./UiBox.vue"

export default {
  title: "UI/Box",
  component: UiBox,
}

const Template = (args: never) => ({
  setup: () => ({ args }),
  components: { UiBox },
  template: `<ui-box><span>Some very interesting content</span></ui-box>`,
})

export const Default = Template.bind({})
