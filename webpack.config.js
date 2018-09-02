const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLplugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const isDev = process.env.NODE_DEV === 'development'

const config = {
  mode:'none',
  target:'web', //运行在浏览器端
  entry: path.join(__dirname,'src/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
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
      /* {
            test:/\.css$/,
            use:[
                'style-loader',
                'css-loader'
            ]
          }, */
      {
        test: /\.js?$/,
        loader: 'babel-loader'
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
  config.modules.rules.push(
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
      }
  )
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
} else { //正式环境 run build
  config.mode = "production"
  config.entry = { //分离 js
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.styl(us)?$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader',
      ]
    },
  )
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "styles.[contentHash:8].css" //把css文件单独打包
    }),
  )
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks:2,
          maxInitialRequests:5,
          minSize:0
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        }
    }
  },
    runtimeChunk: true
  }
}

module.exports = config