let BASE_URL = ''
// const BASE_URL = 'http://1.117.171.66:9100'
// 判断是开发环境还是生产环境

if (import.meta.env.MODE === 'development') {
    // 开发环境
    // BASE_URL = 'http://182.92.111.155:8080'
    BASE_URL = 'http://localhost/api/'
} else {
    // 生产环境
    BASE_URL = 'http://'
}
const USER_ID = 'user_id'
const USER_NAME = 'user_name'
const USER_TOKEN = 'authentication'

const ADMIN_USER_ID = 'admin_user_id'
const ADMIN_USER_NAME = 'admin_user_name'
const ADMIN_USER_TOKEN = 'token'


export { BASE_URL, USER_TOKEN, USER_NAME, USER_ID, ADMIN_USER_ID, ADMIN_USER_NAME, ADMIN_USER_TOKEN }
