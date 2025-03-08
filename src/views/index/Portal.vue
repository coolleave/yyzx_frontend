<script setup lang="ts">
import { ref } from "vue";

const categories = ["全部", "办公用品", "电子产品", "家电", "玩具", "图书", "食品", "服装"];
const products = [
  { name: "笔记本电脑包", image: "laptop_bag.jpg" },
  { name: "灰色短袖T恤", image: "gray_tshirt.jpg" },
  { name: "印花白T恤", image: "printed_tshirt.jpg" }
];
const selectedCategory = ref("全部");
</script>

<template>
  <div class="container">
    <!-- 左侧分类列表 -->
    <div class="sidebar">
      <h2>商品分类</h2>
      <ul>
        <li 
          v-for="category in categories" 
          :key="category" 
          :class="{ 'active': selectedCategory === category }"
          @click="selectedCategory = category">
          {{ category }}
        </li>
      </ul>
    </div>
    
    <!-- 右侧商品展示 -->
    <div class="product-list">
      <h2>最新商品</h2>
      <div class="grid">
        <div v-for="product in products" :key="product.name" class="product-card">
          <img :src="product.image" alt="product.name" />
          <p>{{ product.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}

.sidebar {
  width: 20%;
  background: white;
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  font-size: 18px;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s;
}

.sidebar li:hover, .sidebar li.active {
  background: #007bff;
  color: white;
}

.product-list {
  flex: 1;
  padding: 20px;
}

.product-list h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.product-card {
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.product-card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

.product-card p {
  font-size: 16px;
  font-weight: bold;
}
</style>
