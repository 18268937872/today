// 添加任务
const db = wx.cloud.database()
const _ = db.command
const addContent = (id, info) => {
  info.completeType = false
  info.id = String(new Date().getTime())
  return db.collection('cradTask').doc(id).update({
    data: {
      taskList: _.push(info)
    }
  })
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

export default addContent
