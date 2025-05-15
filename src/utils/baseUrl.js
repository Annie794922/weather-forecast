import axios from 'axios'

const weatherApiHelper = axios.create({
    baseURL: 'https://weather-forecast-lovat-phi.vercel.app/api'
})

export { weatherApiHelper }
