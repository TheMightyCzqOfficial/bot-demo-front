/**
 * 封装axios的模块
 */
import axios from 'axios';
import qs from 'qs'
import { serverURL } from '@/utils/serverConfig'

const instance = axios.create({
  baseURL: serverURL,
  timeout: 30 * 1000,
})

/**
 * 添加请求拦截器, 处理请求参数问题以及token问题
 */
// instance.interceptors.request.use(
//   config => {
//     // console.log(typeof(config.data))
//     if(config.url=='/upload'){
//       // let form = new FormData()
//       // form.append('file',config.data)
//       // config.data=form
//       config.headers = {
//     // 必须要把 Content-Type 改为 multipart/form-data
//     'Content-Type': 'application/x-www-form-urlencoded'
// }
//     }
//     return config
//   },
//   error => Promise.error(error)
// )
// instance.interceptors.request.use((config) => {
//   // 处理请求参数
//   // debugger
//   console.log(config)
//   if (config.data && (config.data instanceof FormData) === false) {
//     config.data = JSON.parse(JSON.stringify(config.data))
//     for (let item in config.data) {
//       if (config.data[item] === "") {
//         delete config.data[item]
//       }
//     }
//   }
// })
/**
 * 添加响应拦截器
 *  成功回调: 成功的结果不再是response, 而是response.data
 *  失败回调: 统一处理请求异常
 */
instance.interceptors.response.use(
  response => {
    // debugger
    return response.data
  },
  error => {
    console.log("error==> ",error)
    return Promise.reject("error");
  }
)

export default instance;