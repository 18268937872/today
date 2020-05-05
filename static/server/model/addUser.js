// 添加用户
const db = wx.cloud.database()
const addUser = (userInfo) => {
  return db.collection('userInfo').add({
    data: userInfo
  })
}

export default addUser
