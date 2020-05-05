<template>
  <div class="feedback">
    <div class="main">
        <header>意见反馈</header>
        <div class="content">
            <textarea placeholder="说些什么吧……" v-model="content"></textarea>
        </div>
        <div class="crad-div-btn" @click="subBtn">提交</div>
    </div>
  </div>
</template>

<script>
export default {
    name:'feedback',
    data(){
       return {
            content:'',
            showBtn:true
       }
    },
    methods:{
        subBtn(){
            if(!this.showBtn && this.content == '')return
            this.showBtn = false
            let openid = JSON.parse(wx.getStorageSync("userInfo")).openid;
            wx.cloud.callFunction({
                name:'feedback',
                data:{
                    content:this.content,
                    openid:openid
                },
                success:(res)=>{
                    console.log(res)
                    wx.showToast({
                        title:'意见提交成功'
                    })
                    this.content = ''
                    this.showBtn = true
                },
                fail:console.error
            })
        }
    }
}
</script>

<style scoped>
.feedback {
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
    margin-top: 40rpx;
    font-size: 18px;
}
.content {
    margin-top: 40rpx;
    box-sizing: border-box;
    height: 400rpx;
    padding: 20rpx;
    border: 1px solid rgb(222, 222, 228);
}
.crad-div-btn {
    float: right;
    margin-top: 40rpx;
    margin-right: 40rpx;
    box-sizing: border-box;
    padding: 20rpx;
    background: #409EFF;
    color: #fff;
    border-radius: 5px;
}

</style>