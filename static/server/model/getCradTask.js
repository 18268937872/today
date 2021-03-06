// 今日任务查询
const db = wx.cloud.database()
const _ = db.command
const getCradTask = (info) => {
  return db.collection('cradTask').where(_.and({
    userOpid: info.userOpid,
    nowDate: info.nowDate,
    taskType: info.taskType
  })).get()
    .then(res => {
      return res
    })
}

export default getCradTask
