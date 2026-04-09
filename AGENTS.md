# GitHub Scout - AGENTS.md

## Project Overview

This is a Vue 3 project named "GitHub Scout" - a beginner-friendly GitHub repository browser.

**Important Context**: The developer is a sophomore who only knows HTML. All explanations must avoid Vue jargon (ref, reactive, lifecycle, computed, watch, etc.) and use everyday analogies like "boxes", "switches", "magic boxes", "building blocks". Every code snippet must include plain-language comments in Chinese.

---

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | 啟動開發伺服器（就像打開網站預覽） |
| `npm run build` | 把網站打包成正式版本（準備上線） |
| `npm run preview` | 預覽打包後的網站 |
| `npm run type-check` | 檢查 TypeScript 有沒有打錯字 |

**執行單一測試** - 目前專案沒有安裝測試框架。如果需要測試，可以加 `vitest`：
```bash
npm install -D vitest
# 執行單一測試檔案
npx vitest run src/components/__tests__/MyComponent.test.ts
```

---

## Code Style Guidelines

### 檔案結構
```
src/
├── components/     # 小零件（按鈕、卡片等）
├── views/          # 頁面（首頁、搜尋結果頁面）
├── stores/         # 資料盒（放共享資料的地方）
├── router/         # 導航器（決定要去哪個頁面）
└── App.vue         # 網站的大總管
```

### 命名規則
- **檔案名稱**：用 kebab-case，如 `github-card.vue`、`search-box.vue`
- **元件名稱**：用 PascalCase，如 `GitHubCard`、`SearchBox`
- **資料盒（store）**：用 kebab-case，如 `user-info.ts`、`repo-list.ts`

### 引入方式（Imports）
```typescript
// 引入 Vue 的功能 - 用生活化的比喻
import { ref } from 'vue'           // 引入「開關」- 可以改變的資料
import { reactive } from 'vue'      // 引入「盒子」- 裡面有很多開關

// 引入零件
import SearchBox from '@/components/SearchBox.vue'
import RepoCard from '@/components/RepoCard.vue'

// 引入 API 工具
import { fetchRepositories } from '@/api/github'
```

### TypeScript 類型
```typescript
// 基本的類型定義 - 就像標籤
interface Repo {
  id: number
  name: string
  description: string | null  // 可以是文字，也可以沒有
  stars: number
  url: string
}

// 函數的類型 - 就像說明書
function getRepoInfo(name: string): Promise<Repo>
```

### 錯誤處理
```typescript
// 用 try-catch 包起來 - 就像安全氣囊
try {
  const data = await fetchUser(input)
  // 成功時的處理
} catch (error) {
  // 失敗時的處理 - 顯示錯誤訊息給使用者
  showError('找不到這個使用者')
}
```

### 格式化
- 使用 2 個空格縮排
- 最後一行留空
- JSX/HTML 屬性超過 80 字元換行

---

## Development Guidelines

### 核心原則

1. **禁止使用 Vue 術語**：不用 `ref`、`reactive`、`computed`、`watch`、`onMounted`、`lifecycle` 等專業術語
   
2. **用生活比喻解釋**：
   - `ref` → 「開關」或「可以變的盒子」
   - `reactive` → 「大盒子」裡面放很多相關的東西
   - `computed` → 「計算結果」自動算出來的數字
   - `onMounted` → 「頁面出生時」當這個頁面第一次出現
   - `props` → 「傳进来的東西」從外面給這個零件的資料

3. **每次只寫一小段**：不要一次寫完所有功能，一次只加 10-20 行程式碼

4. **白話文註解**：每段程式碼旁邊都要用中文寫通俗的解釋
   ```vue
   <!-- 這是搜尋框零件 -->
   <template>
     <!-- 輸入框：讓使用者打字的地方 -->
     <input 
       v-model="關鍵字" 
       placeholder="輸入 GitHub 用戶名"
     />
     <!-- 按鈕：點了之後去搜尋 -->
     <button @click="去搜尋()">搜尋</button>
   </template>
   
   <script setup>
   // 「開關」- 存放使用者打字的內容
   const 關鍵字 = ref('')
   
   // 「功能」- 搜尋按鈕被點擊時要做的事
   function 去搜尋() {
     console.log('要去搜尋：' + 關鍵字.value)
   }
   </script>
   ```

5. **先解釋再給 code**：先說「我們要做什麼」，再給「實際的程式碼」

---

## 常用工具

### 發送網路請求（呼叫 API）
```typescript
// 用 fetch 或 axios 呼叫 GitHub API
// GitHub API 文件：https://docs.github.com/en/rest
```

### 用來放資料的「盒子」
```typescript
// 用 Pinia（就像一個大冰箱，大家可以共用裡面的東西）
// 不用 Vue 的 ref，用 Pinia 的 store
```

---

## 實作順序建議

1. 先建立「搜尋頁面」
2. 建立「結果卡片」零件
3. 寫 API 呼叫程式
4. 把搜尋結果顯示出來
5. 加入「Loading」狀態
6. 加入「錯誤處理」

每次實作時，只做一小部分，確保使用者能跟上進度！