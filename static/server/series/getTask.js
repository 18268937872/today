// 获取今日任务列表
import getCradTask from '../model/getCradTask'
import newTime from '../utils/index'
const getTask = async (info) => {
  let nowDate = newTime()
  info.nowDate = nowDate
  let result = await getCradTask(info)
  if (result.data.length > 0) {
    return {
      msg: '数据获取成功',
      code: 0,
      data: result.data
    }
  } else {
    return {
      msg: '暂无数据',
      code: 1
    }
  }
}

export default getTask
