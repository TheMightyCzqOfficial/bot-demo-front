import request from '@/utils/request'


/**
 * 登录接口
 */
export const login = ({ username, password,authCode }) => request({
  url: '/login',
  method: 'POST',
  data: {
    username,
    password,
    authCode
  }
})
export const getUserConfig = () => request({
  url: '/getUserConfig',
  method: 'POST',
})

export const addUserConfig = ({username , password , type}) => request({
  url: '/addUserConfig',
  method: 'POST',
  data:{
    username,
    password,
    type
  }
})

export const setUserConfig = ({username , password , pk , type}) => request({
  url: '/setUserConfig',
  method: 'POST',
  data:{
    username,
    password,
    pk,
    type
  }
})
export const delUserConfig = ({username , password , pk , type}) => request({
  url: '/delUserConfig',
  method: 'POST',
  data:{
    username,
    password,
    pk,
    type
  }
})
export const getMethodList = () => request({
  url: '/getMethodList',
  method: 'POST',
})
export const getMethodData = ({methodId}) => request({
  url: '/getMethodData',
  method: 'POST',
  data:{
    methodId
  }
})
export const delMethod = ({methodId}) => request({
  url: '/delMethod',
  method: 'POST',
  data:{
    methodId
  }
})
export const addMethod = ({methodName ,url, methodType , createDate , userType, stepCount,editable,stepData}) => request({
  url: '/addMethod',
  method: 'POST',
  data:{
    methodName,
    methodType,
    createDate,
    userType,
    stepCount,
    editable,
    stepData,
    url
  }
})
export const setMethod = ({methodId,methodName ,url, methodType , createDate , userType, stepCount,editable,stepData}) => request({
  url: '/setMethod',
  method: 'POST',
  data:{
    methodId,
    methodName,
    methodType,
    createDate,
    userType,
    stepCount,
    editable,
    stepData,
    url
  }
})
export const downloadMethodExcel = ({methodId}) => request({
  url: '/downloadMethodExcel',
  method: 'POST',
  data:{
    methodId
  }
})
export function upload(file){
  let form = new FormData()
  form.append('file',file)
  return request({
    url: '/upload',
    method: 'POST',
    data:form,
    headers:{'Content-Type': 'application/x-www-form-urlencoded'}
  })
} 
