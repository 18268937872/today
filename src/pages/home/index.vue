<template>
  <div class="main">
      <div class="cont">
          <div class="cont-img">
              <img src="../../../static/images/home.jpg" alt="">
          </div>
          <div class="cont-instructions">
              <h3>学习打卡</h3>
              <div class="btn">已完成</div>
          </div>
      </div>
      <div class="cont">
          <div class="cont-img">
              <img src="../../../static/images/home.jpg" alt="">
          </div>
          <div class="cont-instructions">
              <h3>生活打卡</h3>
              <div class="btn">去打卡</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.main {
    padding-top: 20rpx;
    background-color: #f0f0f0;
    min-height: 100vh;
}
.cont {
    width: 700rpx;
    margin: 0 auto;
    margin-bottom: 20rpx;
}
.cont-img {
    width: 100%;
    height: 280rpx;
}
.cont-img img {
    width: 100%;
    height: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.cont-instructions {
    box-sizing: border-box;
    width: 100%;
    padding: 0 25rpx;
    height: 240rpx;
    margin: 0 auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background: #fff;
}
.cont-instructions h3 {
    padding: 25rpx 0;
    font-size: 20px;  
}
.btn {
    box-sizing: border-box;
    text-align: center;
    padding: 20rpx 0;
    margin-top: 20rpx;
    display: block;
    border-radius: 20px;
    background: #409EFF;
    color: #fff;
}
</style>