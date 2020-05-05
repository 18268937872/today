<template>
  <div class="main">
      <div class="cont">
          <div class="cont-img">
              <img src="../../../static/images/xuexi.jpg" alt="">
          </div>
          <div class="cont-instructions">
              <h3>学习打卡</h3>
              <div class="btn" @click="btnTask('学习打卡')">去打卡</div>
          </div>
      </div>
      <div class="cont">
          <div class="cont-img">
              <img src="../../../static/images/shenghuo.jpg" alt="">
          </div>
          <div class="cont-instructions">
              <h3>生活打卡</h3>
              <div class="btn" @click="btnTask('生活打卡')">去打卡</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'home',
    methods:{
        btnTask(tesk){
            if (!wx.getStorageSync('userInfo')) {
                wx.showModal({
                title: '未登录',
                content: '你还没有登录,请先登录!',
                success (res) {
                    if (res.confirm) {
                    wx.switchTab({ url: '/pages/personal/main' })
                    } else if (res.cancel) {
                    return false
                    }
                }
                })
            }else{
                wx.navigateTo({url:`/pages/task/main?taskType=${tesk}`})
            }
        }
    }
}
</script>

<style scoped>
.main {
    background-color: #f0f0f0;
    position: fixed;
    width: 100%;
    height: 100%;
}
.cont {
    width: 700rpx;
    margin: 0 auto;
    margin-top: 20rpx;
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