// 新建任务
const db = wx.cloud.database()

const addTaskCon = (info) => {
  info.completeType = false
  return db.collection('taskCon').add({
    data: info
  })
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

export default addTaskCon
