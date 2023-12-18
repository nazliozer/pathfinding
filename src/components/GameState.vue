<template>
    <div class="flex flex-col">
        <button @click="clearGameBoard">Clear Board</button>
        <button @click="selectStartPoint">Select Start : {{ selectStart }}</button>
        <button @click="selectDestinationPoint">Select Destination: {{ selectDestination }}</button>
        <GameBoard ref="gameBoardRef" :draw-wall="drawWall" :select-start="selectStart"
            :select-destination="selectDestination" @pointerdown="selectWall" @reset="reset" />
    </div>
</template>


<script setup>
import { ref } from 'vue';
import GameBoard from './GameBoard.vue';

const gameBoardRef = ref()

const selectStart = ref(false)
const selectDestination = ref(false)

const drawWall = ref(false)

const clearGameBoard = () => {
    gameBoardRef.value.reset()
}

const selectWall = () => {
    if (selectStart.value || selectDestination.value) return
    drawWall.value = !drawWall.value
}

const selectStartPoint = () => {
    if (selectDestination.value || drawWall.value) return
    selectStart.value = true
}

const selectDestinationPoint = () => {
    if (selectStart.value || drawWall.value) return
    selectDestination.value = true
}

const reset = () => {
    selectStart.value = false
    selectDestination.value = false
}

</script>