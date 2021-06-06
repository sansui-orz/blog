#!/bin/bash

echo "子脚本：服务正在重启.."

git pull

sleep 2

npm run deploy

# pm2 restart blog

echo "子脚本：服务重启完毕。脚本退出！"
exit
