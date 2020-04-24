<template>
    <div class="card">
        <div class="main">
            <p class="main-p-state">已完成</p>
            <div class="card-content">
                <h3>英语单词100个</h3>
                <p>今天要好好学习英语</p>
                <span>学习打卡</span>
            </div>
            <div class="card-btn">打卡</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'card'
}
</script>

<style scoped>
.card {
    background: #f0f0f0;
    height: 100vh;
} 
.main {
    padding-top: 20rpx;
    width: 700rpx;
    margin: 0 auto;
}
.main-p-state {
    text-align: left;
    color: #333;
}
.card-content {
    margin-top: 30rpx;
}
.card-content h3 {
    font-size: 40rpx;
    margin-bottom: 30rpx;
}
.card-content p {
    min-height: 200rpx;
    color: #666;
    font-size: 28rpx;
}
.card-content span {
    margin-top: 30rpx;
}
.card-btn {
    position: fixed;
    right: 100rpx;
    bottom: 200rpx;
    box-sizing: border-box;
    padding: 20rpx;
    background: #409EFF;
    color: #fff;
    border-radius: 5px;
}
</style>