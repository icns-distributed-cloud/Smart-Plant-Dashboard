var webpack = require("webpack");
module.exports = {
  publicPath: "",
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        zrender: "zrender",
        "windows.zrender": "zrender",
      }),
    ],
  },
  devServer: {
    proxy: {
      '/api' : {
        target: 'http://163.180.117.38:8281',
        changeOrigin: true,
      }
    },
    public: "server.inhun.io",
    disableHostCheck: true,
    overlay: false,
  },

  lintOnSave: undefined,
};
