<template>
  <div :class="showPoat?'poat-bag':null" v-if="showPoat">
    <canvas canvas-id="myCanvas" class="post-canvas"></canvas>
    <div class="post-img" v-if="showImg">
      <img :src="imgUrl" @touchstart="saveImg" />
      <span @click="hideImg" class="iconfont">&#xe63a;</span>
      <p>长按图片保存，发送给微信好友或朋友圈</p>
    </div>
  </div>
</template>

<script>
import promisify from "../utils/promisify";
export default {
  name: "posters",
  data() {
    return {
      imgUrl: "",
      showImg: false,
      Showsave: true,
      showPoat: true,
      content:[
        '一个人最大的挑战，是如何去克服自己的缺点。',
        '不同的人生，有不同的幸福。去发现你所拥有幸运，少抱怨上苍的不公，把握属于自己的幸福。你，我，我们大家都可以经历幸福的人生。',
        '只要下定决心，过去的失败，正好是未来行动的借鉴；只要不屈不挠，一时的障碍，正好是推动成功的力量。 ',
        '有望得到的要努力，无望得到的不介意，则无论输赢姿态都会好看。 ',
        '世界上那些最容易的事情中，拖延时间最不费力。',
        '金钱、地位与学历是无法帮助我们建立‘品格’、增进‘智慧’的，唯有一颗感恩的心，才会在苦难中学习到这宝贵的功课，即品格的成长，智慧的成熟。',
        '你若不想做，会找一个或无数个借口；你若想做，会想一个或无数个办法。',
        '请一定要有自信。你就是一道风景，没必要在别人风景里面仰视。',
        '不要问，不要等，不要犹豫，不要回头。没有答案的时候，就独自出去见一见这个世界。',
        '恋爱，总有风险，成功失败各占一半。想要爱得起，先要输得起！'
      ]
    };
  },
  methods: {
    hideImg() {
      this.showPoat = false;
    },
    drawPoster(info, userData) {
      let { action, adhere } = info;
      let { nickName, avatarUrl } = userData;
      let getWidth = wx.getSystemInfoSync();
      let deviceWidth = getWidth.screenWidth;
      const rpx2px = rpx =>
        deviceWidth / 750 < 1 ? rpx : deviceWidth / 750 * rpx * 2;
      wx.showLoading({
        title: "正在生成海报"
      });
      wx.getImageInfo({
        src: avatarUrl,
        success: res => {
          let url1 = res.path;

          let ctx = wx.createCanvasContext("myCanvas");
          let imgPath = "../../static/images/posters.jpg";
          const imgBag_w = rpx2px(375 * 2);
          const imgBag_h = rpx2px(667 * 2);
          ctx.drawImage(imgPath, 0, 0, imgBag_w, imgBag_h);
          // 绘制每日一句
          ctx.textAlign = "start";
          ctx.fillStyle = "#fff";
          const daily_font = rpx2px(36);
          ctx.font = `${daily_font}px arail`;
          const daily_w = rpx2px(550);
          let ran = Math.floor(Math.random()*10)
          this.newline(
            this.content[ran],
            daily_w,
            ctx,
            rpx2px
          );
          // 绘制用户信息
          ctx.fillStyle = "#fff";
          // 绘制矩形容器
          const fillRect_x = rpx2px(32.5 * 2);
          const fillRect_y = rpx2px(380 * 2);
          const fillRect_w = rpx2px(300 * 2);
          const fillRect_h = rpx2px(150 * 2);
          ctx.fillRect(fillRect_x, fillRect_y, fillRect_w, fillRect_h);
          ctx.save();
          // 绘制头像
          ctx.lineWidth = 0.1;
          ctx.beginPath();
          const arcA1 = rpx2px(70 * 2);
          const arcA2 = rpx2px(420 * 2);
          const arcA3 = rpx2px(20 * 2);
          const arcA4 = rpx2px(-20 * 2);
          ctx.arc(arcA1, arcA2, arcA3, arcA4, Math.PI * 3 / 2);
          ctx.stroke();
          // 放置头像
          ctx.save();
          let userImg = avatarUrl;
          ctx.clip();
          const userImage1 = rpx2px(50 * 2);
          const userImage2 = rpx2px(400 * 2);
          const userImage3 = rpx2px(40 * 2);
          const userImage4 = rpx2px(40 * 2);
          ctx.drawImage(url1, userImage1, userImage2, userImage3, userImage4);
          // 绘制用户名
          ctx.restore();
          let nickName_font = rpx2px(36);
          ctx.font = `${nickName_font}px arail`;
          ctx.fillStyle = "#000";
          const nickName_con1 = rpx2px(100 * 2);
          const nickName_con2 = rpx2px(420 * 2);
          ctx.fillText(nickName, nickName_con1, nickName_con2);
          ctx.fillStyle = "#333";
          const nickName_font_con = rpx2px(24);
          ctx.font = `${nickName_font_con}px arail`;
          const nickName_con_x = rpx2px(100 * 2);
          const nickName_con_y = rpx2px(440 * 2);
          ctx.fillText(
            "在(今天你打卡了吗)完成打卡",
            nickName_con_x,
            nickName_con_y
          );
          // 绘制累计打卡
          ctx.fillStyle = "#333";
          const adhere_font = rpx2px(24);
          ctx.font = `${adhere_font}px arail`;
          const adhere_con1 = rpx2px(80 * 2);
          const adhere_con2 = rpx2px(470 * 2);
          ctx.fillText("累计打卡", adhere_con1, adhere_con2);
          const adhere_font_con = rpx2px(40);
          ctx.font = `${adhere_font_con}px arail`;
          ctx.fillStyle = "#000";
          const adhere_x = rpx2px(85 * 2);
          const adhere_y = rpx2px(500 * 2);
          ctx.fillText(`${adhere}天`, adhere_x, adhere_y);
          // 绘制行动力
          ctx.fillStyle = "#333";
          const action_font = rpx2px(28);
          ctx.font = `${action_font}px arail`;
          const action_con1 = rpx2px(210 * 2);
          const action_con2 = rpx2px(470 * 2);
          ctx.fillText("行动力超过", action_con1, action_con2);
          const action_font_2 = rpx2px(40);
          ctx.font = `${action_font_2}px arail`;
          ctx.fillStyle = "#000";
          const action_con_x = rpx2px(210 * 2);
          const action_con_y = rpx2px(500 * 2);
          ctx.fillText(`${action}%`, action_con_x, action_con_y);
          ctx.fillStyle = "#333";
          const action_font_3 = rpx2px(28);
          ctx.font = `${action_font_3}px arail`;
          const action_con_tit1 = rpx2px(255 * 2);
          const action_con_tit2 = rpx2px(500 * 2);
          ctx.fillText("的成员", action_con_tit1, action_con_tit2);
          // 绘制二维码
          ctx.fillStyle = "#fff";
          const nameImg_con_1 = rpx2px(32.5 * 2);
          const nameImg_con_2 = rpx2px(550 * 2);
          const nameImg_con_3 = rpx2px(300 * 2);
          const nameImg_con_4 = rpx2px(80 * 2);
          ctx.fillRect(
            nameImg_con_1,
            nameImg_con_2,
            nameImg_con_3,
            nameImg_con_4
          );
          let nameImg = "../../static/images/user.jpg";
          const nameImg_img1 = rpx2px(50 * 2);
          const nameImg_img2 = rpx2px(565 * 2);
          const nameImg_img3 = rpx2px(50 * 2);
          const nameImg_img4 = rpx2px(50 * 2);
          ctx.drawImage(
            nameImg,
            nameImg_img1,
            nameImg_img2,
            nameImg_img3,
            nameImg_img4
          );
          ctx.fillStyle = "#000";
          const nameImg_font = rpx2px(32);
          ctx.font = `${nameImg_font}px arail`;
          const nameImg_con_x = rpx2px(105 * 2);
          const nameImg_con_y = rpx2px(590 * 2);
          ctx.fillText("今天你打卡了吗", nameImg_con_x, nameImg_con_y);
          ctx.draw();
          // 保存图片
          // const strDataURL = Canvas.toDataURL('image/png')
          setTimeout(() => {
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              canvasId: "myCanvas",
              success: res => {
                this.imgUrl = res.tempFilePath;
                wx.hideLoading;
                wx.showToast({
                  title: "海报生成成功",
                  icon: "success"
                });
                this.showImg = true;
              }
            });
          }, 2000);
        }
      });
    },
    // 文字自动换行
    newline(cont, w, ctx, rpx2px) {
      let str = cont.split("");
      let loop = "";
      let temp = [];
      for (let i in str) {
        if (ctx.measureText(loop).width > w) {
          temp.push(loop);
          loop = "";
        }
        loop += str[i];
      }
      temp.push(loop);
      // 绘制文字
      for (let j in temp) {
        const con_x = rpx2px(80);
        const con_y = rpx2px(160 + j * 50);
        ctx.fillText(temp[j], con_x, con_y);
      }
    },
    saveImg() {
      // 长按保存
      // if (!this.Showsave) {
      //   return wx.showToast({
      //     title: "图片已经保存"
      //   });
      // }
      let that = this;
      wx.getSetting({
        success(res) {
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            wx.authorize({
              scop: "scope.writePhotosAlbum",
              success() {
                wx.saveImageToPhotosAlbum({
                  filePath: that.imgUrl,
                  success() {
                    wx.showToast({
                      title: "保存成功"
                    });
                  },
                  fail() {
                    wx.showToast({
                      title: "保存失败",
                      icon: "none"
                    });
                  }
                });
              },
              fail() {
                that.setData({
                  // 如果用户拒绝过或没有授权，则再次打开授权窗口
                  openSet: true
                });
              }
            });
          } else {
            wx.saveImageToPhotosAlbum({
              filePath: that.imgUrl,
              success() {
                wx.showToast({
                  title: "保存成功"
                });
              },
              fail() {
                wx.showToast({
                  title: "保存失败",
                  icon: "none"
                });
              }
            });
          }
        }
      });
      this.Showsave = false;
    }
  }
};
</script>

<style scoped>
.poat-bag {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.post-canvas {
  position: absolute;
  top: -9999px;
  left: -9999px;
  width: 750px;
  height: 1334px;
}
.post-img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 600rpx;
  height: 1067rpx;
  border-radius: 5px;
}
.post-img img {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.post-img span {
  position: absolute;
  top: -40rpx;
  right: 0;
  font-size: 16px;
  color: #fff;
}
.post-img p {
    margin: 20rpx;
    color: #fff;
    font-size: 12px;
    text-align: center;
}
.save-btn {
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  background: #409eff;
  color: #fff;
}
</style>