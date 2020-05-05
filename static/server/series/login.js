import getUser from '../model/getUser'
import addUser from '../model/addUser'
import promisify from '../../../src/utils/promisify'
import { get } from '../../../src/utils/request'
const login = promisify(wx.login)
const getUserInfo = promisify(wx.getUserInfo)

const Login = async () => {
  // 获取用户信息
  let getInfo = await getUserInfo()
  let userInfo = getInfo.userInfo
  // 登录获取code
  let getCode = await login()
  // 获取用户openid
  let getOpenid = await get(`https://api.weixin.qq.com/sns/jscode2session?appid=wx3ec2d7bd480e6c12&secret=37a6704a9383a1c85c112b67c13857fb&js_code=${getCode.code}&grant_type=authorization_code`)
  userInfo.openid = getOpenid.openid
  // 数据库查询用户是否存在
  let showLogin = await getUser(getOpenid.openid)
  if (showLogin.data.length === 0) {
    // 新用户添加
    await addUser(userInfo)
  }
  return userInfo
}

export default Login
