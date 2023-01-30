// Done Reviewing: 30/01/2023
import axios from "axios"
import store from "../store"

const baseURL = "https://kwctf.com/vue/laravel-vue-survey/public/api"
const axiosClient = axios.create({baseURL})

axiosClient.interceptors.request.use((config) => {
  // eslint-disable-next-line
  config.headers.Authorization = `Bearer ${store.state.user.token}`
  return config
})

export default axiosClient
