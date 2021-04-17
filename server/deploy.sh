# markdown 转 html
npm run generator

# 将ts代码转为js
npm run build

# 将静态文件copy到dist目录下
cp -R ./public ./dist

# 使用pm2启动服务
pm2 start ./dist/index.js --name blog --exp-backoff-restart-delay=100