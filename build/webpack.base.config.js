var path = require('path');

var config = {
  entry: ['./src/main.js'],
  output: {
    path: './dist',
    publicPath: 'dist/',
    filename: 'build.js'
  },
  resolve: {
    root: [
      // 这里要填入相对系统根目录的绝对地址，用于组件引用的basePath
      // path.resolve('/Users/jm/Documents/webApp/zongan/web/vue/src/')
    ],
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        // make sure to exclude 3rd party code in node_modules
        exclude: /node_modules/
      },
    ]
  },
  // vue-loader config:
  // lint all JavaScript inside *.vue files with ESLint
  // make sure to adjust your .eslintrc
  vue: {
    loaders: {
      js: 'babel'
    }
  }
}


module.exports = config
