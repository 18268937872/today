// 今日任务创建
const db = wx.cloud.database()

const addCraTask = async (info)=>{
    info.taskList = []
    return await db.collection('cradTask').add({
        data:info
    })
        .then((res)=>{
            return res._id
        })
        .catch(()=>{
            return false
        })
}

export default addCraTask