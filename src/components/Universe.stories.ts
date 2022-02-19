import Universe from "@/components/Universe.vue"

export default {
  title: "Shaders/Universe",
  component: Universe,
}

const Template = (args: never) => ({
  setup: () => ({ args }),
  components: { Universe },
  template: `
    Based on <a href="https://www.shadertoy.com/view/MslGWN">https://www.shadertoy.com/view/MslGWN</a>
    <div style="width: 800px; height: 800px; background: black">
      <universe />
    </div>
  `,
})

export const Default = Template.bind({})
