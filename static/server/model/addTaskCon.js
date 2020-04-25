// 新建任务
const db = wx.cloud.database()

const addTaskCon = async (info)=>{
    info.completeType = false
    return await db.collection('taskCon').add({
        data:info
    })
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false
    })
}

export default addTaskCon