<template>
    <div class="login-container">
      <!-- 左上角Logo和文字 -->
      <div class="logo-container">
        <img 
          src="/public/logo.png" 
          alt="Logo"
          class="logo"
        >
        <span class="logo-text">宇优在线</span>
      </div>
  
      <!-- 右上角注册按钮 -->
      <button class="register-btn" @click="handleRegister">注册</button>
  
      <!-- 登录表单 -->
      <div class="login-form">
        <h2 class="title">登录</h2>
  
        <form @submit.prevent="handleSubmit">
          <!-- 手机号输入 -->
          <div class="form-item">
            <input
              v-model="formData.phone"
              type="tel"
              placeholder="请输入手机号"
              maxlength="11"
              class="input-field"
              :class="{ 'error': errors.phone }"
            >
            <div v-if="errors.phone" class="error-msg">{{ errors.phone }}</div>
          </div>
  
          <!-- 密码输入 -->
          <div class="form-item">
            <input
              v-model="formData.password"
              type="password"
              placeholder="请输入密码"
              class="input-field"
              :class="{ 'error': errors.password }"
            >
            <div v-if="errors.password" class="error-msg">{{ errors.password }}</div>
          </div>
  
          <!-- 登录按钮 -->
          <button 
            type="submit"
            class="submit-btn"
            :disabled="loading"
          >
            {{ loading ? '登录中...' : '立即登录' }}
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          phone: '',
          password: ''
        },
        errors: {
          phone: '',
          password: ''
        },
        loading: false
      }
    },
    methods: {
      validateForm() {
        let isValid = true
        this.errors = { phone: '', password: '' }
  
        if (!this.formData.phone) {
          this.errors.phone = '手机号不能为空'
          isValid = false
        } else if (!/^1[3-9]\d{9}$/.test(this.formData.phone)) {
          this.errors.phone = '手机号格式不正确'
          isValid = false
        }
  
        if (!this.formData.password) {
          this.errors.password = '密码不能为空'
          isValid = false
        } else if (this.formData.password.length < 6) {
          this.errors.password = '密码长度至少6位'
          isValid = false
        }
  
        return isValid
      },
  
      async handleSubmit() {
        if (!this.validateForm()) return
  
        this.loading = true
        try {
          console.log('登录数据:', this.formData)
          alert('登录成功!')
        } catch (error) {
          alert(error.message || '登录失败')
        } finally {
          this.loading = false
        }
      },
  
      handleRegister() {
        // 实际使用时建议使用路由跳转
        // this.$router.push('/register')
        alert('跳转到注册页面')
      }
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    min-height: 100vh;
    background: #f5f5f5;
    position: relative;
  }
  
  .logo-container {
    position: absolute;
    left: 40px;
    top: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .logo {
    height: 40px;
  }
  
  .logo-text {
    font-size: 24px;
    font-weight: 500;
    color: #333;
  }
  
  .register-btn {
    position: absolute;
    right: 40px;
    top: 28px;
    padding: 8px 20px;
    background: none;
    border: 1px solid #007bff;
    color: #007bff;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .register-btn:hover {
    background: #007bff;
    color: white;
  }
  
  .login-form {
    width: 400px;
    padding: 40px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  
  .title {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
    font-size: 24px;
  }
  
  .form-item {
    margin-bottom: 24px;
  }
  
  .input-field {
    width: 100%;
    height: 48px;
    padding: 0 16px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.3s;
  }
  
  .input-field:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .input-field.error {
    border-color: #ff4444;
  }
  
  .error-msg {
    color: #ff4444;
    font-size: 12px;
    margin-top: 4px;
  }
  
  .submit-btn {
    width: 100%;
    height: 48px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .submit-btn:hover {
    background: #0056b3;
  }
  
  .submit-btn:disabled {
    background: #a0cfff;
    cursor: not-allowed;
  }
  </style>