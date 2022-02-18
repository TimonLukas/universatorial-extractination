const { resolve } = require("path")
const { loadConfigFromFile, mergeConfig } = require("vite")

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/vue3",
  core: {
    builder: "storybook-builder-vite",
  },
  async viteFinal(config) {
    const { config: userConfig } = await loadConfigFromFile(
      { command: "serve", mode: "" },
      resolve(__dirname, "../vite.config.ts")
    )

    return mergeConfig(config, {
      ...userConfig,
      plugins: [],
    })
  },
}
