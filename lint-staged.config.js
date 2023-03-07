module.exports = {
  // eslint格式化代码
  'src/**/*.js': (filenames) => [`eslint ${filenames.join(' ')}`],
};
