<template>
  <div class="new-crad">
    <div class="crad-div-main">
        <input type="text" placeholder="请输入任务" v-model="info.title">
        <textarea placeholder="任务描述" v-model="info.content"></textarea>
    </div>
    <div class="crad-div-btn" @click="newCradBtn">完成</div>

  </div>
</template>

<script>
import {newtaskCon} from '../../../static/server/controller/index'
export default {
    name:"newCrad",
    data(){
        return {
            info:{
                title:'',
                content:'',
                userOpid:'',
                taskType:''
            }   
        }
    },
    onLoad(options){
        this.info.taskType = options.taskType
        this.info.userOpid = JSON.parse(wx.getStorageSync('userInfo')).openid
    },
    methods:{
        newCradBtn(){
            wx.showLoading({
                title:'任务创建中...'
            })
            newtaskCon(this.info).then(res=>{
               
                if(res.code === 0){
                    wx.hideLoading()
                    wx.navigateBack({delta: 1})
                    this.info = {}                
                }
            })
        }
    }
}
</script>

<style scoped>
.new-crad {
    background: #f0f0f0;
    position: fixed;
    width: 100%;
    height: 100%;
}
.crad-div-main {
    width: 700rpx;
    margin: 0 auto;
    padding-top: 30rpx;
}
.crad-div-main input {
    margin-bottom: 20rpx;
    padding: 5rpx 0;
    border-bottom: 1px solid #ccc;
}
.crad-div-btn {
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