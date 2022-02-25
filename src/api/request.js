import axios from "axios";
import store from "@/store";


const reqs = axios.create({
    baseURL: "/api",
    timeout: 5000,

})
//请求拦截器
reqs.interceptors.request.use((config) => {
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    return config
})

//响应拦截器
reqs.interceptors.response.use((res) => {
    return res.data
}, (error) => {
    console.log(error);
    return Promise.reject(new Error('fail'))
})


export default reqs