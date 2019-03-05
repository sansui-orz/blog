###### **安装依赖**
```
npm install --save express multer formidable body-parser
```

###### app.js

###### 使用multer保存表单图片
```
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // 保存在当前目录下的uploads文件夹

// file为表单中字段的属性名
app.post('/img', upload.single('file'), (req, res) => {
    console.log(req.file); // 此时req对象中就多了个file字段
    res.json({
        message: 'I got it.'
    });
});

const server = app.listen(3000, () => {
    console.log('服务挂载在3000端口');
});
```

###### 使用formidable保存表单图片
```
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const formidable = require('formidable');

// file为表单中字段的属性名
app.post('/img', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fileds, files) {
        if (err) {
            res.json({
                message: 'I lose it.'
            });
        } else {
            console.log(files); // 此时文件应该是保存在内存中，但是我看到文件路径似乎在你安装node的文件夹中，所以我也不知道到底文件保存在哪里。
            res.json({
                message: 'I got it.'
            });
        }
    });
});

const server = app.listen(3000, () => {
    console.log('服务挂载在3000端口');
});
```

###### 将上传的文件保存到腾讯云cos上
```
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // 保存在当前目录下的uploads文件夹
const COS = require('cos-nodejs-sdk-v5'); // 这个依赖另外安装
const config = require('./config'); // 保存cos的敏感信息
const fs = require('fs');
const cos = new COS({
  SecretId: config.secretId,
  SecretKey: config.secretKey
});

// file为表单中字段的属性名
app.post('/img', upload.single('file'), (req, res) => {
    cos.putObject({
        Bucket: config.bucket,
        Region: config.region,
        Key: 'node_upload/' + req.file.filename,
        Body: fs.createReadStream(req.file.path)
    }, (err, data) => {
        // 上传之后最好删掉原图，以免占用服务器资源
        fs.unlink(req.file.path, () => {});
        if (err) {
            res.json({
                message: 'I lose it.'
            });
        } else {
            res.json({
                filePath: 'https://' + data.Location
            });
        }
    });
});

const server = app.listen(3000, () => {
    console.log('服务挂载在3000端口');
});
```
