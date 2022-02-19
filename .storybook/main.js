const { resolve } = require("path")
const { loadConfigFromFile, mergeConfig } = require("vite")

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/vue3",
  core: {
    builder: "storybook-builder-vite",
  },
  async viteFinal(config, { configType }) {
    const { config: userConfig } = await loadConfigFromFile(
      { command: "serve", mode: "" },
      resolve(__dirname, "../vite.config.ts")
    )

    const customConfig = {
      plugins: [],
    }

    if (configType === "PRODUCTION") {
      customConfig.base = "/universatorial-extractination/storybook/"
    }

    return mergeConfig(config, {
      ...userConfig,
      ...customConfig,
    })
  },
  managerHead(head, { configType }) {
    if (configType === "PRODUCTION") {
      return `
        ${head}
        <base href="/universatorial-extractination/storybook/">
      `
    }
  },
}
