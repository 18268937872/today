// 打卡
import setState from '../model/setCradState'
import getAll from '../model/getAllTask'
import getUserTask from '../model/getUserTask'

const setCradState = async (info, taskData, userOpid) => {
  // 打卡
  await setState(info)
  // 获取今天所有任务列表
  let data = await getAll(taskData)
  let dataList = []
  for (let i in data.data) {
    dataList.push(...data.data[i].taskList)
  }
  let state = dataList.filter(v => v.completeType === true)
  if (state.length === dataList.length) {
    let info = {
      userOpid,
      newDate: '2020-4-24',
      newTime: 123456789
    }
    let userData = await getUserTask(info)
    if (userData) {
      return {
        msg: '今日任务已全部完成',
        code: 0
      }
    }
  } else {
    return {
      msg: '打卡成功',
      code: 1
    }
  }
}

export default setCradState
