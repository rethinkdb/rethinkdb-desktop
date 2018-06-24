const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  bail: true,
  // sourcemaps
  devtool: 'cheap-module-eval-source-map',
  target: 'electron-renderer',
  // input
  entry: path.join(__dirname, './app/renderer/index.js'),
  // output
  output: {
    path: path.join(__dirname, './app/dist'),
    filename: 'renderer.prod.js'
  },
  // transformations
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: true
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.(gif|png|jpg|jpeg)$/,
        loader: 'url-loader?limit=8192&name=[path][name].[ext]?[hash]' // inline base64 URLs for <=8k, direct URLs for the rest
      },
      {
        test: /\.(ico|woff|woff2|ttf|eot)$/,
        loader: 'url-loader?limit=1&name=[path][name].[ext]'
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      }
    ]
  },

  // plugins
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin(['./node_modules/monaco-editor/min'])
  ],
  // manipulations
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app', 'renderer')
    }
  },
  node: {
    __dirname: true,
    __filename: true
  }
}
