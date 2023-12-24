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
            <Square :color="VISITED" />
            <p>Visited Node</p>
        </li>
        <li class="flex items-center justify-center space-x-2">
            <Square :color="WALL" />
            <p>Wall Node</p>
        </li>
        <li class="flex items-center justify-center space-x-2">
            <Square :color="PATH" />
            <p>Shortest-path Node</p>
        </li>
    </ul>
</template>

<script setup>
import Square from "./Square.vue";
import { WALL, VISITED, PATH } from "@/constants";
</script>