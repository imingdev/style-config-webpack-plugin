const path = require('path');
const fs = require('fs');
const mergeFn = require('lodash/merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

// search postcss options file
const searchOptionsFile = (rootDir) => {
  const fileList = [
    '.postcssrc',
    '.postcssrc.json',
    '.postcssrc.yaml',
    '.postcssrc.yml',
    '.postcssrc.js',
    '.postcssrc.cjs',
    'postcss.config.js',
    'postcss.config.cjs',
  ];
  // eslint-disable-next-line no-restricted-syntax
  for (const file of fileList) {
    const configFile = path.resolve(rootDir, file);
    if (fs.existsSync(configFile)) {
      return configFile;
    }
  }
};

// postcss options
const getPostcssOptions = (opt) => {
  const postcssCfgFile = searchOptionsFile(opt.context);
  if (postcssCfgFile) {
    return {
      config: postcssCfgFile,
    };
  }

  return {
    plugins: {
      'postcss-preset-env': {},
    },
  };
};

// css loader
const cssLoaders = (opt) => {
  const { usePostCSS, useCssModules, extract, sourceMap, cssModulesName, generator, postcssOptions } = opt;

  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        auto: useCssModules ? undefined : /\.module\.\w+$/i,
        localIdentName: cssModulesName,
      },
      sourceMap,
    },
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap,
      postcssOptions,
    },
  };

  // generate loader string to be used with extract text plugin
  const generateLoaders = (loader, loaderOptions) => {
    const loaders = usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: {
          ...loaderOptions,
          sourceMap,
        },
      });
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (extract) {
      return [MiniCssExtractPlugin.loader].concat(loaders);
    }
    return loaders;
  };

  return {
    css: generator('css', generateLoaders(), opt),
    postcss: generator('postcss', generateLoaders(), opt),
    less: generator('less', generateLoaders('less'), opt),
    sass: generator('sass', generateLoaders('sass', { indentedSyntax: true }), opt),
    scss: generator('scss', generateLoaders('sass'), opt),
    stylus: generator('stylus', generateLoaders('stylus'), opt),
    styl: generator('styl', generateLoaders('stylus'), opt),
  };
};

// Generate loaders
const styleLoaders = (options) => {
  const postcssOptions = getPostcssOptions(options);
  const useCssModules = !!options.useCssModules;
  const normalLoaders = cssLoaders(mergeFn({}, options, { useCssModules: false, postcssOptions }));
  if (useCssModules) {
    const cssModulesLoaders = cssLoaders(mergeFn({}, options, { useCssModules: true, postcssOptions }));
    return Object.keys(normalLoaders).map((suffix) => {
      const test = new RegExp(`\\.${suffix}$`, 'i');
      const curNormalLoaders = normalLoaders[suffix];
      return {
        oneOf: [{
          test,
          resourceQuery: new RegExp(options.cssModulesQuery),
          use: cssModulesLoaders[suffix],
        }, {
          test,
          use: curNormalLoaders,
        }],
      };
    });
  }

  return Object.keys(normalLoaders).map((suffix) => ({
    test: new RegExp(`\\.${suffix}$`, 'i'),
    use: normalLoaders[suffix],
  }));
};

module.exports = (options) => ({
  module: {
    rules: styleLoaders(options),
  },
  plugins: [
    !options.isDev && options.extract && new MiniCssExtractPlugin({
      filename: options.extract.filename,
      chunkFilename: options.extract.chunkFilename,
    }),
    !options.isDev && new CssMinimizerWebpackPlugin(options.minimizer),
  ].filter(Boolean),
});
