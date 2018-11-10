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
    'vue'
  ],
  /*
  下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
   主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
   "off" -> 0 关闭规则
   "warn" -> 1 开启警告规则
   "error" -> 2 开启错误规则
 */
  rules: {
    // 生成器函数*的前后空格
    'generator-star-spacing': 'off',
    // 使用debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 语句强制分号结尾
    'semi': [2, 'always'],
    // 强制驼峰法命名
    'camelcase': 2,
    // 逗号风格，换行时在行首还是行尾
    'comma-style': [2, "last"]
  }
};
