<template>
  <div class="main">
    <div class="user">
      <div class="user-info">
        <button v-if="!showLogin" open-type="getUserInfo" @click="getLogin">点击登录</button>
        <div v-if="showLogin">
          <div class="user-img">
            <img :src="userInfo.avatarUrl" alt />
          </div>
          <p>{{userInfo.nickName}}</p>
        </div>
      </div>
    </div>
    <div class="nav">
      <ul>
        <li>
          <i class="iconfont">&#xe6d3;</i>
          <p>我的打卡</p>
        </li>
        <li>
          <i class="iconfont">&#xe635;</i>
          <p>排名榜</p>
        </li>
        <li>
          <i class="iconfont">&#xe661;</i>
          <p>意见反馈</p>
        </li>
        <li>
          <i class="iconfont">&#xe6af;</i>
          <p>设置</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Login } from "../../../static/server/controller/index";
export default {
  name: "personal",
  data() {
    return {
      showLogin: false,
      userInfo: {},
    };
  },
  created() {
    if (wx.getStorageSync("userInfo")) {
      this.LoginState(JSON.parse(wx.getStorageSync("userInfo")));
    }
  },
  methods: {
    getLogin() {
      wx.showLoading({
        title: "登录中..."
      });
      Login().then(res => {
        // 将用户信息保存到本地
        wx.setStorageSync("userInfo", JSON.stringify(res));
        this.LoginState(res);
        wx.hideLoading();
      });
    },
    LoginState(userInfo) {
      // 用户登录修改状态
      this.showLogin = true;
      this.userInfo = userInfo;
    }
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  min-height: 100vh;
  background: #f0f0f0;
}
.user {
  position: relative;
  width: 100%;
  height: 400rpx;
  background: #9999cc;
}
.user-info {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
}
.user-info .user-img {
  width: 200rpx;
  height: 200rpx;
}
.user-info .user-img img {
  width: 100%;
  height: 100%;
  border-radius: 100rpx;
}
.nav {
  margin-top: 20rpx;
  width: 100%;
  background: #fff;
}
.nav ul {
  box-sizing: border-box;
  padding: 0 25rpx;
}
.nav ul li {
  display: flex;
  height: 120rpx;
  line-height: 120rpx;
  font-size: 16px;
  margin-top: 10rpx;
}
/* 图标 */
.nav ul li p {
  width: 650rpx;
  border-bottom: 1px solid #eee;
}
.nav ul li:nth-last-child(1) p {
  border-bottom: none;
}
.iconfont {
  width: 50rpx;
  margin-right: 10rpx;
}
</style>