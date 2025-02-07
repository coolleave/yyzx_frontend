<script setup lang="ts" name="Login">
import { adminLoginApi } from '@/api/admin/employeeApi';
import { ref } from 'vue';
import router from "@/router/index"
import { ElMessage } from 'element-plus';
// 初始化登录表单数据
const loginForm = ref({
    username: '',
    password: ''
});


// 表单规则校验
// 用于存储验证错误信息
const errors = ref<{ username?: string; password?: string }>({});

// 校验用户名
const validateUsername = () => {
  if (!loginForm.value.username) {
    errors.value.username = '账号不能为空';
  } else {
    errors.value.username = '';
  }
};

// 校验密码
const validatePassword = () => {
  if (!loginForm.value.password) {
    errors.value.password = '密码不能为空';
  } else if (loginForm.value.password.length < 5 || loginForm.value.password.length >= 13) {
    errors.value.password = '密码要在6-14位之间';
  } else {
    errors.value.password = '';
  }
};

// 登录操作
const login = async () => {
  // 手动触发校验
  validateUsername();
  validatePassword();

  // 检查是否有错误
  if (errors.value.username || errors.value.password) {
    return; // 如果有错误则不提交
    }
    // 调用登录接口
    const res =  await adminLoginApi(loginForm.value);
    // console.log(res.status);
    
    // 判断登录是否成功
    if (res.code === 1) {
        // 登录成功

        // 存储token
        localStorage.setItem('token', res.data.token);
        // 打印token
        // console.log(localStorage.getItem('token'));
        // 跳转到首页
        router.push({ path: '/admin' });
    } else {
        // 登录失败
        // 提示错误信息
        ElMessage.error(res.msg);
        
    }
};



</script>

<template>
    <!-- 创建容器 -->
    <div class="container">
        <div class="box">
            <div class="content">
                <h2>后台管理</h2>
                <div>
                    <input type="text" placeholder="请输入用户名" v-model="loginForm.username" @blur="validateUsername">
                </div>
                <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
                <div>
                    <input type="password" placeholder="请输入密码" v-model="loginForm.password"  @blur="validatePassword">
                </div>
                <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
                <div>
                    <input type="submit" value="登录" @click="login">
                </div>
            </div>
            <a href="#" class="btns">yyzx_onlien</a>
            <a href="#" class="btns register">宇优在线</a>
        </div>
    </div>


</template>

<style scoped>
/* 表单数据验证信息样式 */

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 0px;
}
/* 容器样式设置 */
.container
{
    background-image: url("@/assets/images/login-bg.jpg");
    /* 背景图片 */
    height: 100vh;
    /* 高度100vh */
    display: flex;
    /* 使用flex布局 */
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    background-size: cover;
    /* 背景图片大小为cover */
    /* 设置透明度为10% */
    background-color: rgba(255, 255, 255, 0.1);
}


/* 注册表单容器样式设置 */
.box
{
    position: relative;
    /* 相对定位 */
    display: flex;
    /* 使用flex布局 */
    justify-content: space-between;
    /* 水平空间均匀分布 */
    margin: 150px auto;
    /* 上下边距150px，水平居中 */
    width: 470px;
    /* 宽度为470px */

}

/* 内容区域样式设置 */
.box .content
{
    position: relative;
    /* 相对定位 */
    display: flex;
    /* 使用flex布局 */
    flex-direction: column;
    /* 垂直排列 */
    justify-content: space-around;
    /* 垂直空间均匀分布 */
    align-items: center;
    /* 水平居中 */
    width: 350px;
    /* 宽度为350px */
    height: 350px;
    /* 高度为350px */
    padding: 60px 20px;
    /* 内边距 */
    box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05),
        /* 设置阴影效果 */
        25px 35px 20px rgba(0, 0, 0, 0.05), 25px 30px 30px rgba(0, 0, 0, 0.05),
        inset -20px -20px 25px rgba(255, 255, 255, 0.9);
}

/* 内容区域圆角和过渡效果设置 */
.box .content
{
    border-radius: 52% 48% 33% 67% / 38% 45% 55% 62%;
    /* 设置不规则圆角 */
    transition: 0.5s;
    /* 添加过渡效果 */
}

/* 高光1 */
.box .content::before
{
    content: "";
    /* 生成内容 */
    position: absolute;
    /* 绝对定位 */
    top: 50px;
    /* 位置 */
    left: 85px;
    /* 位置 */
    width: 35px;
    /* 宽度 */
    height: 35px;
    /* 高度 */
    border-radius: 50%;
    /* 圆角 */
    background: #fff;
    /* 背景颜色 */
    opacity: 0.9;
    /* 不透明度 */
}

/* 高光2 */
.box .content::after
{
    content: "";
    /* 生成内容 */
    position: absolute;
    /* 绝对定位 */
    top: 90px;
    /* 位置 */
    left: 110px;
    /* 位置 */
    width: 15px;
    /* 宽度 */
    height: 15px;
    /* 高度 */
    border-radius: 50%;
    /* 圆角 */
    background: #fff;
    /* 背景颜色 */
    opacity: 0.9;
    /* 不透明度 */
}

