import { post } from "@/utils/Http";
// 用户登录
export function loginApi({ username, password }: { username: string, password: string }) {
    return post(
        "/user/user/login",
        { username, password }
    );
}
// 用户退出登录
export function logoutApi() {
    return post(
        "/user/user/logout"
    );
}
interface registerForm {
    username: string,
    password: string,
    name: string,
    phone: string,
    sex: string,
}
// 用户注册
export function registerApi(registerForm: registerForm) {
    return post(
        "/user/user/register",
        registerForm
    );
}