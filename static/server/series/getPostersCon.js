// 生成海报数据
import getPostersCon from '../model/getPostersCon'
import getAllUser from '../model/getAllUser'

const getPoster = async (userOpid) => { // 用户opid
  // 获取今日打卡人数 和 用户坚持天数
  let info = {
    userOpid,
    newDate: '2020-4-24',
    newTime: 123456789
  }
  let userData = await getPostersCon(info)
  // 获取所有用户
  let userAll = await getAllUser()
  // 行动力
  let action = 100 - (userData.taskNum / userAll * 100)
  action = action < 10 ? 90 : action
  return { // 执行力 坚持天数
    action,
    adhere: userData.userTaskNum
  }
}

export default getPoster
