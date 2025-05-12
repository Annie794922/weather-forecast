export default async function handler(req, res) {
    const { locationName } = req.query;
  
    if (!locationName) {
      return res.status(400).json({ error: '缺少 locationName 參數' });
    }
  
    const apiKey = process.env.VUE_APP_WEATHER_API_KEY;
    const url = `https://opendata.cwa.gov.tw/v1/rest/datastore/F-C0032-001?Authorization=${apiKey}&locationName=${encodeURIComponent(locationName)}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      return res.status(200).json(data);
    } catch (error) {
      console.error('API 錯誤：', error);
      return res.status(500).json({ error: '無法取得天氣資料' });
    }
  }