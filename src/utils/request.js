// 疯转 wx.request请求
const request = (url,options) => {
    return new Promise((resolve,reject)=>{
        wx.request({
            url:url,
            methods:options.methods,
            data:options.methods === "GET" ? options.data:JSON.stringify(options.data),
            header:{
                'Content-Type': 'application/json; charset=UTF-8'
            },
            success(res){
                if(res.statusCode === 200){
                    resolve(res.data)
                }else{
                    reject(res.data)
                }
            },
            fail(error){
                reject(error.data)
            }
        })
    })
}

const get = (url,options = {}) =>{
    return request(url,{methods:'GET',data:options})
}
const post = (url,options = {}) =>{
    return request(url,{methods:'POST',data:options})
}

export {
    get,
    post
}