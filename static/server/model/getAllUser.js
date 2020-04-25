// 获取用户总数
const db = wx.cloud.database()
const getAllUser = async () => {
  let allUser = await db.collection('userInfo').get()
  return allUser.data.length
}

export default getAllUser
