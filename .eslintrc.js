// https://eslint.org/docs/user-guide/configuring
module.exports = {
  // 默认情况下，ESLint会在所有父级组件中寻找配置文件，一直到根目录。ESLint一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  root: true,
  // 对Babel解析器的包装使其与 ESLint 兼容
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'html'
  ],
  /*
  下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
   主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
   "off" -> 0 关闭规则
   "warn" -> 1 开启警告规则
   "error" -> 2 开启错误规则
 */
  rules: {
    // 允许在字符串和正则表达式中使用无意义的换行符
    "no-useless-escape": "off",
    // 生成器函数*的前后空格
    'generator-star-spacing': 'off',
    // 使用debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 语句强制分号结尾
    'semi': [2, 'always'],
    // 强制驼峰法命名
    'camelcase': 2,
    // 禁止在函数参数中出现重复名称的参数
    'no-dupe-args': 'error',
    // 禁止在对象字面量中出现重复名称的键名
    'no-dupe-keys': 'error',
    // 必须使用 isNaN(foo) 而不是 foo === NaN
    'use-isnan': 'error',
    // 注释必须符合 jsdoc 的规范
    // @off jsdoc 要求太严格
    'valid-jsdoc': 'off',
    // 强制在注释中 // 或 /* 使用一致的空格
    'spaced-comment': 0,
    // 禁止注释中出现 TODO 和 FIXME
    // @off TODO 很常用
    'no-warning-comments': 'off',
    // 逗号风格，换行时在行首还是行尾
    'comma-style': [2, "last"],
    'no-multiple-empty-lines': ["error", { "max": 2, "maxEOF": 1 }],
    // class 类成员之间空行
    'lines-between-class-members': [2, 'always']
  }
};
