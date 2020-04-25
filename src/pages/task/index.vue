<template>
    <div class="task">
        <div class="main">
            <header class="header">今日任务({{TaskState.b | 0}}/{{TaskState.a | 0}})</header>
            <div class="cont" v-if="ShowTask">
                <ul>
                    <li v-for="(item,index) in TaskList.taskList" :key="index"><span>{{item.title}}</span><span @click="btnTask(item.id)">{{item.completeType | value?'已完成':'未完成'}}</span></li>
                </ul>
            </div>
            <div class="NoTask" v-if="!ShowTask">
                暂无打卡任务！
            </div>
        </div>
        <div class="newTask" @click="newtask">+</div>
    </div>
</template>

<script>
import {getTask} from '../../../static/server/controller/index'
export default {
    name:'task',
    data(){
        return {
            TaskList:[],
            ShowTask:false,
            loading:true,
            TaskState:{},
            taskType:''
        }
    },
    onLoad(options){
        let {taskType} = options
        this.taskType = taskType
        this.TaskList = []
        this.TaskState = {}
    },
    onShow(){
        this.getCard()
    },
    methods:{
        //新建任务
        newtask(){
            wx.navigateTo({url:`/pages/newCard/main?taskType=${this.taskType}`})
        },
        getCard(){ // 获取今日任务列表
            let id = JSON.parse(wx.getStorageSync('userInfo')).openid
            let info = {
                nowDate:'2020-4-24',
                userOpid:id,
                taskType:this.taskType
            }
           getTask(info).then(res=>{
                if(res.code === 0){
                    this.TaskList = res.data[0]
                    this.ShowTask = true
                    this.getState()
                    this.loading = true
                }else{
                     this.loading = false
                }
            })
        },
        getState(){ // 任务完成度
            let list = this.TaskList.taskList
            let a = list.length
            let b = 0
            for(let i in list){
                if(list[i].completeType){
                    b++
                }
            }
            this.TaskState = {a,b}
        },
        // 跳转到任务详情
        btnTask(cardId){
            let id = this.TaskList._id
            wx.navigateTo({url:`/pages/card/main?cardId=${cardId}&id=${id}&taskType=${this.taskType}`})
        }
    }
}
</script>

<style scoped>
.task {
    padding-top: 20rpx;
    min-height: 100vh;
    background: #f0f0f0;
}
.main {
    width: 700rpx;
    margin: 0 auto;
}
.header {
    margin: 20rpx 0 40rpx 0;
    display: flex;
}
.header .newTask {
    align-items: flex-end;
}
.cont li {
    margin-top: 20rpx;
    padding: 30rpx 0;
    border: 1px solid #fff;
    border-radius: 5px;
    background: #fff;
}
.cont li span:nth-child(1){
    display: inline-block;
    margin-left: 20rpx;
    width: 400rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.cont li span:nth-child(2){
    float: right;
    margin-right: 20rpx;
}
.newTask {
    position: fixed;
    bottom: 50rpx;
    right: 70rpx;
    width: 100rpx;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    border-radius: 50rpx;
    background: #409EFF;
    color: #fff;
    font-size: 60rpx;
}
.NoTask {
    margin-top: 60rpx;
    text-align: center;
}
</style>