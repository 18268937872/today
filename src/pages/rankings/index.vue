<template>
  <div class="ranking" v-if="showData">
    <div class="main">
      <header>
        <span>每周一重新统计排行</span>
        <span>打卡总次数</span>
      </header>
      <article>
        <ul class="user-ranking">
          <li v-for="(item,index) in rankingsList" :key="index">
            <span class="iconfont" :id="'color'+index" v-if="index < 3">&#xe675;</span>
            <span v-else>{{index+1}}</span>
            <span class="user-img">
              <img :src="item.userInfo.avatarUrl" alt="图片" />
            </span>
            <span>{{item.userInfo.nickName}}</span>
            <span>{{item.num}}</span>
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: "rankings",
  data() {
    return {
      rankingsList: [],
      showData: false
    };
  },
  onShow() {
    this.getData();
  },
  methods: {
    getData() {
      // 获取排名榜数据
      this.showData = false;
      wx.showLoading({
        title: "数据加载中..."
      });
      wx.cloud.callFunction({
        name: "getRankings",
        success: res => {
          this.rankingsList = res.result.data;
          console.log(this.rankingsList);
          wx.hideLoading();
          this.showData = true;
        },
        fail: console.error
      });
    }
  }
};
</script>

<style scoped>
.ranking {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f0f0f0;
}
.main {
  width: 700rpx;
  margin: 0 auto;
}
header {
  margin-top: 20rpx;
}
header span:nth-child(2) {
  float: right;
}
article {
  margin-top: 20rpx;
  box-sizing: border-box;
  padding: 20rpx;
}
article ul li {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
}
article ul li span:nth-child(1) {
  display: inline-block;
  width: 60rpx;
  text-align: center;
  margin-right: 20rpx;
}
article ul li span:nth-child(4) {
  margin-left: auto;
}
.user-img {
  display: inline-block;
  width: 60rpx;
  height: 60rpx;
  margin-right: 20rpx;
}
.user-img img {
  width: 100%;
  height: 100%;
  border-radius: 60rpx;
}
.iconfont {
  font-size: 25px;
}
#color0 {
  color: rgb(240, 183, 29);
}
#color1 {
  color: #cfcfcf;
}
#color2 {
  color: #f1c2a7;
}
</style>
