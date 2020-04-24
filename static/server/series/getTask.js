// 获取今日任务列表
import getCradTask from '../model/getCradTask'
const getTask = async (info)=>{
    let nowDate = '2020-4-24'
    info.nowDate = nowDate
    let result = await getCradTask(info)
    if(result.data.length>0){
        return {
            msg:'数据获取成功',
            code:0,
            data:result.data
        }
    }else{
        return {
            msg:'暂无数据',
            code:1
        }
    }
}

export default getTask