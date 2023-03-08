const mergeFn = require('lodash/merge');
const config = require('./config');

module.exports = class StyleConfigWebpackPlugin {
  constructor(options) {
    this.options = options;

    this.getOptions = this.getOptions.bind(this);
  }

  apply(compiler) {
    const { constructor, getOptions } = this;

    const cfg = config(getOptions(compiler));
    // Merge config
    compiler.hooks.afterEnvironment.tap(constructor.name, () => compiler.options.module.rules.push(...cfg.module.rules));
    cfg.plugins.forEach((plugin) => plugin.apply(compiler));
  }

  getOptions(compiler) {
    const isDev = compiler.options.mode === 'development';
    const defaultOpt = {
      cssModulesQuery: 'modules',
      usePostCSS: true,
      extract: !isDev && {
        filename: 'static/css/[contenthash:10].css',
        chunkFilename: 'static/css/[contenthash:10].css',
      },
      sourceMap: isDev,
      cssModulesName: isDev ? '[name]__[local]--[hash:base64:5]' : '_[hash:base64:10]',
      generator: (suffix, loaders) => (isDev ? ['style-loader'].concat(loaders) : loaders),
      minimizer: {
        minimizerOptions: {
          preset: ['default', {
            discardComments: {
              removeAll: true,
            },
          }],
        },
      },
    };
    return mergeFn({}, defaultOpt, this.options, { isDev, context: compiler.context || process.cwd() });
  }
};
