module.exports = {
  // eslint格式化代码
  '{src,config}/**/*.js': (filenames) => [`eslint ${filenames.join(' ')}`],
};
