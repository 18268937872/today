<template>
<div>
    <canvas canvas-id="myCanvas" class="post-canvas"></canvas>
    <div class="post-img">
        <img :src="imgUrl">
        <div @click="saveImg" class="save-btn">保存图片</div>
    </div>
</div>
  
</template>

<script>
export default {
    name:'posters',
    data(){
        return {
            imgUrl:'',
        }
    },
    onLoad(){
        this.drawPoster()
    },
    methods:{
        drawPoster(){
            let ctx = wx.createCanvasContext('myCanvas')
            let imgPath = '../../static/images/posters.jpg';
            ctx.drawImage(
                imgPath,0,0,375*2,667*2
            )
            // 绘制每日一句
            ctx.textAlign = 'start'
            ctx.fillStyle = '#fff'
            ctx.font = '36px arail';
            this.newline('环境永远不会十全十美，消极的人受环境控制',550,ctx)
            
            // 绘制用户信息
            ctx.fillStyle = '#fff'
            // 绘制矩形容器
            ctx.fillRect(32.5*2,380*2,300*2,150*2)
            ctx.save();
            // 绘制头像
            ctx.lineWidth=.1;
            ctx.beginPath()
            ctx.arc(70*2,420*2,20*2,-20*2,Math.PI*3/2);
            ctx.stroke()
            // 放置头像
            ctx.save();
            let userImg = '../../static/images/5.jpg';
            ctx.clip();
            ctx.drawImage(userImg,50*2,400*2,40*2,40*2)
            // 绘制用户名
            ctx.restore();
            ctx.font = '36px arail';
            ctx.fillStyle = '#000'
            ctx.fillText('叶小秋',100*2,420*2)
            ctx.fillStyle = '#333'
            ctx.font = '24px arail'
            ctx.fillText('在(今天你打卡了吗)完成打卡',100*2,440*2)
            // 绘制累计打卡
            ctx.fillStyle = '#333'
            ctx.font = '24px arail'
            ctx.fillText('累计打卡',80*2,470*2)
            ctx.font = '40px arail'
            ctx.fillStyle = '#000'
            ctx.fillText('1天',85*2,500*2)
            // 绘制行动力
            ctx.fillStyle = '#333'
            ctx.font = '28px arail'
            ctx.fillText('行动力',210*2,470*2)
            ctx.font = '40px arail'
            ctx.fillStyle = '#000'
            ctx.fillText('64%',210*2,500*2)
            ctx.fillStyle = '#333'
            ctx.font = '28px arail'
            ctx.fillText('的成员',255*2,500*2)

            // 绘制二维码
            ctx.fillStyle = '#fff'
            ctx.fillRect(32.5*2,550*2,300*2,80*2);
            let nameImg = '../../static/images/user.jpg'
            ctx.drawImage(nameImg,50*2,565*2,50*2,50*2)
            ctx.fillStyle = '#000'
            ctx.font = '32px arail'
            ctx.fillText('今天你打卡了吗',105*2,590*2)
            ctx.draw()
                        // 保存图片
                        // const strDataURL = Canvas.toDataURL('image/png')
                        setTimeout(()=>{
                            wx.canvasToTempFilePath({
                                x: 0,
                                y: 0,
                                // width: 750,
                                // height: 1334,
                                // destWidth: 750,
                                // destHeight: 1334,
                                // fileType:'jpg',
                                canvasId: 'myCanvas',
                                success:(res)=>{
                                    this.imgUrl = res.tempFilePath
                                    console.log(this.imgUrl)
                                    // console.log(res.tempFilePath)
                                    // wx.saveImageToPhotosAlbum({
                                    //     filePath:res.tempFilePath,
                                    //     success(){
                                    //         console.log('图片保存成功')
                                    //     }
                                    // })
                                }
                            })
                        },2000)
        },
        // 文字自动换行
        newline(cont,w,ctx){
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
                ctx.fillText(temp[j],80,160+j*50)
            }
        },
        saveImg(){ // 长按保存
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

        },
        
    }
}
</script>

<style scoped>
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
}
.post-img img {
    width: 100%;
    height: 100%;
}
.save-btn {
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    background: #409EFF;
    color: #fff;
}
</style>