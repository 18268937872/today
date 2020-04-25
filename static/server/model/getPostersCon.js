// 生成海报数据
const db = wx.cloud.database()
const getPostersCon = async (info) => {
  let { newDate, userOpid } = info
  let allNum = await db.collection('userTask').get({ newDate })
  let userNum = await db.collection('userTask').get({ userOpid })
  return {
    taskNum: allNum.data.length,
    userTaskNum: userNum.data.length
  }
}

export default getPostersCon
