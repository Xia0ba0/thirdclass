import axios from 'axios'

export default function getQrcode () {
  return axios.post('check/crefresh', {})
    .then(res => {
      if (res.data.status === 4169 || res.data.status === 4168) {
        return {
          message: 'refresh',
          data: res.data.data
        }
      } else if (res.data.status === 200) {
        return {
          message: 'success',
          data: '签到成功'
        }
      } else if (res.data.status === 4167) {
        // eslint-disable-next-line no-throw-literal
        throw {
          message: '未报名该活动，无法签到',
          data: res.data.message
        }
      } else if (res.data.status === 4160) {
        // eslint-disable-next-line no-throw-literal
        throw {
          message: '签到数据错误，请重新刷新二维码',
          data: res.data.message
        }
      } else if (res.data.status === 4163) {
        // eslint-disable-next-line no-throw-literal
        throw {
          message: '活动已经签到，请勿重复签到',
          data: res.data.message
        }
      } else if (res.data.status === 4166) {
        // eslint-disable-next-line no-throw-literal
        throw {
          message: '签到数据过期，请重新生成二维码',
          data: res.data.message
        }
      } else if (res.data.status === 4164) {
        // eslint-disable-next-line no-throw-literal
        throw {
          message: '活动不存在',
          data: res.data.message
        }
      } else if (res.data.status === 4170) {
        // eslint-disable-next-line no-throw-literal
        throw {
          message: '签到系统内部错误，请重试',
          data: res.data.message
        }
      } else {
        // eslint-disable-next-line no-throw-literal
        throw {
          message: '签到失败',
          data: res.data.message
        }
      }
    })
}
