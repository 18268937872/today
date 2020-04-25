<template>
    <div class="card">
        <div class="main">
            <p class="main-p-state">{{cradList.completeType | value?'已完成':'未完成'}}</p>
            <div class="card-content">
                <h3>{{cradList.title}}</h3>
                <p>{{cradList.content}}</p>
                <span>{{taskType}}</span>
            </div>
            <div class="card-btn" @click="cradBtn">打卡</div>
        </div>
    </div>
</template>

<script>
import {getCradContent,setCradState,getPoster} from '../../../static/server/controller'
export default {
    name:'card',
    data(){
        return {
            cradList:{},
            info:{}
        }
    },
    onLoad(options){
        this.cradList = {}
        let {id,cardId,taskType} = options
        this.info = {id,cardId}
        getCradContent(this.info).then(res=>{
            this.cradList = res
        })
    },
    methods:{
        cradBtn(){
            let userOpid = JSON.parse(wx.getStorageSync('userInfo')).openid
            let tsakData = {
                userOpid,
                newDate:'2020-4-24'
            }
            getPoster(userOpid).then(res=>{
                console.log(res)
            })
            // setCradState(this.info,tsakData,userOpid).then(res=>{
            //     // 打卡成功
            //     if(res.code === 0){
            //         wx.showModal({
            //             title:'提示',
            //             content:'今日打卡已全部完成，是否去生成海报',
            //             success(res){
            //                 if(res.confirm){
            //                     console.log('确定')
            //                 }else if(res.cancel){
            //                     console.log('取消')
            //                 }
            //             }
            //         })
            //     }else{
            //         getCradContent(this.info).then(res=>{
            //             this.cradList = res
            //         })
            //         wx.showToast({
            //             title:'打卡成功',
            //             icon:success
            //         })
            //     }
            // })
        }
    }
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