// 打卡
const db = wx.cloud.database()
const setState = (info) => {
  let { id, cardId } = info
  return db.collection('cradTask').where({
    _id: id,
    'taskList.id': cardId
  }).update({
    data: {
      'taskList.$.completeType': true
    }
  }).then(() => {
    return true
  }).catch(() => {
    return false
  })
}

export default setState
