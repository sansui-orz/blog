#!/bin/bash

echo "子脚本：服务正在重启.."

sleep 2

pm2 restart blog

echo "子脚本：服务重启完毕。脚本退出！"
