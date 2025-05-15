<template>
    <div class="col-md">
        <div class="card my-2">
            <div class="card-body">
                <!-- The button for removing the weather card -->
                <div
                    class="d-flex justify-content-end"
                    :class="isDeletable ? '' : 'delete-button-area'"
                >
                    <button
                        v-if="isDeletable"
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                        @click="deleteData(index)"
                    ></button>
                </div>
                <!-- The icon for the weather on basis of the weather description -->
                <div class="weather-icon bg-success">
                    <i class="bi text-white" :class="getWeatherIcon"></i>
                </div>
                <h3 class="card-title">
                    {{ location }}
                </h3>
                <p class="card-subtitle text-muted mb-1">
                    {{ period }}
                </p>
                <p class="card-text text-muted">
                    {{ weather }}
                </p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">降雨率｜{{ precipitationRate }}</li>
                <li class="list-group-item">最高溫｜{{ maxTemperature }}</li>
                <li class="list-group-item">最低溫｜{{ minTemperature }}</li>
                <li class="list-group-item">體感｜{{ feeling }}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        location: String,
        period: String,
        weather: String,
        precipitationRate: String,
        feeling: String,
        minTemperature: String,
        maxTemperature: String,
        isDeletable: Boolean,
        index: Number
    },
    data() {
        return {
            // The mapping for the weather icons
            weatherIconClass: {
                sunny: 'bi-brightness-high',
                rainy: 'bi-cloud-rain',
                cloudy: 'bi-cloudy',
                cloudWithSun: 'bi-cloud-sun',
                lightning: 'bi-cloud-lightning',
                lightningWithRain: 'bi-cloud-lightning-rain',
                other: 'bi-question'
            }
        }
    },
    methods: {
        deleteData(index) {
            this.$emit('getDeleteDataIndex', index)
            return
        }
    },
    computed: {
        getWeatherIcon() {
            let classKeyName

            if (this.weather.includes('晴') && this.weather.includes('雲')) {
                classKeyName = 'cloudWithSun'
            } else if (
                this.weather.includes('雨') &&
                this.weather.includes('陰')
            ) {
                classKeyName = 'rainy'
            } else if (
                this.weather.includes('陰') ||
                this.weather.includes('雲')
            ) {
                classKeyName = 'cloudy'
            } else if (
                this.weather.includes('雷') &&
                this.weather.includes('雨')
            ) {
                classKeyName = 'lightningWithRain'
            } else if (this.weather.includes('晴')) {
                classKeyName = 'sunny'
            } else if (this.weather.includes('雷')) {
                classKeyName = 'lightning'
            } else {
                classKeyName = 'other'
            }

            return this.weatherIconClass[classKeyName]
        }
    }
}
</script>
<style scoped>
/* Solving the bug for repaint in Safari browser. */
.card {
    will-change: transform;
    transform: translateZ(0);
}

.delete-button-area {
    height: 24px;
}

/* The circle background outside the weather icon */
.weather-icon {
    margin: 0 auto;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
}

.weather-icon i {
    font-size: 2rem;
}
</style>
