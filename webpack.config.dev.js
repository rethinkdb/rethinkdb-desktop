const { spawn } = require('child_process')
const path = require('path')
const webpack = require('webpack')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const PORT = process.env.PORT || 7000
const PUBLIC_PATH = `https://localhost:${PORT}/dist/`

module.exports = {
  bail: true,
  // sourcemaps
  devtool: 'cheap-module-eval-source-map',
  target: 'electron-renderer',
  // input
  entry: [
    `webpack-dev-server/client?https://localhost:${PORT}/`,
    'webpack/hot/only-dev-server',
    './app/renderer/index.js'
  ],
  // output
  output: {
    publicPath: PUBLIC_PATH,
    filename: 'renderer.dev.js'
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
          cacheDirectory: true,
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
    new webpack.HotModuleReplacementPlugin({
      multiStep: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new MonacoWebpackPlugin({
      languages: ['javascript', 'typescript']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      },
      'process.browser': true
    })
  ],
  // manipulations
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app', 'renderer')
    }
  },
  // dev server
  devServer: {
    https: true,
    port: PORT,
    publicPath: PUBLIC_PATH,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, 'dist'),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    },
    before() {
      if (process.env.START_HOT) {
        console.log('Starting Main Process...')
        spawn('npm', ['run', 'start-main-dev'], {
          shell: true,
          env: process.env,
          stdio: 'inherit'
        })
          .on('close', code => process.exit(code))
          .on('error', spawnError => console.error(spawnError))
      }
    }
  }
}
