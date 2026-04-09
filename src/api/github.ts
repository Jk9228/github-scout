// 定義「標籤」- 說明 GitHub 用戶資料長什麼樣子
interface GitHubUser {
  login: string           // 用戶名（英文）
  avatar_url: string      // 頭像照片的網址
  name: string | null    // 顯示名字（中文），可能沒有
  bio: string | null     // 個人簡介，可能沒有
  public_repos: number   // 公開專案數量
  followers: number      // 追蹤者人數
  following: number     // 正在追蹤的人數
}

// 「功能」- 去 GitHub 伺服器找這個用戶的資料
// 就像打電話給 GitHub 圖書館管理員，問「這個人在哪裡？」
async function fetchGitHubUser(用戶名: string): Promise<GitHubUser> {
  // 發送網路請求 - 就像寄信出去
  const 回應 = await fetch(`https://api.github.com/users/${用戶名}`)
  
  // 如果找不到這個人（404），丟出錯誤
  if (!回應.ok) {
    throw new Error('找不到這個用戶！')
  }
  
  // 把收到的資料變成我們的格式
  const 資料 = await 回應.json()
  return 資料 as GitHubUser
}

// 把功能傳給外面使用
export { fetchGitHubUser }
export type { GitHubUser }
