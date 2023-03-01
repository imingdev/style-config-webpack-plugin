<h1 align="center">@pieced/style-config-webpack-plugin 👋</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/@pieced/style-config-webpack-plugin" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@pieced/style-config-webpack-plugin.svg">
  </a>
  <a href="https://www.npmjs.com/package/@pieced/style-config-webpack-plugin" target="_blank">
    <img alt="Download" src="https://img.shields.io/npm/dm/@pieced/style-config-webpack-plugin.svg?color=blue" />
  </a>
  <a href="https://www.npmjs.com/package/@pieced/style-config-webpack-plugin" target="_blank">
  <img alt="Webpack" src="https://img.shields.io/badge/webpack->=5.0.0-blue">
  </a>
  <a href="https://www.npmjs.com/package/@pieced/style-config-webpack-plugin" target="_blank">
  <img alt="Last Commit" src="https://img.shields.io/github/last-commit/pieced-team/style-config-webpack-plugin">
  </a>
  <a href="https://www.npmjs.com/package/@pieced/style-config-webpack-plugin" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/npm/l/@pieced/style-config-webpack-plugin" />
  </a>
</p>

> Automatically configuration webpack5 style loader

## Install

```sh
npm i --save-dev @pieced/style-config-webpack-plugin
```

## Webpack Config

```js
const StyleConfigWebpackPlugin = require('@pieced/style-config-webpack-plugin');
module.exports = {
  plugins: [new StyleConfigWebpackPlugin()],
};
```

## Options

**cssModulesQuery**

- `type string`
- `default modules`

**usePostCSS**

- `type boolean`
- `default true`

**extract**

- `type boolean or object`
- default

```js
const defaultExtract = webpack.mode === 'production' && {
  filename: 'static/css/[contenthash:10].css',
  chunkFilename: 'static/css/[contenthash:10].css',
}
```

**sourceMap**

- `type boolean`
- `default webpack.mode === 'development'`

**cssModulesName**

- `type string`
- `default webpack.mode === 'development' ? '[name]__[local]--[hash:base64:5]' : '_[hash:base64:10]'`

**generator**

- `type function`
- `default (suffix, loaders) => (webpack.mode === 'development' ? ['style-loader'].concat(loaders) : loaders)`

**minimizer**

- `type object`
- default

```js
const defaultMinimizer = {
  minimizerOptions: {
    preset: ['default', {
      discardComments: {
        removeAll: true,
      },
    }],
  },
}
```
