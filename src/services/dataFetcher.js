import axiosInstance from '../services/axios'

const createDataFetcher = (dataFetcherInstance) => ({
  get(url, config = {}) {
    return dataFetcherInstance.get(url, config)
  },
  post(url, config = {}) {
    return dataFetcherInstance.post(url, config.data, config)
  },
  put(url, config = {}) {
    return dataFetcherInstance.put(url, config.data, config)
  },
  patch(url, config = {}) {
    return dataFetcherInstance.patch(url, config.data, config)
  },
  delete(url, config = {}) {
    return dataFetcherInstance.delete(url, config)
  },
})

const dataFetcher = createDataFetcher(axiosInstance)

export default dataFetcher
