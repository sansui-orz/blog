module.exports = {
  setupFiles: [ // 配置文件，在运行测试案例代码之前，Jest会先运行这里的配置文件来初始化指定的测试环境
    './test/setup.js',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // 代表支持加载的文件名
  testPathIgnorePatterns: ['/node_modules/'], // 用正则来匹配不用测试的文件
  testRegex: '.*\\.test\\.js$', // 正则表示的测试文件，测试文件的格式为xxx.test.js
  collectCoverage: true, // 是否生成测试覆盖报告，如果开启，会增加测试的时间
  collectCoverageFrom: [ // 生成测试覆盖报告时检测的覆盖文件
    '<rootDir>/src/components/**/*.tsx',
  ],
  moduleNameMapper: { // 代表需要被Mock的资源名称
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest" // 用babel-jest来编译文件，生成ES6/7的语法
  },
};