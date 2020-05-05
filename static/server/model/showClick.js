const db = wx.cloud.database()
const showClick = (info) => {
  let {userOpid,newDate} = info
  return db.collection('userTask').where({
    _openid: userOpid,
    newDate: newDate
  }).get()
}
export default showClick
