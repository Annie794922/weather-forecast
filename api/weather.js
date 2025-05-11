import { weatherApiHelper } from "./baseUrl"

const handler = async (city) => {
    try {
        const location = city || '';
        const apiKey = process.env.VUE_APP_WEATHER_API_KEY;

        const response = await weatherApiHelper.get(`?Authorization=${apiKey}&locationName=${location}`);

        if (response.success) {
            return response.result;
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export default handler