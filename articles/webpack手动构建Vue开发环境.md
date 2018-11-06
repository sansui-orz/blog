*当然，还是建议照着官方文档来，这篇文章基本上当作是学习笔记，有错误欢迎支持，后续也是会持续更新的*`

[中文官方起步教程](https://www.webpackjs.com/guides/)

废话不多说开始吧！

新建一个文件夹，名字就叫做demo1吧

然后进入文件夹打开命令行进行项目构建

**输入: `npm init -y`**

解释一下-y的意思就是跳过提问阶段，直接生成一个新的 package.json 文件。

接着安装一下依赖，先大概想好会需要什么依赖

由于是vue项目构建，所以当然需要vue, vue-router, 请求这里就用大家都爱用的axios
注意这三个依赖是需要在打包后的文件使用的，所以安装的时候需要加上`--save`

**执行: `npm install --save vue ve-roter axios`**

然后由于会使用到es2015的语法，所以babel是要的
**执行: `npm install --dev babel-core babel-loader babel-preset-env babel-preset-es2015 babel-preset-stage-3`**

注意这里不要加`--save`，因为这里只是在开发与构建的时候使用的

当然webpack要加，这是我们的主角

**执行: `npm install --dev webpack webpack-cli html-webpack-plugin webpack-dev-server webpack-merge VueLoaderPlugin uglifyjs-webpack-plugin`**

解释一下这些都是做什么的

- webpack: 当然是主力
- webpack-cli: 命令工具，由于是看着文档来的，文档中使用的是webpack-cli来运行webpack，所以就用这个把。而实际vue项目中用的应该是cross-env
- html-webpack-plugin: webpack的html模版插件，用来生成html模版的
- webpack-dev-server: 开发热更替插件，就是当你改了代码然后帮你刷新的那个
- webpack-merge: 这个插件用来合并webpack的配置。由于后面会将开发环境与生产环境的配置分开来，所以先安装这个
- VueLoaderPlugin: vue文件解析所需要安装的插件
- uglifyjs-webpack-plugin: 代码压缩插件

ok, 现在最后还剩下各种loader了

**执行: `npm install --dev css-loader style-loader file-loader vue-loader`**

这些loader的作用就是用来加载各种不同的资源以便于构建打包的；

然后到此我们的依赖就装的差不多了，剩下的一点就在项目进行中添加吧！

将这些依赖装完之后呢，我们需要先创建几个文件定一下文档结构：

```
|- /dist
|- /src
|  |- App.vue
|  |- index.js
|
|- .babelrc
|- index.html
|- webpack.common.js
|- webpack.dev.js
|- webpack.pro.js
|- package.json
```

可以看到我们将webpack配置拆分为三个文件，这是因为将开发环境与生产环境的配置分开来了。
而避免重复又将通用的配置提取到webpack.common.js里面。

首先先处理一下webpack.common.js。让我们一步一步来。

生产环境和开发环境通用的内容有很多，首先entry入口配置，output出口配置, module的rules配置

接下来在webpack.common.js写入以下内容:
```
const path = require('path');

module.exports = {
    entry: './src/index.js', // 入口文件地址
    output: {
        filename: '[name].[hash].js', // 输出的文件名
        path: path.resolve(__dirname, 'dist') // 输出路径
    },
    plugins: [
        new HtmlWebpackPlugin({ // 生成构建html的模版
            template: './index.html' // 指定模版路径 
        }),
        new VeLoaderPlugin() // vue解析所需要的插件
    ],
    module: {
        rules: [
            {
                test: /\.css$/, // 指定loader解析css文件
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.vue$/, // 指定loader解析vue文件
                use: 'vue-loader'
            },
            {
                test: /\.js$/, // 指定babel进行js转码
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }],
                    exclude: /node_modules/
            },
            { // 指定引用文件loader
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    }
}
```

如上，我们基本已经配置完了webpack的通用配置了，接下来就分别针对不同的环境进行一下特殊的配置

webpack.dev.js
```
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development', // 指定当前环境，支持参数development, production, none会对应开启一些优化
    devtool: 'inline-source-map', // 加入资源映射，方便在开发阶段进行调试
    devServer: { // 开启开发服务器
        contentBase: './dist'
    }
});
```

webpack.pro.js
```
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new UglifyJSPlugin({ // 启用代码压缩
            sourceMap: true
        }),
        new webpack.DefinePlugin({ // 指定当前环境，防止某些库会用到这个参数
            'process.env.NODE_ENV': JSON.stringify('production')    
        })
    ]
})
```

到这里，webpack的基本配置就先这样了。优化就在后面再做。

接下来处理一下我们的入口文件，目前的入口文件还是空的

index.js
```
import Vue from 'vue';
import App from './App.vue';

new Vue({
    el: '#app',
    render: h => h(App)
});
```

App.vue
```
<template>
    <div>{{hello}}</div>
</template>
<script>
export default {
    name: 'app',
    data() {
        return {
            hello: '你好的vue和webpack'
        };
    }
}
</script>
```

到这里基本内容就完成了，那么如果运行呢

我们需要在package.json里面添加几条命令

package.json
```
{
  "scripts": {
    "build": "webpack --config webpack.pro.js",
    "start": "webpack-dev-server --open --config webpack.dev.js"
  },
}
```

然后在命令行输入```npm start```即可运行。 输入```npm run build```打包

让我们先试一下有没有问题