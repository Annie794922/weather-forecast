<template>
    <div class="container min-vh-100">
        <div class="row">
            <div class="col-10 col-md-9 mx-auto my-5">
                <div class="card">
                    <h5 class="card-header py-3">{{ cardHeader }}</h5>
                    <div class="card-body">
                        <div
                            v-for="list in cardContent"
                            :key="list.id"
                            class="card-content-list-container"
                        >
                            <h5 class="card-title">
                                <i class="bi" :class="list.icon"></i>
                                {{ list.title }}
                            </h5>
                            <p
                                class="card-text"
                                v-for="item in list.items"
                                :key="item.id"
                            >
                                {{ item.id }}. {{ item.text }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AboutPage',
    data() {
        return {
            cardHeader: '氣象查詢平台｜使用說明',
            cardContent: [
                {
                    id: 1,
                    icon: 'bi-question-circle',
                    title: '如何操作',
                    items: [
                        {
                            id: 1,
                            text: '系統預設會載入臺灣首都（臺北市）的即時氣象。'
                        },
                        {
                            id: 2,
                            text: '選擇想查詢的縣市和時段之後，即可查詢目標縣市的氣象資訊。'
                        },
                        {
                            id: 3,
                            text: '點選查詢結果右上角的打叉符號，可以移除該筆氣象查詢紀錄。'
                        }
                    ]
                },
                {
                    id: 2,
                    icon: 'bi-exclamation-circle',
                    title: '注意事項',
                    items: [
                        {
                            id: 1,
                            text: '本系統僅能查詢36小時內的最新天氣預報。'
                        },
                        {
                            id: 2,
                            text: '無法重複查詢「相同縣市+時段」組合的的氣象資訊。'
                        },
                        {
                            id: 3,
                            text: '本系統最多只能紀錄三筆天氣查詢結果，如果需要查詢其他天氣資料，請先刪除現有的資料。'
                        }
                    ]
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.card-header {
    background-color: map-get($backgroundColors, cardHeader);
}

.card-body {
    background-color: map-get($backgroundColors, card);
}

.card-content-list-container {
    margin: 2rem auto;
}

.card-title {
    margin-bottom: 1rem;
}
</style>
