<template>
    <div class="flex flex-col border">
        <div v-for="row, ridx in board" class="flex justify-center mx-auto" :key="ridx">
            <Square v-for="col, cidx in row" :key="cidx" @click="click(ridx, cidx)" @mouseover="mouseOver(ridx, cidx)"
                :color="col.color" :icon="col.icon" />
        </div>
    </div>
</template>


<script setup>
import { onMounted, reactive, ref } from "vue"
import Square from "./Square.vue";

const props = defineProps({
    drawWall: Boolean,
    selectStart: Boolean,
    selectDestination: Boolean
})

const emit = defineEmits(['reset'])

const NOT_VISITED = 0
const VISITED = 1
const WALL = 2
const START = 3
const FINISH = 4

const ROW = 16
const COL = 30

const start = ref(null)
const destination = ref(null)

const board = reactive([])

const createBoard = () => {
    for (let i = 0; i < ROW; i++) {
        board[i] = []
        for (let j = 0; j < COL; j++) {
            board[i][j] = {
                state: NOT_VISITED,
                color: "white"
            }
        }
    }
}

const reset = () => {
    createBoard()
}

const mouseOver = (ridx, cidx) => {
    if (!props.drawWall) return
    if (board[ridx][cidx].state === NOT_VISITED) {
        board[ridx][cidx].color = "#2C3E50"
        board[ridx][cidx].state = WALL
    }
}

const click = (ridx, cidx) => {
    if (props.selectStart && !start.value) {
        board[ridx][cidx] = {
            state: START,
            icon: 'fa-solid fa-chevron-right'
        }
        start.value = { ridx: ridx, cidx: cidx }
    }
    if (props.selectDestination && !destination.value) {
        board[ridx][cidx] = {
            state: FINISH,
            icon: 'fa-solid fa-crosshairs'
        }
        destination.value = { ridx: ridx, cidx: cidx }
    }
    emit('reset')
}

defineExpose({ reset })

onMounted(() => {
    createBoard()
})

</script>