import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { errCode } from '../../config/error_code'
import { message } from 'antd'

// 导出Request，可以用来自定义传递配置来创建实例
export class Request {
  // axios 实例
  instance: AxiosInstance
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = { baseURL: '/api', timeout: 60000 }

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例，配置为基础配置和我们传递进来的配置
    this.instance = axios.create(Object.assign(this.baseConfig, config))
    this.instance.interceptors.request.use(
        (config: AxiosRequestConfig) => {
          // 一般会请求拦截里面加token，用于后端的验证
          const token = localStorage.getItem('token') as string
          if(token) {
              config.headers['token'] = token
          }
          return config
        },
        (err: any) => {
          // 请求错误，这里可以用全局提示框进行提示
          return Promise.reject(err)
        },
    )
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // 直接返回res，当然你也可以只返回res.data
        // 系统如果有自定义code也可以在这里处理
        return res
      },
      (err: any) => {
        if (errCode[err.response.status]) {
          message.error(errCode[err.response.status])
        } else {
          message.error('服务器异常')
        }
      })
  }
  // 定义请求方法
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config)
  }
  public get<T>(
    url: string,
    params?: any,
  ): Promise<T> {
    return this.instance.get(url, { params }).then(res => {
      if (res.data.code !== '0') {
        message.error(res.data.errMsg)
        return Promise.reject(res.data.errMsg)
      } else {
        return res?.data?.data
      }
    })
    .catch(err => message.error('网络异常'))
  }
  
  public post<T, E>(
    url: string,
    data?: E,
  ): Promise<T> {
    return this.instance.post(url, data).then(res => {
      if (res.data.code !== '0') {
        message.error(res.data.errMsg)
      } else {
        return res?.data?.data
      }
    })
    .catch(err => message.error('网络异常'))
  }
}

// 默认导出Request实例
export default new Request({})