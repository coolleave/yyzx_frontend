import axios from "axios";
import 'element-plus/es/components/message/style/css'
import {ElMessage} from 'element-plus'

// import { useUserStore } from "@/stores/user";
import router from "@/router";

baseURL: () => import("@/stores/constants.ts").then(res => res.BASE_URL)
console.log("baseURL", baseURL)
// 创建 axios 实例
const httpInstance = axios.create({
    baseURL: () => import("@/stores/constants.ts").then(res => res.BASE_URL),  // 设置基础URL
    timeout: 20000,  // 设置超时时间
});

// 添加请求拦截器
httpInstance.interceptors.request.use(config => {
    // 在发送请求之前做一些处理
    // const userStore = useUserStore();
    // if (userStore.userInfo.token) {
    //     const token = userStore.userInfo.token;
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
}, e => Promise.reject(e));

// 添加响应拦截器
httpInstance.interceptors.response.use(res => {   // 2xx 范围内的状态码都会触发该函数。
    return res.data;       // 对响应数据做点什么
}, e => {  // 超出 2xx 范围的状态码都会触发该函数。
    ElMessage({ type: 'warning', message: e.response.data.message });
    if (e.response.status === 401) {
        // 认证不通过
        // const userStore = useUserStore();
        // userStore.clearUserInfo();
        router.push('/adminLogin');
    }
    if (e.response.status === 404) {
        // 404错误
        router.push('/404');
    }
    return Promise.reject(e);   // 对响应错误做点什么
});

// 封装 GET 方法
const get = (url, params = {}) => {
    return httpInstance.get(url, { params });
};

// 封装 POST 方法
const post = (url, data = {}) => {
    return httpInstance.post(url, data);
};

// 封装 PUT 方法
const put = (url, data = {}) => {
    return httpInstance.put(url, data);
};

// 封装 DELETE 方法
const del = (url, params = {}) => {
    return httpInstance.delete(url, { params });
};

// 导出封装的请求方法
export { get, post, put, del };
