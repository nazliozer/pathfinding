<template>
    <div class="flex flex-col w-max mx-auto border">
        <div v-for="row, ridx in board" class="flex justify-center mx-auto" :key="ridx">
            <Square v-for="col, cidx in row" :key="cidx" @click="selectPoints(ridx, cidx)" @mouseover="drawWall(ridx, cidx)"
                :color="col.color" :icon="col.icon" />
        </div>
    </div>
</template>


<script setup>
import { sleep } from '@/helpers'
import { onMounted, reactive, ref } from "vue"
import Square from "./Square.vue";

const emit = defineEmits(['reset'])

const props = defineProps({
    cols: Number,
    rows: Number,
    drawWall: Boolean,
    selectStart: Boolean,
    selectDestination: Boolean
})

const start = ref(null)
const destination = ref(null)
const board = reactive([])
const isVisualizing = ref(false)

const createBoard = () => {
    for (let i = 0; i < props.rows; i++) {
        board[i] = []
        for (let j = 0; j < props.cols; j++) {
            board[i][j] = {
                visited: false,
                color: "white"
            }
        }
    }
}

const reset = () => {
    start.value = null
    destination.value = null
    createBoard()
}

const drawWall = (ridx, cidx) => {
    if (!props.drawWall) return
    if (!board[ridx][cidx].visited) {
        board[ridx][cidx].color = "#2C3E50"
        board[ridx][cidx].isWall = true
    }
}

const selectPoints = (ridx, cidx) => {
    if (props.selectStart && !start.value) {
        board[ridx][cidx] = {
            visited: false,
            icon: 'fa-solid fa-chevron-right'
        }
        start.value = { ridx: ridx, cidx: cidx }
    }
    if (props.selectDestination && !destination.value) {
        board[ridx][cidx] = {
            visited: false,
            icon: 'fa-solid fa-crosshairs'
        }
        destination.value = { ridx: ridx, cidx: cidx }
    }
    emit('reset')
}

const visualizePath = async (algorithm) => {
    if (isVisualizing.value) return
    if (!start.value || !destination.value) {
        alert('Please select start and dest.')
        return;
    }
    isVisualizing.value = true
    resetStates()
    const visited = algorithm(board, start.value.ridx, start.value.cidx, destination.value.ridx, destination.value.cidx)
    await drawVisiteds(visited)
    await drawPath()
    isVisualizing.value = false
}

const drawVisiteds = async (visited) => {
    if (!visited) return
    for (let i of visited) {
        board[i[0]][i[1]].color = '#31C48D'
        await sleep(10)
    }
}

const drawPath = async () => {
    let cur = board[destination.value.ridx][destination.value.cidx]
    if (!cur.prev) alert('Path not found')
    while (cur) {
        let prev = null
        cur.color = '#1C64F2'
        if (cur.prev) {
            prev = board[cur.prev[0]][cur.prev[1]]
        }
        cur = prev
        await sleep(10)
    }
}

const resetStates = () => {
    for (let row = 0; row < props.rows; row++) {
        for (let col = 0; col < props.cols; col++) {

            if (!board[row][col].isWall) {
                board[row][col].visited = false
                board[row][col].color = 'white'
            }
        }
    }
}

const clearWalls = () => {
    for (let row = 0; row < props.rows; row++) {
        for (let col = 0; col < props.cols; col++) {
            if (board[row][col].isWall) {
                board[row][col].isWall = false
                board[row][col].color = 'white'
            }
        }
    }
}

defineExpose({ reset, visualizePath, clearWalls })

onMounted(() => {
    createBoard()
})

</script>   