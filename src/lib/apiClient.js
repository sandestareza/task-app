import axios from "axios"
import { getToken } from '../helpers/tokens';
    
const apiClient = axios.create({
    baseURL: "https://todo-api-18-140-52-65.rakamin.com",
})

apiClient.interceptors.request.use(function (config) {
    const token = getToken()
    config.headers.Authorization =  token ? `Bearer ${token}` : ''
    return config;
})

export default apiClient