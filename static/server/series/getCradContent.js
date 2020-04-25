// 获取任务详情
import getCrad from '../model/getCradConten'
const getCradContent = async (info) => {
  let result = await getCrad(info)
  return result[0]
}

export default getCradContent
