import axios from 'axios'
import {fetchCache} from './cache'

const config = {
  credentials: 'same-origin',
  xsrfCookieName: 'x-csrf-jwt',
  xsrfHeaderName: 'x-csrf-jwt'
}

const getData = ({data}) => data
const setCSRFHeader = (res) => {
  axios.defaults.headers.post[config.xsrfHeaderName] = res.headers[config.xsrfHeaderName]
  return res
}
export const post = (url, data, options) => axios.post(url, data, {...config, ...options}).then(getData)
export const get = (url, options) => axios.get(url, {...config, ...options}).then(setCSRFHeader).then(getData)
export const cachedGet = fetchCache(get)
