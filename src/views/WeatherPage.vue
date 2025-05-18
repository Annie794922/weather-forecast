<template>
    <div class="container min-vh-100">
        <div class="row">
            <!-- Search fields -->
            <template v-for="(field, index) in searchFields" :key="index">
                <DropdownMenu v-bind="field" @getFieldValue="getFieldValue" />
            </template>
            <button
                type="button"
                class="btn btn-secondary w-25 mx-auto mt-3 mb-4"
                :disabled="isDisabled || isLoading || isFulled"
                @click="search"
            >
                {{ buttons.search }}
                <div
                    class="spinner-border spinner-border-sm text-light"
                    role="status"
                    v-show="isLoading"
                >
                    <span class="visually-hidden">Loading...</span>
                </div>
            </button>
            <!-- Feature hints for the website(project) -->
            <template v-for="(info, index) in hintSettings" :key="index">
                <HintMessage v-bind="info" />
            </template>
        </div>
        <div class="row">
            <!-- The message when the initial searching is proceed, and the message for failed result. -->
            <div v-if="!searchResults.length" class="col my-5 fw-bold">
                <p>{{ loadingMessage }}</p>
            </div>
            <!-- Card for single weather information -->
            <template
                v-else-if="searchResults.length"
                v-for="(cityWeatherInfo, index) in searchResults"
                :key="index"
            >
                <WeatherCard
                    v-bind="cityWeatherInfo"
                    :index="index"
                    @getDeleteDataIndex="deleteItem"
                />
            </template>
        </div>
    </div>
</template>
<script>
import { weatherApiHelper } from '../utils/baseUrl'

import DropdownMenu from '../components/DropdownMenu'
import WeatherCard from '../components/WeatherCard'
import HintMessage from '../components/HintMessage'

export default {
    components: {
        DropdownMenu,
        WeatherCard,
        HintMessage
    },
    data() {
        return {
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
            hintSettings: [
                {
                    icon: 'bi-info-circle',
                    size: 'small',
                    color: 'text-secondary',
                    text: '請先選擇想查詢的縣市和特定時段，才可以查詢該縣市的天氣狀況以供比對'
                },
                {
                    icon: 'bi-info-circle',
                    size: 'small',
                    color: 'text-secondary',
                    text: '本系統僅能查詢36小時內的最新天氣預報'
                },
                {
                    icon: 'bi-exclamation-triangle',
                    size: 'small',
                    color: 'text-secondary',
                    text: '本系統最多只能紀錄三筆天氣查詢結果，如果需要查詢其他天氣資料，請先刪除現有的資料'
                }
            ],
            buttons: {
                search: '查詢'
            },
            params: {
                locationName: '',
                period: ''
            },
            isLoading: false,
            loadingMessage: '初始天氣資料載入中......'
        }
    },
    mounted() {
        const getInitialWeatherData = async () => {
            try {
                const response = await this.$store.dispatch(
                    'getInitialWeatherData',
                    '臺北市'
                )

                const { status, dataPeriods } = response

                if (status === 200) {
                    // Generate the options in the period dropdown menu
                    this.searchFields[1].items = []

                    for (const period of dataPeriods) {
                        const displayStartDate = period.startTime
                            .slice(5, 10)
                            .replace('-', '/')
                        const displayStartTime = period.startTime.slice(11, 16)
                        const displayEndDate = period.endTime
                            .slice(5, 10)
                            .replace('-', '/')
                        const displayEndTime = period.endTime.slice(11, 16)
                        const displayPeriodOption = `${displayStartDate} ${displayStartTime} ~ ${displayEndDate} ${displayEndTime}`

                        const option = {
                            label: displayPeriodOption,
                            value: period.startTime
                        }

                        this.searchFields[1].items.push(option)
                    }

                    return
                }
            } catch (error) {
                console.log(error)
                alert('初始資料請求有誤，請稍後再試，謝謝！')

                this.searchFields[1].items = []

                this.loadingMessage = '沒有任何天氣資料'
                this.searchFields[1].items.push({
                    label: '沒有可查詢的時段',
                    value: ''
                })

                return
            }
        }

        getInitialWeatherData()
    },
    methods: {
        getFieldValue(value) {
            if (value.length === 3) {
                this.params.locationName = value
            } else if (value.includes('~')) {
                const selectedOption = this.searchFields[1].items.find(
                    (option) => option.label === value
                )

                this.params.period = selectedOption.value
            }
        },
        async search() {
            this.isLoading = true

            const { locationName, period } = this.params

            // Confirm whether the same locationName & period combination has existed.
            const repeatData = this.searchResults.find(
                (data) =>
                    data.location === locationName &&
                    data.period.split(' ~ ')[0] ===
                        period.slice(0, 16).replaceAll('-', '/')
            )

            if (repeatData) {
                alert('查詢結果中已經有該搜尋條件的組合，請重設查詢條件')
                this.isLoading = false
                return
            }

            try {
                const periodStart = period.split(' ~ ')[0]

                const response = await weatherApiHelper.get(
                    `weather?locationName=${locationName}`
                )

                if (response.status === 200) {
                    const resultData = {}
                    let searchPeriodData

                    resultData.location =
                        response.data.records.location[0].locationName

                    for (const element of response.data.records.location[0]
                        .weatherElement) {
                        if (element.elementName === 'PoP') {
                            searchPeriodData = element.time.find(
                                (item) => item.startTime === periodStart
                            )
                            resultData.precipitationRate = `${searchPeriodData.parameter.parameterName}%`
                        } else if (element.elementName === 'MinT') {
                            searchPeriodData = element.time.find(
                                (item) => item.startTime === periodStart
                            )
                            resultData.minTemperature = `${searchPeriodData.parameter.parameterName}°${searchPeriodData.parameter.parameterUnit}`
                        } else if (element.elementName === 'MaxT') {
                            searchPeriodData = element.time.find(
                                (item) => item.startTime === periodStart
                            )
                            resultData.maxTemperature = `${searchPeriodData.parameter.parameterName}°${searchPeriodData.parameter.parameterUnit}`
                        } else if (element.elementName === 'Wx') {
                            searchPeriodData = element.time.find(
                                (item) => item.startTime === periodStart
                            )
                            resultData.weather =
                                searchPeriodData.parameter.parameterName

                            // Adjust the displaying format in frontend
                            resultData.period = `${searchPeriodData.startTime
                                .slice(0, 16)
                                .replaceAll(
                                    '-',
                                    '/'
                                )} ~ ${searchPeriodData.endTime
                                .slice(0, 16)
                                .replaceAll('-', '/')}`
                        } else if (element.elementName === 'CI') {
                            searchPeriodData = element.time.find(
                                (item) => item.startTime === periodStart
                            )
                            resultData.feeling =
                                searchPeriodData.parameter.parameterName
                        }
                    }

                    resultData.isDeletable = true

                    this.$store.commit('addResult', resultData)
                    this.isLoading = false

                    return
                }
            } catch (error) {
                console.log(error)
                alert('查詢過程出了點問題，請稍後再試，謝謝！')

                this.isLoading = false
                return Promise.reject(error)
            }
        },
        deleteItem(index) {
            this.$store.commit('removeResult', index)
            return
        }
    },
    computed: {
        searchResults() {
            return this.$store.state.searchResults
        },
        isDisabled() {
            return Object.values(this.params).every((value) => value)
                ? false
                : true
        },
        isFulled() {
            return this.searchResults.length === 3 ? true : false
        }
    }
}
</script>
<style></style>
