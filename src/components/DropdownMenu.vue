<template>
    <div class="mb-2">
        <!-- Field name -->
        <h5>
            {{ name }}
        </h5>
        <!-- The selected value and the options in menu -->
        <div class="btn-group w-50">
            <button
                class="btn btn-success dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {{ selectedItem || '請選擇' }}
            </button>
            <ul v-if="name.includes('縣市')" class="dropdown-menu w-100">
                <template v-for="(item, index) in items" :key="index">
                    <li>
                        <a class="dropdown-item" @click="getSelectedItem(item)">
                            {{ item }}
                        </a>
                    </li>
                </template>
            </ul>
            <ul v-if="name.includes('時段')" class="dropdown-menu w-100">
                <template v-for="(item, index) in items" :key="index">
                    <li>
                        <a
                            class="dropdown-item"
                            @click="getSelectedItem(item.label)"
                        >
                            {{ item.label }}
                        </a>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        name: String,
        items: Array
    },
    data() {
        return {
            selectedItem: ''
        }
    },
    methods: {
        getSelectedItem(value) {
            this.selectedItem = value
        }
    },
    watch: {
        selectedItem(newValue) {
            this.$emit('getFieldValue', newValue)
        }
    }
}
</script>
