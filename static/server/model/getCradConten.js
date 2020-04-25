// 获取任务详情
const db = wx.cloud.database()
const getCrad = (info) => {
  let { id, cardId } = info
  return db.collection('cradTask').where({
    _id: id
  }).get()
    .then(res => {
      let data = res.data[0].taskList
      return data.filter(i => i.id === cardId)
    })
}

export default getCrad
