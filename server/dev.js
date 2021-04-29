const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

fs.watch(path.resolve(__dirname, './generatorArticle'), { recursive: true }, (eventType, filename) => {
  console.log('【文件更改】', filename);
  exec('sh generatorArticle/generator.sh', function (err) {
    if (err) {
      console.error('重新生成文章失败!');
    } else {
      console.log('重新生成文件成功!');
    }
  });
});