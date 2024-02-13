import request from '@/utils/request'

/**
 * 获取活动列表
 */
export const reqActiveList = (query) => request({
  url: `/actions?query=${JSON.stringify(query)}`
})

/**
 * 添加/修改活动
 */
export const addUpdateActive = ({ title, icon, _id }) => request({
  url: `/actions${_id ? `/${_id}` : ''}`,
  method: `${_id ? 'PUT' : 'POST'}`,
  data: {
    title,
    icon
  }
})

/**
 * 删除活动
 */
export const delActive = ({ _id }) => request({
  url: `/actions/${_id}`,
  method: 'DELETE'
})