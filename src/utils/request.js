import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// ����axiosʵ��
const service = axios.create({
  baseURL: process.env.BASE_API, // api �� base_url
  timeout: 5000 // ����ʱʱ��
})

// request������
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() // ��ÿ������Я���Զ���token �����ʵ����������޸�
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response ������
service.interceptors.response.use(
  response => {
    /**
     * codeΪ��20000���״� �ɽ���Լ�ҵ������޸�
     */
    const res = response.data
    if (res.code !== 20000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:�Ƿ���token; 50012:�����ͻ��˵�¼��;  50014:Token ������;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '���ѱ��ǳ�������ȡ���������ڸ�ҳ�棬�������µ�¼',
          'ȷ���ǳ�',
          {
            confirmButtonText: '���µ�¼',
            cancelButtonText: 'ȡ��',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // Ϊ������ʵ����vue-router���� ����bug
          })
        })
      }
      // eslint-disable-next-line
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
