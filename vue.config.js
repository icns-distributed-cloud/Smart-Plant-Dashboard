module.exports = {
  devServer: {
    proxy: {
      "/": {
        target: "*",
      },
    },
  },
};
