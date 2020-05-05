<template>
  <div class="myclick">
    <div class="main">
      <header>
        <h3>打卡次数</h3>
        <p>{{num}}</p>
      </header>
      <article>
        <h5>周打卡数</h5>
        <p>近四周打卡数</p>
        <div class="my-ranking">
          <AllRound></AllRound>
        </div>
        <div class="article-p-round">
          <span>本周勤劳排行榜</span>
          <span @click="jump">></span>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import AllRound from "@/components/allRound";
export default {
  name: "myClick",
  data() {
    return {
      num: ""
    };
  },
  components: {
    AllRound
  },
  onLoad() {
    this.getRanking();
  },
  methods: {
    getRanking() {
      let openid = JSON.parse(wx.getStorageSync("userInfo")).openid;
      let db = wx.cloud.database();
      db
        .collection("rankings")
        .where({
          _id: openid
        })
        .get()
        .then(res => {
          this.num = res.data[0].num;
        });
    },
    jump() {
      wx.navigateTo({
        url: "/pages/rankings/main"
      });
    }
  }
};
</script>

<style scoped>
.myclick {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f0f0f0;
}
.main {
  width: 700rpx;
  margin-top: 60rpx;
  margin: 0 auto;
}
header {
  margin: 20rpx 0;
  font-size: 18px;
  font-weight: 600;
}
header p {
  margin-top: 10rpx;
  text-indent: 1.5em;
  color: rgba(200, 62, 62, 1);
}
article {
  box-sizing: border-box;
  padding: 20rpx;
  border: 1px solid rgb(187, 187, 187);
  border-radius: 5px;
  background: #fff;
}
article p {
  margin: 10rpx 0;
  font-size: 14px;
}
.article-p-round {
  margin-top: 10rpx;
  height: 60rpx;
  line-height: 60rpx;
}
.article-p-round span:nth-child(1) {
  display: inline-block;
  width: 80%;
}
.article-p-round span:nth-child(2) {
  display: inline-block;
  width: 20%;
  text-align: center;
  font-size: 18px;
}
</style>