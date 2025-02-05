<template>
  <div class="not-found-container">
    <div class="content">
      <div class="error-code animate-code">404</div>
      <div class="error-message">商品已从货架消失</div>
      <p class="sub-text">我们的智能仓储系统找不到这个页面</p>
      
      <!-- 动态快递车图标 -->
      <div class="delivery-truck">
        <svg viewBox="0 0 64 64">
          <path d="M56,36v12h-6V40H34v8h-6V28H10v20H4V20h48v8H56z M16,44c-3.314,0-6-2.686-6-6s2.686-6,6-6s6,2.686,6,6S19.314,44,16,44z
	 M48,44c-3.314,0-6-2.686-6-6s2.686-6,6-6s6,2.686,6,6S51.314,44,48,44z"/>
          <circle class="wheel" cx="16" cy="38" r="4"/>
          <circle class="wheel" cx="48" cy="38" r="4"/>
        </svg>
      </div>

      <router-link to="/" class="home-button">
        <span class="button-text">返回商城首页</span>
        <div class="button-icon">
          <svg class="cart" viewBox="0 0 24 24">
            <path d="M17 18C18.1046 18 19 18.8954 19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18ZM7 18C8.10457 18 9 18.8954 9 20C9 21.1046 8.10457 22 7 22C5.89543 22 5 21.1046 5 20C5 18.8954 5.89543 18 7 18ZM23.771 11.3643C23.4373 10.7838 22.8334 10.4286 22.1818 10.4286H6.54545L5.09091 6H2V8H4.45455L8.72727 16.5714H18.1818L22.1818 8H24L23.771 11.3643ZM19.6364 15.1429H9.81818L7.63636 10.4286H21.0909L19.6364 15.1429Z"/>
          </svg>
        </div>
      </router-link>

  
    </div>



    
  </div>
</template>

<script>
export default {
  name: 'EcommerceNotFound',
  data() {
    return {
      prices: ['￥299', '￥599', '￥899', '￥1299', '￥1999']
    }
  }
}
</script>

<style scoped>
.not-found-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.content {
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 2rem;
}

.error-code {
  font-size: 12rem;
  font-weight: 800;
  color: #ff5a5f;
  text-shadow: 2px 2px 4px rgba(255,90,95,0.2);
  margin-bottom: 1rem;
}

.error-message {
  font-size: 2rem;
  color: #2d3436;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.sub-text {
  color: #636e72;
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
}

/* 快递车动画 */
.delivery-truck {
  margin: 2rem 0;
  animation: truckMove 3s infinite;
  svg {
    width: 120px;
    height: 80px;
    fill: #ff7675;
  }
  .wheel {
    animation: wheelSpin 1.5s linear infinite;
  }
}

@keyframes truckMove {
  0%, 100% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
}

@keyframes wheelSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 商品货架 */
.shelf-decoration {
  position: absolute;
  bottom: -50px;
  width: 100%;
  height: 80px;
  background: #e9ecef;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 2rem;
}

.product-box {
  width: 60px;
  height: 60px;
  background: #fff;
  border: 2px solid #ced4da;
  transform: rotate(45deg);
  position: relative;
  &::after {
    content: attr(data-price);
    position: absolute;
    transform: rotate(-45deg);
    color: #ff5a5f;
    font-weight: bold;
  }
}

/* 扫码提示 */
.qr-hint {
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  .qr-icon {
    width: 80px;
    height: 80px;
    border: 3px dashed #74b9ff;
    padding: 5px;
    margin-bottom: 1rem;
    .qr-grid {
      width: 100%;
      height: 100%;
      background: 
        repeating-linear-gradient(transparent 0 16%, #74b9ff 16% 17%),
        repeating-linear-gradient(90deg, transparent 0 16%, #74b9ff 16% 17%);
    }
  }
  p {
    color: #2d3436;
    font-size: 0.9rem;
  }
}

/* 品牌展示 */
.brand-footer {
  position: absolute;
  bottom: 1rem;
  text-align: center;
  .logo {
    height: 40px;
    margin-bottom: 0.5rem;
  }
  .slogan {
    color: #636e72;
    font-size: 0.9rem;
    letter-spacing: 1px;
  }
}

/* 按钮样式 */
.home-button {
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #ff7675, #ff5a5f);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(255,90,95,0.2);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(255,90,95,0.3);
    .cart {
      animation: cartBounce 0.5s;
    }
  }
}

@keyframes cartBounce {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}

.cart {
  width: 24px;
  height: 24px;
  fill: white;
  margin-left: 8px;
}

@media (max-width: 768px) {
  .error-code { font-size: 8rem; }
  .delivery-truck svg { width: 80px; }
  .qr-hint { display: none; }
}
</style>