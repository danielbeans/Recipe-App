const { dirname } = require("path");
const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@shared": path.resolve(__dirname, "../shared"),
      },
    },
  },
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: "http://localhost:3000",
  },

  chainWebpack: (config) => config.resolve.symlinks(false),
};
