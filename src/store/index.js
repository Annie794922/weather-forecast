import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { weatherApiHelper } from '../utils/baseUrl'

export default createStore({
    state: {
        searchResults: []
    },
    getters: {},
    mutations: {
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

                    let nearestTimeData

                    // The Data for combining the labels and values for period options
                    const responseData = {
                        status: response.status,
                        dataPeriods:
                            response.data.records.location[0].weatherElement[0]
                                .time
                    }

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

                            // Adjust the displaying format in frontend
                            resultData.period = `${nearestTimeData.startTime
                                .slice(0, 16)
                                .replaceAll(
                                    '-',
                                    '/'
                                )} ~ ${nearestTimeData.endTime
                                .slice(0, 16)
                                .replaceAll('-', '/')}`
                        } else if (element.elementName === 'CI') {
                            nearestTimeData = element.time[0]
                            resultData.feeling =
                                nearestTimeData.parameter.parameterName
                        }
                    }

                    resultData.isDeletable = false

                    commit('saveResult', resultData)

                    return responseData
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
