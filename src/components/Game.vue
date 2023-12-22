<template>
    <div class="flex flex-col">
        <Navbar @clearBoard="clearGameBoard" @selectStart="selectStartPoint" @selectDestination="selectDestinationPoint"
            @startGame="startGame" />
        <div class="text-center">{{ drawWall ? 'Click board to stop drawing wall' : 'Click board to start drawing wall' }}
        </div>
        <GameBoard ref="gameBoardRef" :rows="ROW" :cols="COL" :draw-wall="drawWall" :select-start="selectStart"
            :select-destination="selectDestination" @pointerdown="selectWall" @reset="reset" />
    </div>
</template>


<script setup>
import { ref } from 'vue';
import GameBoard from './GameBoard.vue';
import Navbar from './Navbar.vue'
import { ROW, COL } from '@/constants.js'
import { bfs, dfsR } from '@/algorithms';

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

const startGame = (algorithm) => {
    if (algorithm === 'Depth First Search')
        gameBoardRef.value.visualizePath(dfsR)
    else if (algorithm === 'Breadth First Search')
        gameBoardRef.value.visualizePath(bfs)
}

</script>