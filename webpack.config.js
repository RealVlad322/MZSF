'use strict';

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const { existsSync } = require('fs');
const HtmlPlugin = require('html-webpack-plugin');
const { join } = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { DefinePlugin } = require('webpack');

// const GenerateVersionFilePlugin = require('./webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const cwd = (p) => p ? join(__dirname, p) : __dirname;

const ENV = process.env.ENV || 'development';
const isProd = ENV === 'production';
const minimize = process.env.WEBPACK_MINIMIZE === 'true' || isProd;

dotenv.config({
  path: cwd('.env'),
  override: true,
});

const dotenvFile = cwd(`.env.${ENV}`);

if (existsSync(dotenvFile)) {
  dotenv.config({
    path: dotenvFile,
    override: true,
  });
}

module.exports = [
  {
    mode: minimize ? 'production' : 'development',
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    stats: {
      logging: 'error',
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
      // minimizer: [new CssMinimizerPlugin()],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      plugins: [new TsconfigPathsPlugin()],
    },
    target: 'web',
    entry: {
      app: cwd('src/index.tsx'),
    },
    devtool: !minimize && 'eval-source-map',
    devServer: {
      static: cwd('public'),
      hot: true,
      client: {
        overlay: true,
      },
      historyApiFallback: true,
    },
    output: {
      filename: '[name]-[contenthash].bundle.js',
      path: cwd('dist'),
      devtoolModuleFilenameTemplate: '[resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[resource-path]',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProd,
                modules: {
                  auto: true,
                  mode: 'local',
                  localIdentName: isProd ? '[hash:base64:8]' : '[local]_[hash:base64:8]',
                },
                url: {
                  filter: (url) => !url?.startsWith('/'),
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProd,
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: '@svgr/webpack',
        },
        {
          test: /\.(?:png|jpe?g|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 200000,
            },
          },
        },
      ],
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      // new GenerateVersionFilePlugin(),
      new HtmlPlugin({
        template: cwd('src/index.html'),
      }),
      new DefinePlugin(
        Object.entries(process.env)
          .filter(([k]) => k.startsWith('REACT_'))
          .reduce((o, [k, v]) => {
            o[`import.meta.env.${k}`] = `"${v}"`;

            return o;
          }, {}),
      ),
      new CopyPlugin({
        patterns: [
          {
            from: cwd('public'),
            to: cwd('dist'),
          },
        ],
        options: {
          concurrency: 100,
        },
      }),
      !minimize && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
  },
];
