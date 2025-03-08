<script setup lang="ts" name="Footer">
// 可以在这里添加年份计算逻辑
</script>

<template>
  <footer class="footer">
    <div class="legal-links">
      <a href="https://beian.miit.gov.cn" target="_blank" class="link">冀ICP备12345678号</a>
      <span class="divider">|</span>
      <a href="http://www.beian.gov.cn" target="_blank" class="link">冀公网安备123456</a>
      <span class="divider">|</span>
      <span class="license">裕华街123456号</span>
    </div>
    <div class="copyright">
      <span>2022-2023 © 宇优在线 · All Rights Reserved</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(135deg, #f5f7e9 0%, #e8f5e9 100%);
  padding: 2rem 3rem;
  border-top: 1px solid rgba(46, 125, 50, 0.15);
  color: #2e7d32;
  font-size: 0.95rem;
}

.legal-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.2rem;
}

.link {
  color: #43a047;
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
}

.link:hover {
  color: #1b5e20;
  text-decoration: underline;
}

.link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 1px;
  background: #1b5e20;
  transition: width 0.3s ease;
}

.link:hover::after {
  width: 100%;
}

.divider {
  color: #a5d6a7;
  user-select: none;
}

.license {
  color: #81c784;
}

.copyright {
  text-align: center;
  font-size: 0.9rem;
  color: #81c784;
}

.copyright span {
  letter-spacing: 0.5px;
}
</style>