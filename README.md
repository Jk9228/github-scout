# GitHub 偵察機 (GitHub Scout)

一個簡單的 Vue 3 網頁，用來搜尋 GitHub 使用者的資料。

## 如何執行

```sh
npm run dev
```

然後打開 http://localhost:5173

---

## 學習記錄（作業）

### 我問 AI 的問題以及答覆

1. **「從我在輸入框打字、按下按鈕，到照片出現，這中間經過了哪些關卡？」**
   - 這是為了理解「網頁是怎麼運作的」
   - **AI 回答**：像寄包裹一樣，經過 6 個步驟：寫信→封信→快遞出發→圖書館管理員找資料→快遞回來→打開信封

2. **「請指出來給我看：程式碼裡的哪一行是負責『記住』我打的名字的？」**
   - 這是為了找到「資料存放」的位置
   - **AI 回答**：在 `src/components/SearchBox.vue` 的 **第 25 行**：
     ```javascript
     //目前版本改在第62行
     const 用户名 = ref('')
     ```
     這行就像一個「開關盒子」，會自動記住你打的字。

3. **「哪一行是負責發送網路請求到 GitHub？」**
   - 這是為了理解「怎麼跟伺服器要資料」
   - **AI 回答**：在 `src/components/SearchBox.vue` 的 **第 73 行**：
     ```javascript
     const 資料 = await fetchGitHubUser(用户名.value)
     ```
     這行就像「打電話給 GitHub 的圖書館管理員」。

4. **「哪一行是負責把結果顯示在畫面上？哪一行是負責 Loading 狀態？哪一行是負責錯誤訊息？」**
   - 這是為了理解「畫面是怎麼變化的」
   - **AI 回答**：
     - **顯示結果**：在 `src/components/SearchBox.vue` 的 **第 22-34 行**（用 `v-if="用戶資料"` 判斷有沒有資料，有的話就顯示卡片）
     - **Loading 狀態**：在 **第 14-15 行**（按鈕顯示「搜尋中...」，用 `載入中` 這個開關控制）
     - **錯誤訊息**：在 **第 20 行**（`v-if="錯誤訊息"` 顯示錯誤）和 **第 81 行**（`錯誤訊息.value = '找不到這個用戶，請檢查拼字！'`）

5. **「為什麼滑鼠移到頭像上時會出現綠色的長方形？」**
   - 這是為了理解 CSS 的效果
   - **AI 回答**：這是用 CSS做出的 hover 效果，在 `src/components/SearchBox.vue` 的 **第 179-200 行**：
     ```css
     .avatar-link::after {
       content: '查看 GitHub 主頁';  /* 顯示的文字 */
       position: absolute;
       bottom: -30px;
       background-color: #2ea44f;  /* 綠色 */
       ...
       opacity: 0;  /* 一開始隱藏 */
     }
     .avatar-link:hover::after {
       opacity: 1;  /* 滑鼠移上去時顯示 */
     }
     ```

---

### AI 用什麼「比喻」讓我聽懂？

| Vue 術語 | AI 的比喻 |
|----------|-----------|
| `ref` | 「開關」- 可以改變的資料，就像一個盒子 |
| `reactive` | 「大盒子」- 裡面放很多相關的東西 |
| `v-model` | 「雙向綁定」- 輸入框和盒子連在一起，打字時盒子也會變 |
| `v-if` | 「開關」- 如果是真的，就顯示；如果是假的，就隱藏 |
| `fetch / API` | 「打電話」或「寄信」給伺服器 |
| 伺服器 | 「圖書館管理員」- 幫你找資料 |
| 網路請求 | 「快遞」- 把你的要求送出去，把資料帶回來 |

---

### 比喻的例子

**一開始我不懂 `v-model` 是什麼，AI 這樣解釋：**

在 `src/components/SearchBox.vue` 的 **第 6 行**：
```vue
<input v-model="用户名" ... />
```

> `v-model="用户名"` 就像「一條看不見的橡皮筋」，連接著輸入框和那個「開關盒子」（第 25 行的 `ref`）。當你在輸入框打字的時候，盒子裡的內容會自動跟著變；反過來，如果盒子裡的內容變了，輸入框也會跟著變。

**關於網路請求，AI 說：**

在 `src/api/github.ts` 的 **第 15-27 行**：
```typescript
async function fetchGitHubUser(用戶名: string): Promise<GitHubUser> {
  const 回應 = await fetch(`https://api.github.com/users/${用戶名}`)
  ...
}
```

> 就像寄包裹一樣：
> 1. 寫信（輸入框打字）
> 2. 把信交給快遞（按下搜尋按鈕）
> 3. 快遞送到圖書館（伺服器收到要求）
> 4. 管理員找到資料（伺服器處理）
> 5. 快遞把東西送回來（回傳資料）
> 6. 打開包裹（顯示結果）

---

## 技術栈

- Vue 3 + TypeScript
- Vite
- Vue Router
- Pinia