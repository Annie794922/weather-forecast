import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { weatherApiHelper } from '../../api/baseUrl'

export default createStore({
    state: {
        searchFields: [
            {
                name: '查詢縣市',
                items: [
                    '宜蘭縣',
                    '花蓮縣',
                    '臺東縣',
                    '澎湖縣',
                    '金門縣',
                    '連江縣',
                    '臺北市',
                    '新北市',
                    '桃園市',
                    '臺中市',
                    '臺南市',
                    '高雄市',
                    '基隆市',
                    '新竹縣',
                    '新竹市',
                    '苗栗縣',
                    '彰化縣',
                    '南投縣',
                    '雲林縣',
                    '嘉義縣',
                    '嘉義市',
                    '屏東縣'
                ]
            },
            {
                name: '查詢時段',
                items: []
            }
        ],
        searchResults: []
    },
    getters: {},
    mutations: {
        setPeriodOptions(state, options) {
            state.searchFields[1].items = []

            for (const option of options) {
                state.searchFields[1].items.push(option)
            }
        },
        saveResult(state, resultData) {
            state.searchResults.pop()
            state.searchResults.push(resultData)
        },
        addResult(state, newData) {
            state.searchResults.unshift(newData)
        },
        removeResult(state, itemIndex) {
            state.searchResults.splice(itemIndex, 1)
        }
    },
    actions: {
        async getInitialWeatherData({ commit }, location) {
            try {
                const response = await weatherApiHelper.get(
                    `weather?locationName=${location}`
                )

                if (response.status === 200) {
                    const resultData = {}

                    const periodOptions = []
                    let nearestTimeData

                    // Generate the options in the period dropdown menu
                    for (const data of response.data.records.location[0]
                        .weatherElement[0].time) {
                        periodOptions.push(
                            `${data.startTime} ~ ${data.endTime}`
                        )
                    }

                    commit('setPeriodOptions', periodOptions)

                    // Generate the data structure for the single weather information
                    resultData.location =
                        response.data.records.location[0].locationName

                    for (const element of response.data.records.location[0]
                        .weatherElement) {
                        if (element.elementName === 'PoP') {
                            nearestTimeData = element.time[0]
                            resultData.precipitationRate = `${nearestTimeData.parameter.parameterName}%`
                        } else if (element.elementName === 'MinT') {
                            nearestTimeData = element.time[0]
                            resultData.minTemperature = `${nearestTimeData.parameter.parameterName}°${nearestTimeData.parameter.parameterUnit}`
                        } else if (element.elementName === 'MaxT') {
                            nearestTimeData = element.time[0]
                            resultData.maxTemperature = `${nearestTimeData.parameter.parameterName}°${nearestTimeData.parameter.parameterUnit}`
                        } else if (element.elementName === 'Wx') {
                            nearestTimeData = element.time[0]
                            resultData.weather =
                                nearestTimeData.parameter.parameterName
                            resultData.period = `${nearestTimeData.startTime} ~ ${nearestTimeData.endTime}`
                        } else if (element.elementName === 'CI') {
                            nearestTimeData = element.time[0]
                            resultData.feeling =
                                nearestTimeData.parameter.parameterName
                        }
                    }

                    resultData.isDeletable = false

                    commit('saveResult', resultData)

                    return response
                }
            } catch (error) {
                console.log(error)
                return Promise.reject(error)
            }
        }
    },
    modules: {},
    plugins: [createPersistedState()]
})
