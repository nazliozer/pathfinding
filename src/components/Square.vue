<template>
    <div class="w-8 h-8 cursor-pointer border flex" :style="{ background: props.color }">
        <font-awesome-icon v-if="icon" class="m-auto" :icon="icon" />
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    color: String,
    icon: String | null
})
</script>