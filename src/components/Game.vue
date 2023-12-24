<template>
    <div class="flex flex-col">
        <Navbar @clearBoard="clearGameBoard" @selectStart="selectStartPoint" @selectDestination="selectDestinationPoint"
            @startGame="startGame" @clearWalls="clearWalls" />
        <InfoBar />
        <div class="text-center p-3 bg-[#2C3D4F] text-white mb-3">
            {{ drawWall ? 'Click board to stop drawing wall' : 'Click board to start drawing wall' }}
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
import { bfs, dfs, aStar, dijkstra } from '@/algorithms';
import InfoBar from './InfoBar.vue';

const gameBoardRef = ref()
const selectStart = ref(false)
const selectDestination = ref(false)
const drawWall = ref(false)

const clearGameBoard = () => {
    gameBoardRef.value.reset()
}

const clearWalls = () => {
    gameBoardRef.value.clearWalls()
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
        gameBoardRef.value.visualizePath(dfs)
    else if (algorithm === 'Breadth First Search')
        gameBoardRef.value.visualizePath(bfs)
    else if (algorithm === 'Dijkstra')
        gameBoardRef.value.visualizePath(dijkstra)
    else if (algorithm === 'A*')
        gameBoardRef.value.visualizePath(aStar)
}

</script>