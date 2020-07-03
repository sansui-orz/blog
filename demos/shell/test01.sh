#!/bin/bash

#--------------------------------------------
# 这是一个注释
# author：菜鸟教程
# site：www.runoob.com
# slogan：学的不仅是技术，更是梦想！
#--------------------------------------------
##### 用户配置区 开始 #####
#
#
# 这里可以添加脚本描述信息
# 
#
##### 用户配置区 结束  #####

var1=`date +%y%m%d`
echo $var1
echo $HOME #系统变量
date +%y%m%d
pos=`pwd` #目录
echo $pos

echo "today is $var1" #双引号包裹内可以使用变量

echo 'today is $var1' #单引号包裹内会被当成字符串

echo 'today is '$var1'' #单引号也可以直接拼接

str='this is a string'
echo ${str:2:4} #截取字符串 从下标2开始，截取4个字符

echo ${#str} #输出长度

arr=(1 3 2 5 7 4 6) #声明字符串
arr[0]='10'
arr[2]='100'

echo ${arr[2]} #读取数组单项值
echo ${arr[@]} #读取数组所有值
echo ${#arr[@]} #获取数组长度

# 命令行向脚本(方法内也一样)传递参数
# 当n>=10时，需要使用${n}来获取参数
echo "执行的文件名 $0"
echo "第一个参数 $1" # 传递方式，执行脚本是从后面添加
echo "第二个参数 $2" # 例：sh test.sh 1 2
echo "一共有几个参数 $#"
echo "所有参数拼接的字符串 $*"
echo "当前脚本运行的进程ID $$"
echo "后台运行的最后一个进程的ID $!"
echo "拼接所有参数，但是加了引号包裹 $@"
echo "显示shell的当前选项 $-"
echo "显示命令的最后退出状态 $?"

# 基本运算符 expr与awk
a=1
b=2
val=`expr $a + $b` # 完整的表达式要被反引号包裹，运算符中间要有空格
echo "a + b = $val"

val=`expr $a - $b`
echo "a - b = $val"

val=`expr $a \* $b`
echo "a * b = $val"

val=`expr $b / $a`
echo "b / a = $val"

val=`expr $a % $b`
echo "a % b = $val"

if [ $a == $b ]
then
  echo "a == b"
fi
if [ $a != $b ]
then echo "a != b"
fi

# 关系运算符
# -eq ==
# -ne !=
# -gt >
# -lt <
# -ge >=
# -le <=
if [ $a -eq $b ]
then
   echo "$a -eq $b : a 等于 b"
else
   echo "$a -eq $b: a 不等于 b"
fi

# ! 布尔反值 [ $a != $b ]
# -o 或(||) [ $a -lt 100 -a $b -gt 15 ] 或者 [[ $a -lt 100 || $b -gt 100 ]]
# -a 并(&&) [ $a -lt 100 -o $b -gt 100 ] 或者 [[ $a -lt 100 && $b -gt 100 ]]

# 字符串运算符
# = 是否相等 [ $a = $b ] 返回 false
# != 是否不相等 [ $a != $b ] 返回 true
# -z 长度是否为0 [ -z $a ] 返回 false
# -n 长度是否不为0 [ -n $a ] 返回true
# $ 字符串是否不为空 [$a] 返回true

# 文件运算符 还有一些比较偏僻不常用的未记录
# -d 是否是目录 [-d $file]
# -f 是否是普通文件 [-f $file]
# -r 是否可读
# -w 是否可写
# -x 是否可执行
# -s 是否为空文件
# -e 是否存在


# printf 功能比较强大，但是应该很少用到
printf "%-10s %-8s %-4s\n" 姓名 性别 体重kg  
printf "%-10s %-8s %-4.2f\n" 郭靖 男 66.1234 
printf "%-10s %-8s %-4.2f\n" 杨过 男 48.6543 
printf "%-10s %-8s %-4.2f\n" 郭芙 女 47.9876

#test命令
# -eq 是否相等 if test $[num1] -eq $[num2]
# -ne 不等
# -gt >
# -lt <
# -ge >=
# -le <=

# 运算
num3=$[$a + $b]
echo "a + b = $num3"

# 文件名测试
if test -e ./bash
then
  echo '文件 ./bash存在'
else
  echo '文件 ./bash不存在'
fi

# if else if
if [$num3 == $a]
then
  echo 'num3 == a'
elif [$num3 == $b]
then
  echo 'num3 == b'
else
  echo 'num3 != a && num3 != b'
fi

# 循环
for loop in 1 2 3 4 5 # 似乎这里不能使用数组，使用数组的化只会当作一个值运行一次？
do
 echo "loop: $loop"
done

# while
int=1
while(( $int<5 ))
do
  echo "while $int"
  let "int++"
done

# while读取键盘输入
# echo '按下 <CTRL-D> 退出'
# echo -n '输入你最喜欢的网站名: '
# while read FILM
# do
#     echo "是的！$FILM 是一个好网站"
# done

# until循环，就是do while循环，用的不多，不做记录

# case
# echo '输入 1 到 4 之间的数字:'
# echo '你输入的数字为:'
# read aNum
# case $aNum in
#     1)  echo '你选择了 1'
#     ;;
#     2)  echo '你选择了 2'
#     ;;
#     3)  echo '你选择了 3'
#     ;;
#     4)  echo '你选择了 4'
#     ;;
#     *)  echo '你没有输入 1 到 4 之间的数字'
#     ;;
# esac

# break, continue与js内用法一致

# 方法
fun() {
  echo "函数内部 $*"
  return $(($a + $b))
}

echo "函数开始"
fun
echo "函数结束 返回值$? $a $b" #$? 仅对其上一条指令负责，一旦函数返回后其返回值没有立即保存入参数，那么其返回值将不再能通过 $? 获得。
echo "函数结束之后查看返回值 $?"

# 引用其他的shell脚本 效果同@include
. ./test02.sh
echo $a_string