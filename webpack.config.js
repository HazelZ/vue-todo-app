const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLplugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_DEV === 'development'

const config = {
  mode:'none',
  target:'web', //运行在浏览器端
  entry: path.join(__dirname,'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname,'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.styl(us)?$/,
        use:[
          'style-loader',
          'css-loader',
          {
            loader:'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          'stylus-loader',
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'hz-[name].[ext]'
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLplugin(),
    new webpack.DefinePlugin({
      NODE_ENV: isDev ? '"production"' : '"development"'
    })
  ]
}

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map',
  config.devServer = {
    port: 3000,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    open: true, //自动打开页面
    historyApiFallback: true,
    hot: true,
  },
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  )
}

module.exports = config