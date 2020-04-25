// 今日所有任务查询
const db = wx.cloud.database()
const _ = db.command
const getAll = (info) => {
  return db.collection('cradTask').where(_.and({
    userOpid: info.userOpid,
    nowDate: info.nowDate
  })).get()
    .then(res => {
      return res
    })
}

export default getAll
