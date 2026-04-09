<template>
  <!-- 搜尋框的畫面 -->
  <div class="search-box">
    <!-- 輸入框：讓使用者打 GitHub 用戶名的地方 -->
    <input 
      v-model="用户名" 
      type="text" 
      placeholder="輸入 GitHub 用戶名，例如：torvalds"
      class="search-input"
      @keyup.enter="去搜尋()"
    />
    
    <!-- 按鈕：點下去就會去搜尋 -->
    <button @click="去搜尋()" class="search-button" :disabled="載入中">
      {{ 載入中 ? '搜尋中...' : '搜尋' }}
    </button>
  </div>

  <!-- 顯示錯誤訊息的地方 -->
  <p v-if="錯誤訊息" class="error">{{ 錯誤訊息 }}</p>

  <!-- 顯示找到的用戶資料（如果有的話） -->
  <div v-if="用戶資料" class="result">
    <!-- 頭像：這個用戶的照片，點擊可以打開他的 GitHub 主頁 -->
    <a :href="'https://github.com/' + 用戶資料.login" target="_blank" rel="noopener" class="avatar-link">
      <img :src="用戶資料.avatar_url" :alt="用戶資料.login" class="avatar" />
    </a>
    
    <!-- 用戶名稱 -->
    <h2>{{ 用戶資料.name || 用戶資料.login }}</h2>
    
    <!-- 個人簡介 -->
    <p v-if="用戶資料.bio" class="bio">{{ 用戶資料.bio }}</p>
    
    <!-- 統計數字，點擊可以打開對應的頁面 -->
    <div class="stats">
      <!-- 專案數 → 去他的專案頁面 -->
      <a :href="'https://github.com/' + 用戶資料.login + '?tab=repositories'" target="_blank" class="stat-link">
        <span>📁 {{ 用戶資料.public_repos }} 專案</span>
      </a>
      <!-- 追蹤者 → 去他的追蹤者頁面 -->
      <a :href="'https://github.com/' + 用戶資料.login + '?tab=followers'" target="_blank" class="stat-link">
        <span>👥 {{ 用戶資料.followers }} 追蹤者</span>
      </a>
      <!-- 追蹤中 → 去他追蹤的人頁面 -->
      <a :href="'https://github.com/' + 用戶資料.login + '?tab=following'" target="_blank" class="stat-link">
        <span>🔗 {{ 用戶資料.following }} 追蹤中</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入「開關」- 用來存放會改變的資料
import { ref } from 'vue'

// 引入 API 功能 - 去 GitHub 伺服器抓資料
import { fetchGitHubUser, type GitHubUser } from '../api/github'

// 「開關」- 記住使用者打的名字
// 就像一個盒子，裡面放著使用者輸入的文字
const 用户名 = ref('')

// 「開關」- 記住「正在搜尋中」的狀態
// 一開始是 false（沒有在搜尋）
const 載入中 = ref(false)

// 「開關」- 記住錯誤訊息
// 一開始是空的，沒有錯誤
const 錯誤訊息 = ref('')

// 「開關」- 記住搜尋到的用戶資料
// 一開始是空的，找不到資料
const 用戶資料 = ref<GitHubUser | null>(null)

// 「功能」- 當搜尋按鈕被點擊時要做的事
async function 去搜尋() {
  // 如果盒子裡是空的，就不要搜尋
  if (!用户名.value.trim()) {
    錯誤訊息.value = '請輸入用戶名！'
    return
  }

  // 開始搜尋 → 把「正在搜尋中」開關打開
  載入中.value = true
  錯誤訊息.value = ''
  用戶資料.value = null

  try {
    // 【第二步】發送網路請求到 GitHub
    // 就像打電話給 GitHub 圖書館管理員
    const 資料 = await fetchGitHubUser(用户名.value)
    
    // 找到資料了！放進盒子裡
    用戶資料.value = 資料
  } catch (錯誤) {
    // 如果找不到或網路有問題
    錯誤訊息.value = '找不到這個用戶，請檢查拼字！'
  } finally {
    // 搜尋結束 → 把「正在搜尋中」開關關掉
    載入中.value = false
  }
}
</script>

<style scoped>
/* 搜尋框的樣式 */
.search-box {
  display: flex;
  gap: 10px;
  padding: 20px;
}

/* 輸入框的樣式 */
.search-input {
  flex: 1;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
}

.search-input:focus {
  border-color: #0366d6;
  outline: none;
}

/* 按鈕的樣式 */
.search-button {
  padding: 12px 24px;
  font-size: 16px;
  background-color: #24292e;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.search-button:hover:not(:disabled) {
  background-color: #586069;
}

.search-button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

/* 錯誤訊息的樣式 */
.error {
  color: #cb2431;
  font-size: 14px;
  margin-top: 10px;
}

/* 搜尋結果的樣式 */
.result {
  margin-top: 30px;
  padding: 40px 20px 20px;  /* 上面多留一點空間 */
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  background-color: #f6f8fa;
  overflow: visible;  /* 讓提示能顯示在盒子外面 */
}

/* 頭像的樣式 */
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* 頭像連結 - 讓滑鼠移上去時顯示提示 */
.avatar-link {
  display: inline-block;
  position: relative;
}

/* 滑鼠移上去時，在頭像下方顯示綠色長方形 */
.avatar-link::after {
  content: '查看 GitHub 主頁';  /* 顯示的文字 */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -30px;  /* 在頭像下方 */
  background-color: #2ea44f;  /* 綠色 */
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;  /* 一開始隱藏 */
  pointer-events: none;
  transition: opacity 0.2s;
}

/* 滑鼠移上去時顯示 */
.avatar-link:hover::after {
  opacity: 1;
}

.result h2 {
  margin: 15px 0 10px;
  color: #24292e;
}

.bio {
  color: #586069;
  font-size: 14px;
  margin-bottom: 15px;
}

/* 統計數字的樣式 */
.stats {
  display: flex;
  gap: 20px;
  justify-content: center;
  color: #586069;
  font-size: 14px;
}

/* 統計數字的連結樣式 */
.stat-link {
  text-decoration: none;
  color: #586069;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.stat-link:hover {
  background-color: #e1e4e8;
  color: #0366d6;
}
</style>
