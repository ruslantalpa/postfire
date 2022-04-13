const { CheckerPlugin } = require('awesome-typescript-loader');
const path = require('path');
//const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    target: 'node',
    entry: {
      app: ['./src/index.ts'],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    mode: 'production',
    output: {
        filename: 'grpc_server.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: false,
    },
    node: {
        global: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                // compile with TypeScript, then transpile with Babel
                useBabel: true,
                babelCore: "@babel/core", // needed for Babel v7
              },
            },
          ],
        },
      ],
    },
    plugins: [
        new CheckerPlugin()
    ]
  }