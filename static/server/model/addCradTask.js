// 今日任务创建
const db = wx.cloud.database()

const addCraTask = (info) => {
  info.taskList = []
  return db.collection('cradTask').add({
    data: info
  })
    .then((res) => {
      return res._id
    })
    .catch(() => {
      return false
    })
}

export default addCraTask
