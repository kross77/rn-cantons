const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  entry: './src/example.tsx',
  mode: 'development',
  devServer: {
    port: 3332,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].chunkhash.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[chunkhash].bundle.js',
    publicPath: '/',
  },
  optimization: {
    usedExports: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ]
}
