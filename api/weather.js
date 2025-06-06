export default async function handler(req, res) {
    // 設定 Header 避免 CORS 問題
    res.setHeader("Access-Control-Allow-Origin", "*"); // 指定本地端開發的 url 也可以
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
    // 預檢請求（CORS preflight）回應
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
  
    const { locationName } = req.query;
  
    if (!locationName) {
      return res.status(400).json({ error: "缺少 locationName 參數" });
    }
  
    const apiKey = process.env.VUE_APP_WEATHER_API_KEY;
    const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${apiKey}&locationName=${encodeURIComponent(locationName)}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("氣象局 API 回傳資料：", data);
  
      if (!response.ok || !data || data.success !== "true") {
        throw new Error("API 錯誤：" + (data.message || response.status));
      }
  
      res.status(200).json(data);
    } catch (error) {
      console.error("取得天氣資料失敗", error);
      res.status(500).json({ error: "無法取得天氣資料", detail: error.message });
    }
}