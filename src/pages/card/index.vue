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
        <Posters ref="poster" v-if="lock"></Posters>
    </div>
</template>

<script>
import Posters from '@/components/posters'
import {getCradContent,setCradState,getPoster} from '../../../static/server/controller'

export default {
    name:'card',
    data(){
        return {
            cradList:{},
            info:{},
            lock:false,
            posterData:{},
            userInfo:{}
        }
    },
    components: {
        Posters
    },
    onLoad(options){
        this.cradList = {}
        let {id,cardId,taskType} = options
        this.info = {id,cardId}
        getCradContent(this.info).then(res=>{
            this.cradList = res
        })
    },
    onShow(){
        let nameData = JSON.parse(wx.getStorageSync('userInfo'))
        this.userInfo = {
            nickName:nameData.nickName,
            avatarUrl:nameData.avatarUrl
        }
    },
    methods:{
        cradBtn(){
            let userOpid = JSON.parse(wx.getStorageSync('userInfo')).openid
            let tsakData = {
                userOpid,
                newDate:'2020-4-24'
            }
            getPoster(userOpid).then(res=>{
                this.posterData = res
            })
            setCradState(this.info,tsakData,userOpid).then(res=>{
                let that = this
                // 打卡成功
                if(res.code === 0){
                    wx.showModal({
                        title:'提示',
                        content:'今日打卡已全部完成，是否去生成海报',
                        success(res){
                            if(res.confirm){
                                console.log('确定')
                                that.lock = true
                                that.$nextTick(()=>{
                                    that.$refs.poster.drawPoster(that.posterData,that.userInfo)
                                })
                               
                            }else if(res.cancel){
                                console.log('取消')
                            }
                        }
                    })
                }else{
                    getCradContent(this.info).then(res=>{
                        this.cradList = res
                    })
                    wx.showToast({
                        title:'打卡成功',
                        icon:success
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.card {
    background: #f0f0f0;
    position: fixed;
    width: 100%;
    height: 100%;
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