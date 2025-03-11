import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginApi, logoutApi } from '@/api/index/userApi'

export const UserStore = defineStore('user',
    () => {
        // 用户信息
        const userInfo = ref<any>(null);

        // 用户登录
        const login = async ({ username, password }: { username: string, password: string }) => {
            try {
                // 调用接口获取用户信息
                const res = await loginApi({ username, password });
                // 将用户信息保存到 userInfo 中
                userInfo.value = res.data;
                // 将token储存在localStorage中
                localStorage.setItem('authentication', res.data.authentication);
            } catch (error) {
                console.error('用户登录失败:', error);
            }
        };

        // 用户退出登录
        const logout = () => {
            // 调用退出登录接口
            logoutApi();
            // 清除localStorage中的token
            localStorage.removeItem('authentication');
        };
        return { userInfo, login, logout };
    },
);