<template>
    <div class="w-8 h-8 cursor-pointer border flex transition-colors" :style="{ background: props.color }">
        <font-awesome-icon v-if="icon" class="m-auto" :icon="icon" />
    </div>
</template>

<script setup>
const props = defineProps({
    color: String,
    icon: String | null
})
</script>