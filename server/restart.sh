#! /bin/bash

lastMessage=`git status | tail -n 2`
#nothing to commit, working tree clean 本地没有变化
noCommit='nothing to commit'

if [[ $lastMessage =~ $noCommit ]]; then
    git pull

    sh ./restart2.sh &

    pid=$!

    echo "状态ready，等待重启! 子进程: ${pid}"

    exit
fi
echo "代码有变更，请检查本地代码变更！"
