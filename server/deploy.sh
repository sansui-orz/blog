# markdown 转 html
npm run generator

# 将ts代码转为js
npm run build

# 将静态文件copy到dist目录下
cp -R ./server/public ./server/dist

# 先停止blog服务
pm2 stop blog

# 使用pm2启动服务
pm2 start ./server/dist/index.js -o ./server/out.log -e ./server/err.log --name blog --exp-backoff-restart-delay=100 -f

# pm2 restart blog

echo "server deploy success, open: http://127.0.0.1:3011"