import axios from "axios";
import 'element-plus/es/components/message/style/css';
import { ElMessage } from 'element-plus';
import { BASE_URL } from "@/stores/constants.ts";
import router from "@/router/index";

// 只导入类型
import type { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";

// 创建 axios 实例
const httpInstance = axios.create({
    baseURL: BASE_URL, // 设置基础URL
    timeout: 20000,  // 设置超时时间
});

// 添加请求拦截器
httpInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {  // 使用 InternalAxiosRequestConfig 类型
        // 给请求添加token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['token'] = token;
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// 添加响应拦截器
httpInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;  // 对响应数据做点什么
    },
    (error: AxiosError) => {
        if (error.response) {
            // 通过类型断言告诉 TypeScript 你期望 error.response.data 的结构
            const errorData: any = error.response.data;


            if (error.response.status === 401) {
                ElMessage({ type: 'warning', message: "请登录" });
                router.push('/adminLogin');
            }

            if (error.response.status === 404) {
                router.push('/404');
            }
        }
        return Promise.reject(error);  // 对响应错误做点什么
    }
);

// 封装 GET 方法
const get = (url: string, params: Record<string, any> = {}): Promise<any> => {
    return httpInstance.get(url, { params });
};

// 封装 POST 方法
const post = (url: string, data: Record<string, any> = {}): Promise<any> => {
    return httpInstance.post(url, data);
};

// 封装 PUT 方法
const put = (url: string, data: Record<string, any> = {}): Promise<any> => {
    return httpInstance.put(url, data);
};

// 封装 DELETE 方法
const del = (url: string, params: Record<string, any> = {}): Promise<any> => {
    return httpInstance.delete(url, { params });
};

// 导出封装的请求方法
export { get, post, put, del };
