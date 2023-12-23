<template>
    <ul class="flex items-center justify-evenly w-full my-4">
        <li class="flex items-center justify-center space-x-2">
            <font-awesome-icon icon='fa-solid fa-chevron-right' />
            <p>Start Point</p>
        </li>
        <li class="flex items-center justify-center space-x-2">
            <font-awesome-icon icon='fa-solid fa-crosshairs' />
            <p>Destination Point</p>
        </li>
        <li class="flex items-center justify-center space-x-2">
            <Square color="#31C48D" />
            <p>Visited Node</p>
        </li>
        <li class="flex items-center justify-center space-x-2">
            <Square color="#2C3E50" />
            <p>Wall Node</p>
        </li>
        <li class="flex items-center justify-center space-x-2">
            <Square color="#1C64F2" />
            <p>Shortest-path Node</p>
        </li>
    </ul>
</template>

<script setup>
import Square from "./Square.vue";

</script>