import curry from 'lodash/curry'

const CLIENT_CACHE_TIME = 15
const SERVER_CACHE_TIME = 8 * 60

let apiCache = {}

export const cacheData = curry((cacheToUse, minutes, key, data, responseType) => {
  const expires = Date.now() + (minutes * 60 * 1000)
  cacheToUse[key] = {
    expires,
    data,
    responseType
  }
  return data
})

export const fetchData = (cacheToUse, key) => {
  if (!cacheToUse[key]) return undefined
  const {expires, responseType, data} = cacheToUse[key]
  if (Date.now() >= expires) {
    delete cacheToUse[key]
    return undefined
  }
  if (responseType === 'promise') return Promise.resolve(data)
  return data
}

const defaultStringify = (...args) => JSON.stringify(args)

const expiringCache = curry((minutes, fn, keyGen = defaultStringify) => (...args) => {
  const key = keyGen(...args)
  const cache = cacheData(apiCache, minutes, key)

  const existing = fetchData(apiCache, key)
  if (existing) return existing

  const result = fn(...args)

  if (result instanceof Promise) {
    return result.then((data) => cache(data, 'promise')).catch(() => { delete cache[key] })
  }
  if (result instanceof Error) return result

  return cache(result, typeof result)
})

const cacheDuration = typeof document === 'undefined' ? SERVER_CACHE_TIME : CLIENT_CACHE_TIME
export const fetchCache = expiringCache(cacheDuration)

export const getCache = () => {
  const cache = apiCache
  apiCache = {}
  return cache
}
export const setCache = (newCache) => {
  if (newCache) apiCache = newCache
}