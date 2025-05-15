<template>
    <p :class="[color, size]">
        <i class="bi" :class="icon"></i>
        {{ text }}
    </p>
</template>
<script>
export default {
    props: {
        icon: String,
        size: String,
        color: String,
        text: String
    }
}
</script>
