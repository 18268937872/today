// 添加今日打卡 并返回今日打卡人数
const db = wx.cloud.database()
const getUserTask = async (info) => {
  let { newDate, userOpid, newTime } = info
  await db.collection('userTask').add({ data: { newDate, newTime } })
  let allNum = await db.collection('userTask').get({ newDate })
  let userNum = await db.collection('userTask').get({ _openid: userOpid })
  return {
    taskNum: allNum.data.length,
    userTaskNum: userNum.data.length
  }
}

export default getUserTask