/* 内容区域内部元素样式设置 */
.box .content div
{
    position: relative;
    /* 相对定位 */
    width: 225px;
    /* 宽度 */
    border-radius: 25px;
    /* 圆角 */
    box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1),
        /* 设置阴影效果 */
        inset -2px -5px 10px rgba(255, 255, 255, 1),
        15px 15px 10px rgba(0, 0, 0, 0.05), 15px 10px 15px rgba(0, 0, 0, 0.025);
}

/* 内部元素高光效果设置 */
.box .content div::before
{
    content: "";
    /* 生成内容 */
    position: absolute;
    /* 绝对定位 */
    top: 8px;
    /* 位置 */
    left: 50%;
    /* 位置 */
    transform: translateX(-50%);
    /* 水平居中 */
    width: 65%;
    /* 宽度 */
    height: 5px;
    /* 高度 */
    background: rgba(255, 255, 255, 0.5);
    /* 背景颜色 */
    border-radius: 5px;
    /* 圆角 */
}

/* 输入框样式设置 */
.box .content input
{
    width: 100%;
    /* 宽度100% */
    border: none;
    /* 无边框 */
    outline: none;
    /* 无外边框 */
    background: transparent;
    /* 透明背景 */
    font-size: 16px;
    /* 字体大小 */
    padding: 10px 15px;
    /* 内边距 */
}

/* 提交按钮样式设置 */
.box .content input[type="submit"]
{
    color: #fff;
    /* 文字颜色 */
    cursor: pointer;
    /* 鼠标样式为手型 */
}

/* 最后一个内部元素样式设置 */
.box .content div:last-child
{
    width: 120px;
    /* 宽度 */
    background: #ff0f5b;
    /* 背景颜色 */
    box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1),
        /* 设置阴影效果 */
        15px 15px 10px rgba(0, 0, 0, 0.05), 15px 10px 15px rgba(0, 0, 0, 0.025);
    transition: 0.5s;
    /* 添加过渡效果 */
}

/* 最后一个内部元素悬停效果设置 */
.box .content div:last-child:hover
{
    width: 150px;
    /* 悬停时宽度变为150px */
}

/* 按钮样式设置 */
.btns
{
    position: absolute;
    /* 绝对定位 */
    right: 0;
    /* 右侧定位 */
    bottom: 0;
    /* 底部定位 */
    width: 120px;
    /* 宽度 */
    height: 120px;
    /* 高度 */
    background: #c61dff;
    /* 背景颜色 */
    display: flex;
    /* 使用flex布局 */
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    cursor: pointer;
    /* 鼠标样式为手型 */
    text-decoration: none;
    /* 文本装饰为无 */
    color: #fff;
    /* 文字颜色 */
    font-size: 14px;
    /* 字体大小 */
    box-shadow: inset 10px 10px 10px rgba(190, 1, 254, 0.05),
        /* 设置阴影效果 */
        15px 25px 10px rgba(190, 1, 254, 0.1), 15px 20px 20px rgba(190, 1, 254, 0.1),
        inset -10px -10px 15px rgba(255, 255, 255, 0.5);
    border-radius: 44% 56% 65% 35% / 57% 58% 42% 43%;
    /* 设置不规则圆角 */
}

/* 注册按钮样式设置 */
.register
{
    bottom: 150px;
    /* 底部定位 */
    right: 0px;
    /* 右侧定位 */
    width: 80px;
    /* 宽度 */
    height: 80px;
    /* 高度 */
    border-radius: 49% 51% 52% 48% / 63% 59% 41% 37%;
    /* 设置不规则圆角 */
    background: #01b4ff;
    /* 背景颜色 */
    box-shadow: inset 10px 10px 10px rgba(1, 180, 255, 0.05),
        /* 设置阴影效果 */
        15px 25px 10px rgba(1, 180, 255, 0.1), 15px 20px 20px rgba(1, 180, 255, 0.1),
        inset -10px -10px 15px rgba(255, 255, 255, 0.5);
}

/* 按钮高光效果设置 */
.btns::before
{
    content: "";
    /* 生成内容 */
    position: absolute;
    /* 绝对定位 */
    top: 15px;
    /* 位置 */
    left: 30px;
    /* 位置 */
    width: 20px;
    /* 宽度 */
    height: 20px;
    /* 高度 */
    border-radius: 50%;
    /* 圆角 */
    background: #fff;
    /* 背景颜色 */
    opacity: 0.45;
    /* 不透明度 */
}

.register::before
{
    left: 20px;
    /* 位置 */
    width: 15px;
    /* 宽度 */
    height: 15px;
    /* 高度 */
}

/* 按钮过渡效果设置 */
.btns
{
    transition: 0.25s;
    /* 添加过渡效果 */
}

/* 按钮悬停效果设置 */
.btns:hover
{
    border-radius: 50%;
    /* 悬停时改变圆角为50% */
}

/* 设置placeholder颜色为黑色 */
input::placeholder
{
    color: #000;
}
</style>
