<script setup lang="ts">
// 引入搜尋框零件
import SearchBox from '../components/SearchBox.vue'
</script>

<template>
  <main>
    <!-- 標題：這是 GitHub 偵察機的首頁 -->
    <h1>🔍 GitHub 偵察機</h1>
    <p>輸入一個 GitHub 用戶名，看看他們長什麼樣子！</p>
    
    <!-- 把搜尋框零件放進來 -->
    <SearchBox />
  </main>
</template>

<style scoped>
main {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
}

h1 {
  font-size: 32px;
  color: #24292e;
  margin-bottom: 10px;
}

p {
  color: #586069;
  margin-bottom: 30px;
}
</style>