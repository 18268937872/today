// 新建任务
import getCradTask from '../model/getCradTask'
import addCraTask from '../model/addCradTask'
import addContent from '../model/addContent'
const newtaskCon = async (data)=>{
    let {userOpid,title,content,taskType} = data
    let nowDate = '2020-4-24'
    let info = {userOpid,nowDate,taskType}
    let newData = {userOpid,nowDate,title,content}
    // 根据当前用户opid和时间查询今日任务是否创建
    let getCradT = await getCradTask(info)
    // 若是今日任务不存在就创建他
    if(getCradT.data == false){
        let addtaskC = await addCraTask(info)
        // 添加任务
        addcon(addtaskC,newData)
    }else{
        // 若是今日任务存在就往里添加任务
        addcon(getCradT.data[0]._id,newData)
    }
    return {
        msg:'新建任务成功',
        code:0
    }
}

// 添加任务
const addcon = async (id,info)=>{
    let state = await addContent(id,info)
}

export default newtaskCon