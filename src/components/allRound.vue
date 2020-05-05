<template>
  <ul class="all-round">
    <li v-for="item in weeksData" :key="item.newTime">
      <p>{{item.num}}</p>
      <div><span></span><span></span></div>
      <p>{{item.newTime}}</p>
    </li>
  </ul>
</template>

<script>
export default {
    name:'all-round',
    data(){
      return {
        weeksData:[]
      }
    },
    onLoad(){
      this.getClick()
    },
    methods:{
      getClick(){
        let openid = JSON.parse(wx.getStorageSync("userInfo")).openid;
        wx.cloud.callFunction({
          name:'getRound',
          data:{
            openid:openid
          },
          complete:(res)=>{
            this.weeksData = res.result.userWeeks
          }
        })
      },
      getTime(){
        return '2010'
      }
    },
};
</script>

<style scoped>
.all-round {
    display: flex;
}
.all-round li {
    width: 165rpx;
    text-align: center;
    font-size: 14px;
}
.all-round li div {
    margin: 10rpx 0;
    display: inline-block;
    width: 2px;
    position: relative;
    height: 210rpx;
}
.all-round li div span:nth-child(1){
    display: inline-block;
    width: 2px;
    height: 100%;
    background: rgb(222, 222, 228);
}
.all-round li div span:nth-child(2){
    position: absolute;
    left: 0;
    bottom: 0;
    width: 2px;
    height: 60rpx;
    background: #298DF8;
}
</style>