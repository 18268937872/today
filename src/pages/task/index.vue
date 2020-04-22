<template>
    <div class="task">
        <div class="main">
            <header class="header">今日任务(4/5)</header>
            <div class="cont">
                <ul>
                    <li><span>今天好好学习今天好好学习今天好好学习</span><span>已完成</span></li>
                    <li><span>今天好好学习今天好好学习今天好好学习</span><span>已完成</span></li>
                    <li><span>今天好好学习今天好好学习今天好好学习</span><span>未完成</span></li>
                    <li><span>今天好好学习今天好好学习今天好好学习</span><span>已完成</span></li>
                    <li><span>今天好好学习今天好好学习今天好好学习</span><span>未完成</span></li>
                    <li><span>今天好好学习今天好好学习今天好好学习</span><span>已完成</span></li>
                </ul>
            </div>
        </div>
        <div class="newTask">+</div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.task {
    padding-top: 20rpx;
    min-height: 100vh;
    background: #f0f0f0;
}
.main {
    width: 700rpx;
    margin: 0 auto;
}
.header {
    margin: 20rpx 0 40rpx 0;
    display: flex;
}
.header .newTask {
    align-items: flex-end;
}
.cont li {
    margin-top: 20rpx;
    padding: 30rpx 0;
    border: 1px solid #fff;
    border-radius: 5px;
    background: #fff;
}
.cont li span:nth-child(1){
    display: inline-block;
    margin-left: 20rpx;
    width: 400rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.cont li span:nth-child(2){
    float: right;
    margin-right: 20rpx;
}
.newTask {
    position: fixed;
    bottom: 50rpx;
    right: 70rpx;
    width: 100rpx;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    border-radius: 50rpx;
    background: #409EFF;
    color: #fff;
    font-size: 60rpx;
}
</style>