<template>
<div :class="showPoat?'poat-bag':null" v-if="showPoat">
    <canvas canvas-id="myCanvas" class="post-canvas"></canvas>
    <div class="post-img" v-if="showImg">
        <img :src="imgUrl" @touchstart="saveImg">
        <span @click="hideImg">x</span>
    </div>
</div>
  
</template>

<script>
import promisify from '../utils/promisify'
let getImageInfo = promisify(wx.getImageInfo) 
export default {
    name:'posters',
    data(){
        return {
            imgUrl:'',
            showImg:false,
            Showsave:true,
            showPoat:true
        }
    },
    methods:{
        hideImg(){
            this.showPoat = false
        },
        drawPoster(info,userData){
            let {action,adhere} = info
            let {nickName,avatarUrl} = userData
            let getWidth = wx.getSystemInfoSync()
            let deviceWidth = getWidth.screenWidth
            const rpx2px = rpx=>(deviceWidth / 750)<1?rpx:deviceWidth / 750*rpx*2
            wx.showLoading({
                title:'正在生成海报'
            })
            // const imgInfo = await getImageInfo(avatarUrl)
            // console.log(imgInfo)
            let url1 = '../../static/images/posters.jpg'
            let ctx = wx.createCanvasContext('myCanvas')
            let imgPath = '../../static/images/posters.jpg';
            const imgBag_w = rpx2px(375*2)
            const imgBag_h = rpx2px(667*2)
            ctx.drawImage(
                imgPath,0,0,imgBag_w,imgBag_h
            )
            console.log(6)
            // 绘制每日一句
            ctx.textAlign = 'start'
            ctx.fillStyle = '#fff'
            const daily_font =  rpx2px(36)
            ctx.font = `${daily_font}px arail`;
            const daily_w = rpx2px(550)
            this.newline('环境永远不会十全十美，消极的人受环境控制',daily_w,ctx,rpx2px)
            // 绘制用户信息
            ctx.fillStyle = '#fff'
            // 绘制矩形容器
            const fillRect_x = rpx2px(32.5*2)
            const fillRect_y = rpx2px(380*2)
            const fillRect_w = rpx2px(300*2)
            const fillRect_h = rpx2px(150*2)
            ctx.fillRect(fillRect_x,fillRect_y,fillRect_w,fillRect_h)
            ctx.save();
            // 绘制头像
            ctx.lineWidth=.1;
            ctx.beginPath()
            const arcA1 = rpx2px(70*2)
            const arcA2 = rpx2px(420*2)
            const arcA3 = rpx2px(20*2)
            const arcA4 = rpx2px(-20*2)
            ctx.arc(arcA1,arcA2,arcA3,arcA4,Math.PI*3/2);
            ctx.stroke()
            // 放置头像
            ctx.save();
            let userImg = avatarUrl;
            ctx.clip();
            const userImage1 = rpx2px(50*2)
            const userImage2 = rpx2px(400*2)
            const userImage3 = rpx2px(40*2)
            const userImage4 = rpx2px(40*2)
            ctx.drawImage(url1,userImage1,userImage2,userImage3,userImage4)
            // 绘制用户名
            ctx.restore();
            let nickName_font = rpx2px(36)
            ctx.font = `${nickName_font}px arail`;
            ctx.fillStyle = '#000'
            const nickName_con1 = rpx2px(100*2)
            const nickName_con2 = rpx2px(420*2)
            ctx.fillText(nickName,nickName_con1,nickName_con2)
            ctx.fillStyle = '#333'
            const nickName_font_con = rpx2px(24)
            ctx.font = `${nickName_font_con}px arail`
            const nickName_con_x = rpx2px(100*2)
            const nickName_con_y = rpx2px(440*2)
            ctx.fillText('在(今天你打卡了吗)完成打卡',nickName_con_x,nickName_con_y)
            // 绘制累计打卡
            ctx.fillStyle = '#333'
            const adhere_font = rpx2px(24)
            ctx.font = `${adhere_font}px arail`
            const adhere_con1 = rpx2px(80*2)
            const adhere_con2 = rpx2px(470*2)
            ctx.fillText('累计打卡',adhere_con1,adhere_con2)
            const adhere_font_con = rpx2px(40)
            ctx.font = `${adhere_font_con}px arail`
            ctx.fillStyle = '#000'
            const  adhere_x = rpx2px(85*2)
            const  adhere_y = rpx2px(500*2)
            ctx.fillText(`${adhere}天`,adhere_x,adhere_y)
            // 绘制行动力
            ctx.fillStyle = '#333'
            const action_font = rpx2px(28)
            ctx.font = `${action_font}px arail`
            const action_con1 = rpx2px(210*2)
            const action_con2 = rpx2px(470*2)
            ctx.fillText('行动力超过',action_con1,action_con2)
            const action_font_2 = rpx2px(40)
            ctx.font = `${action_font_2}px arail`
            ctx.fillStyle = '#000'
            const action_con_x = rpx2px(210*2)
            const action_con_y = rpx2px(500*2)
            ctx.fillText(`${action}%`,action_con_x,action_con_y)
            ctx.fillStyle = '#333'
            const action_font_3 = rpx2px(28)
            ctx.font = `${action_font_3}px arail`
            const action_con_tit1 = rpx2px(255*2)
            const action_con_tit2 = rpx2px(500*2)
            ctx.fillText('的成员',action_con_tit1,action_con_tit2)
            // 绘制二维码
            ctx.fillStyle = '#fff'
            const nameImg_con_1 = rpx2px(32.5*2)
            const nameImg_con_2 = rpx2px(550*2)
            const nameImg_con_3 = rpx2px(300*2)
            const nameImg_con_4 = rpx2px(80*2)
            ctx.fillRect(nameImg_con_1,nameImg_con_2,nameImg_con_3,nameImg_con_4);
            let nameImg = '../../static/images/user.jpg'
            const nameImg_img1 = rpx2px(50*2)
            const nameImg_img2 = rpx2px(565*2)
            const nameImg_img3 = rpx2px(50*2)
            const nameImg_img4 = rpx2px(50*2)
            ctx.drawImage(nameImg,nameImg_img1,nameImg_img2,nameImg_img3,nameImg_img4)
            ctx.fillStyle = '#000'
            const nameImg_font = rpx2px(32)
            ctx.font = `${nameImg_font}px arail`
            const nameImg_con_x = rpx2px(105*2)
            const nameImg_con_y = rpx2px(590*2)
            ctx.fillText('今天你打卡了吗',nameImg_con_x,nameImg_con_y)
            ctx.draw()
                        // 保存图片
                        // const strDataURL = Canvas.toDataURL('image/png')
                        setTimeout(()=>{
                            wx.canvasToTempFilePath({
                                x: 0,
                                y: 0,
                                canvasId: 'myCanvas',
                                success:(res)=>{
                                    this.imgUrl = res.tempFilePath
                                    wx.hideLoading
                                    wx.showToast({
                                        title:'海报生成成功',
                                        icon:'success'
                                    })
                                    this.showImg = true
                                }
                            })
                        },2000)
        },
        // 文字自动换行
        newline(cont,w,ctx,rpx2px){
            let str = cont.split('')
            let loop = ''
            let temp = []
            for(let i in str){
                if(ctx.measureText(loop).width > w){
                    temp.push(loop)
                    loop = ''
                }
                loop +=str[i]
            }
            temp.push(loop)
            // 绘制文字
            for(let j in temp){
                const con_x = rpx2px(80)
                const con_y = rpx2px(160+j*50)
                console.log(con_x)
                ctx.fillText(temp[j],con_x,con_y)
            }
        },
        saveImg(){ // 长按保存
            if(!this.Showsave){
                return wx.showToast({
                    title:'图片已经保存'
                })
            }
            let that = this
            wx.getSetting({
                success(res){
                    if(!res.authSetting['scope.writePhotosAlbum']){
                        wx.authorize({
                            scop:'scope.writePhotosAlbum',
                            success(){
                                wx.saveImageToPhotosAlbum({
                                    filePath: that.imgUrl,
                                    success(){
                                        wx.showToast({
                                            title:'保存成功'
                                        })
                                    },
                                    fail() {
                                        wx.showToast({
                                            title: '保存失败',
                                            icon: 'none'
                                        })
                                    }
                                })
                            },
                            fail(){
                                that.setData({// 如果用户拒绝过或没有授权，则再次打开授权窗口
                                    openSet:true
                                })
                            }
                        })
                    }else{
                        wx.saveImageToPhotosAlbum({
                            filePath: that.imgUrl,
                            success(){
                                wx.showToast({
                                    title:'保存成功'
                                })
                            },
                            fail() {
                                wx.showToast({
                                    title: '保存失败',
                                    icon: 'none'
                                })
                            }
                        })
                    }
                }

            })
            this.Showsave = false

        },
        
    }
}
</script>

<style scoped>
.poat-bag{
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
    transform: translate(-50%,-50%);
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
.post-img span{
    position: absolute;
    top: -50rpx;
    right: 0;
    border-radius: 50%;
    border: 1px solid #fff;
    font-size: 16px;
    width: 40rpx;
    height: 40rpx;
    text-align: center;
    line-height: 40rpx;
    color: #fff;
}
.save-btn {
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    background: #409EFF;
    color: #fff;
}
</style>