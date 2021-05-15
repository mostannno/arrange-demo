题目：实现一个arrange函数，可以进行时间和工作调度
[ > … ] 表示调用函数后的打印内容

arrange('William');
> William is notified

arrange('William').wait(5).do('commit');
> William is notified
等待 5 秒
> Start to commit

arrange('William').waitFirst(5).do('push');
等待 5 秒
> Start to push
> William is notified

安装依赖`yarn`

运行测试`yarn test`