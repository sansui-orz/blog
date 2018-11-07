module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  'globals': { // 定义全局的变量
    'getApp': true,
    'wx': true,
    'Page': true,
    'App': true,
    'getCurrentPages': true,
    'global': true,
    'Component': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 2017,
    'sourceType': 'module',
    'ecmaFeatures': {
      'spread': true, // 支持扩展运算符
      'experimentalObjectRestSpread': true // 对象的扩展运算符
    }
  },
  'rules': {
    'indent': ['error',
      2 // 使用两个空格代替tab
    ],
    'quotes': ['error', 'single' // 使用单引号
    ],
    'semi': ['error', 'always' // 尾部分号;
    ],
    'no-undef': 1, // 能有未定义的变量
    'no-console': 2, // 不要console
    'no-var': 0, // 不要var
    'no-unreachable': 2, // 不能有无法执行的代码
    'eqeqeq': 2, // 必须使用全等
    'no-mixed-spaces-and-tabs': [2, false], // 禁止混用tab和空格
    'prefer-spread': 0, // 首选展开运算
    'linebreak-style': ['error', 'unix'] // 换行使用LF
  }
};