# 臺灣氣象查詢平台｜[DEMO](https://weather-forecast-lovat-phi.vercel.app/)

*本網頁作品謹為個人學習用途，無商業行為，懇請知悉。<br />
*Kindly be informed that the side project is for learning purpose instead of commercial use.

## 使用技術

1. Vue CLI 3 (Vuex、Props / Emit、Vue Router)
2. Bootstrap 5
3. SCSS
4. JavaScript
5. HTML / CSS
6. Vercel 部署

## 專案目的

協助使用者規劃外縣市旅行或出差時，可以掌握最新的當地氣象資訊，避免行程因氣象不佳而受到影響。系統預設自動載入臺灣首都（臺北市）的即時氣象，並保留先前的查詢記錄，讓使用者在操作過程中獲得良好體驗。

## 業務邏輯

1. 模組化條件搜尋欄和查詢結果卡片的元件，提升元件的重用性和程式碼的易讀性。
2. 基於 Grid system 概念進行前端切版和 RWD 處理，並規劃頁面讀取中、查詢資料時禁用「查詢」按鈕等基本 UX 設計。
3. 使用 async / await + Axios 串接中央氣象署的公開 API，並以環境變數的方式保護金鑰，避免曝光在前端。
4. 以 Vuex 集中管理氣象查詢的結果，有利於功能擴充時提升資料共用的效率，減少繁瑣的 Props / Emit 傳值。
5. 透過 Git 和 GitLab 進行專案版控，並且以多分支模式來模擬團隊開發，在實務上可達到分工合作和減少程式碼互相污染的情況。

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
