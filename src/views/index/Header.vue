<script setup lang="ts" name="Header">
import { ref } from 'vue';

const searchQuery = ref('');
const gotoAdmin = ()=>{
     window.location.href = '/adminLogin'
}
const gotoLogin = ()=>{
     window.location.href = '/login'
}
</script>

<template>
  <header class="header">
    <div class="header-top">
      <div class="search-container">
        <img src="/logo.png" class="logo" />
        <div class="search-group">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="输入关键词..."
            class="search-input"
          />
          <button class="search-button">
            <svg class="search-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="nav-actions">
        <button class="nav-btn" @click="gotoAdmin">
          <svg class="icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12V13.45C22,14.45 21.65,15.3 21,16C20.3,16.67 19.5,17 18.5,17C17.3,17 16.31,16.5 15.56,15.5C14.56,16.5 13.38,17 12,17C10.63,17 9.45,16.5 8.46,15.54C7.5,14.55 7,13.38 7,12C7,10.63 7.5,9.45 8.46,8.46C9.45,7.5 10.63,7 12,7C13.38,7 14.55,7.5 15.54,8.46C16.5,9.45 17,10.63 17,12V13.45C17,14.15 17.17,14.75 17.46,15.29C17.75,15.83 18.15,16.25 18.65,16.56C19.14,16.86 19.73,17 20.41,17C21.1,17 21.66,16.86 22.11,16.56C22.56,16.25 22.89,15.83 23.11,15.29C23.33,14.75 23.44,14.15 23.44,13.45V12C23.44,9.15 22.3,6.65 20.05,4.65C17.8,2.6 15,1.55 12,1.55C9,1.55 6.2,2.6 3.95,4.65C1.7,6.65 0.56,9.15 0.56,12C0.56,15.3 2.11,18.05 4.26,20.26C6.41,22.41 9.15,24 12,24C14.85,24 17.59,22.41 19.74,20.26C21.89,18.05 23.44,15.3 23.44,12V12C23.44,11.4 23.39,10.8 23.28,10.2C23.17,9.6 23,9 22.78,8.4L21.28,9.1C21.45,9.6 21.56,10.15 21.61,10.75C21.67,11.35 21.7,11.95 21.7,12.55C21.7,14.85 20.5,16.85 18.25,18.25C16,19.65 13.35,20.35 10.5,20.35C7.65,20.35 5,19.65 2.75,18.25C0.5,16.85 -0.65,14.85 -0.65,12C-0.65,9.15 0.5,6.65 2.75,4.65C5,2.6 7.65,1.55 10.5,1.55C13.35,1.55 16,2.6 18.25,4.65C20.5,6.65 21.7,9.15 21.7,12V13.45C21.7,14.05 21.6,14.6 21.4,15.1C21.2,15.6 20.9,16 20.5,16.3C20.1,16.6 19.65,16.75 19.15,16.75C18.4,16.75 17.75,16.5 17.25,16C16.75,15.5 16.5,14.85 16.5,14V12C16.5,10.9 16.05,9.95 15.15,9.15C14.25,8.35 13.2,7.95 12,7.95C10.8,7.95 9.75,8.35 8.85,9.15C7.95,9.95 7.5,10.9 7.5,12C7.5,13.1 7.95,14.05 8.85,14.85C9.75,15.65 10.8,16.05 12,16.05C13.15,16.05 14.15,15.65 15,14.85C15.85,14.05 16.3,13.05 16.3,12V10.59L15,11.29V12C15,12.55 14.8,13.05 14.45,13.45C14.1,13.85 13.6,14.05 13,14.05C12.4,14.05 11.9,13.85 11.55,13.45C11.2,13.05 11,12.55 11,12C11,11.45 11.2,10.95 11.55,10.55C11.9,10.15 12.4,9.95 13,9.95C13.3,9.95 13.55,10 13.8,10.1L14.7,9.5L12,5.5L9.3,9.5L10.2,10.1C10.45,10 10.7,9.95 11,9.95C11.6,9.95 12.1,10.15 12.45,10.55C12.8,10.95 13,11.45 13,12C13,12.55 12.8,13.05 12.45,13.45C12.1,13.85 11.6,14.05 11,14.05C10.4,14.05 9.9,13.85 9.55,13.45C9.2,13.05 9,12.55 9,12C9,11.45 9.2,10.95 9.55,10.55C9.9,10.15 10.4,9.95 11,9.95C11.15,9.95 11.3,9.97 11.45,10.02L12.35,9.42L12,8.9L11.65,9.42L12.55,10.02C12.7,9.97 12.85,9.95 13,9.95C13.6,9.95 14.1,10.15 14.45,10.55C14.8,10.95 15,11.45 15,12C15,12.55 14.8,13.05 14.45,13.45C14.1,13.85 13.6,14.05 13,14.05C12.4,14.05 11.9,13.85 11.55,13.45C11.2,13.05 11,12.55 11,12C11,11.45 11.2,10.95 11.55,10.55C11.9,10.15 12.4,9.95 13,9.95C13.3,9.95 13.55,10 13.8,10.1L14.7,9.5L12,5.5L9.3,9.5L10.2,10.1C10.45,10 10.7,9.95 11,9.95C11.6,9.95 12.1,10.15 12.45,10.55C12.8,10.95 13,11.45 13,12C13,12.55 12.8,13.05 12.45,13.45C12.1,13.85 11.6,14.05 11,14.05C10.4,14.05 9.9,13.85 9.55,13.45C9.2,13.05 9,12.55 9,12C9,11.45 9.2,10.95 9.55,10.55C9.9,10.15 10.4,9.95 11,9.95C11.15,9.95 11.3,9.97 11.45,10.02L12.35,9.42L12,8.9L11.65,9.42L12.55,10.02C12.7,9.97 12.85,9.95 13,9.95C13.6,9.95 14.1,10.15 14.45,10.55C14.8,10.95 15,11.45 15,12V12.71L14.73,12.44C13.59,13.41 12.11,14 10.5,14C8.89,14 7.41,13.41 6.44,12.44C5.47,11.47 5,10 5,8.5C5,7 5.47,5.53 6.44,4.56C7.41,3.59 8.89,3 10.5,3C12.11,3 13.59,3.59 14.56,4.56C15.53,5.53 16,7 16,8.5V9.5C16,10.05 16.2,10.55 16.55,10.95C16.9,11.35 17.4,11.55 18,11.55C18.6,11.55 19.1,11.35 19.45,10.95C19.8,10.55 20,10.05 20,9.5V8.5C20,6.15 19,4.15 17,2.5C15,0.85 12.65,0 10,0C7.35,0 5,0.85 3,2.5C1,4.15 0,6.15 0,8.5C0,10.85 1,12.85 3,14.5C5,16.15 7.35,17 10,17H12V15H10C8.8,15 7.75,14.6 6.85,13.85C5.95,13.1 5.5,12.1 5.5,11C5.5,9.9 5.95,8.95 6.85,8.15C7.75,7.35 8.8,7 10,7C11.2,7 12.25,7.35 13.15,8.15C14.05,8.95 14.5,9.9 14.5,11C14.5,12.1 14.05,13.1 13.15,13.85C12.25,14.6 11.2,15 10,15H8V17H10C12.75,17 15,16 17,14C19,12 20,9.65 20,7C20,4.35 19,2 17,0H15V2H17C18.3,2 19.45,2.5 20.45,3.5C21.45,4.5 22,5.65 22,7C22,8.35 21.45,9.5 20.45,10.5C19.45,11.5 18.3,12 17,12C18.3,12 19.45,11.5 20.45,10.5C21.45,9.5 22,8.35 22,7V6H24V7C24,9.35 23,11.7 21,14C19,16.3 16.35,17.5 13,17.5V19.5H15V21.5H13V23.5H11V21.5H9V19.5H11V17.5C9.35,17.5 7.8,17.1 6.35,16.3C4.9,15.5 3.75,14.4 2.9,13C2.05,11.6 1.6,10.1 1.55,8.5H3.55C3.6,10.05 4,11.45 4.75,12.7C5.5,13.95 6.55,14.95 7.9,15.7C9.25,16.45 10.75,16.85 12.4,16.9L12,17Z"/>
          </svg>
          <span>后台入口</span>
        </button>
        <button class="nav-btn primary" @click="gotoLogin">
          <svg class="icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
          </svg>
          <span>登录</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(135deg, #f5f7e9 0%, #e8f5e9 100%);
  padding: 1rem 2rem;
  box-shadow: 0 2px 15px rgba(46, 125, 50, 0.1);
  position: relative;
  z-index: 1000;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.logo {
  width: 48px;
  height: 48px;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: rotate(-15deg);
}

.search-group {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 2rem;
  padding: 0.25rem;
  box-shadow: 0 2px 8px rgba(46, 125, 50, 0.1);
  transition: all 0.3s ease;
}

.search-group:focus-within {
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.2);
  transform: translateY(-1px);
}

.search-input {
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  width: 400px;
  color: #1b5e20;
  outline: none;
}

.search-input::placeholder {
  color: #81c784;
}

.search-button {
  background: linear-gradient(135deg, #66bb6a 0%, #43a047 100%);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.search-icon {
  width: 24px;
  height: 24px;
  color: white;
}

.search-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(67, 160, 71, 0.3);
}

.nav-actions {
  display: flex;
  gap: 1rem;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  border: 2px solid #c8e6c9;
  background: white;
  color: #2e7d32;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.nav-btn.primary {
  background: linear-gradient(135deg, #66bb6a 0%, #43a047 100%);
  color: white;
  border-color: transparent;
}

.nav-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.15);
}

.nav-btn:active {
  transform: translateY(0);
}

.icon {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }
  
  .search-input {
    width: 200px;
  }
  
  .nav-btn span {
    display: none;
  }
  
  .nav-btn {
    padding: 0.75rem;
  }
}
</style>