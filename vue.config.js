var webpack =require('webpack');
module.exports = {

    publicPath: './',
    configureWebpack: {
      plugins: [
        new webpack.ProvidePlugin({
           zrender:"zrender",
          "windows.zrender":"zrender"
        })
      ]
  },
  devServer: {
      public: "server.inhun.io",
	    disableHostCheck: true  
  },
  
    lintOnSave: undefined
};
  
