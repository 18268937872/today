// 生成海报数据
import getPostersCon from '../model/getPostersCon'
import getAllUser from '../model/getAllUser'
import batchDate from '../utils/index'
const getPoster = async (userOpid) => { // 用户opid
  // 获取今日打卡人数 和 用户坚持天数
  const newDate = batchDate()
  const newTime = new Date().getTime()
  let info = {
    userOpid,
    newDate,
    newTime
  }
  let userData = await getPostersCon(info)
  // 获取所有用户
  let userAll = await getAllUser()
  // 行动力
  let action = 100 - (userData.taskNum / userAll * 100)
  action = action < 10 ? 90 : action
  return { // 执行力 坚持天数
    action,
    adhere: userData.userTaskNum + 1
  }
}

export default getPoster
