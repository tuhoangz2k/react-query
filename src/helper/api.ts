import axios from 'axios'
const defaultURL = "https://demo7405228.mockable.io/";

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'Access-Control-Allow-Origin': 'my-authorized-proxy-or-domain',
  'Access-Control-Allow-Headers':
    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
}

const create = (baseUrl = null) => {
  const api = axios.create({
    baseURL: baseUrl === null ? defaultURL : baseUrl,
    timeout: 60000,
  })

  const sendGet = (path: string, options = { headers: headers }) =>
    api.get(path, options).then((response) => {
      const { code } = response.data || {}
      if (code === 503) {
        throw response
      } else {
        return response
      }
    })

  const sendPost = (
    path: string,
    params: any,
    options: any = { headers: headers },
  ) =>
    api.post(path, params, options).then((res) => {
      const { code } = res.data || {}
      if (code === 503) {
        throw res
      } else {
        return res
      }
    })

  const sendPut = (path: string, params: any, options = {}) =>
    api.put(path, params, options).then((res) => {
      const { code } = res.data || {}
      if (code === 503) {
        throw res
      } else {
        return res
      }
    })

  const generateGet = (path: string, params: any = null) => {
    const options = {
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        params,
      },
    }
    return sendGet(path, options)
  }

  const generatePost = (path: string, params: any) => {
    const options = {
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return sendPost(path, params, options)
  }

  const generatePut = (path: string, params: any) => {
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return sendPut(path, params, options)
  }

  const login = (params: any) => generatePost('/login', params);
  const getUserInfo = (id: number) => generateGet(`/userInfo?id=${id}`);
  const getListExample = (page: number, perPage: number) => generateGet(
    `/listExample?page=${page}&perpage=${perPage}`);
  
  return {
    login,
    getUserInfo,
    getListExample,
  }
}

export default {
  create,
}
