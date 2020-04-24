// 今日任务查询
const db = wx.cloud.database()
const _ = db.command
const getCradTask = async (info)=>{
    return await db.collection('cradTask').where(_.and({
        userOpid: info.userOpid,
        nowDate: info.nowDate,
        taskType:info.taskType
    })).get()
        .then(res=>{
            return res
        })
}

export default getCradTask