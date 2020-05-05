// 查询用户是否在数据库中
const db = wx.cloud.database()
const getUser = (openid) => {
  return db.collection('userInfo').where({
    openid: openid
  }).get()
}

export default getUser
