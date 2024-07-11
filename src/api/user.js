import request from '@/utils/request'

export const UserRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

export const UserLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

export const UserInfoService = () => request.get('my/userinfo')
// 更新用户基本信息
export const userUpdateInfoService = ({ id, nickname, email }) =>
  request.put('/my/userinfo', { id, nickname, email })

// 更新用户头像
export const userUpdateAvatarService = (avatar) => request.patch('/my/update/avatar', { avatar })

// 更新用户密码
export const userUpdatePasswordService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
