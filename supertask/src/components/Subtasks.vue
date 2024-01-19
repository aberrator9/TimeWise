<script setup>
import { computed, defineProps, reactive, ref } from 'vue';
import Editable from './Editable.vue';

defineProps({
    task: Object,
    timeStart: Number,
    timeEnd: Number,
    subtasks: Array,
})

defineEmits(['new-subtask', 'save-tasks', 'remove-subtask'])

const displayedIdx = ref(0)
const open = ref(false)

const editable = ref(null)
let clickedIndex = ref(-1)

function updateTaskName(...args) {  // Child function returns a new name and a target task reference
    args[0][1].name = args[0][0]    // targetTask.name = newName
}

function rerollSubtask(length){
    if (length < 2) {
        return
    }

    let random = displayedIdx.value

    while(random === displayedIdx.value) {
        random = Math.floor(Math.random() * length)
    }

    displayedIdx.value = random
}

function handleClick(index) {
    clickedIndex.value = index
}

</script>

<template>
    <div class="container">
        <button class="align-center m-1" @click="open = !open"><img id="button-img" src="../assets/expand.svg"></button>
        <div v-if="open">
            <div v-for="(subtask, index) in subtasks" :key="subtask.id">
                <div class="container">
                    <input type="checkbox" v-model="subtask.done" />
                    <Editable class="subtask m-1" :class="{ done: subtask.done }" @click="handleClick(index)"
                        @update="updateTaskName" :task-name="subtask.name" :task="subtask" ref="editable" />
                        <div class="align-center" v-if="index === clickedIndex">
                            <button :class="{ hidden: clickedIndex != index }" @click="$emit('save-tasks')"><img id="button-img" src="../assets/check.svg"></button>
                            <button @click="$emit('remove-subtask', [index, subtasks])"><img id="button-img" src="../assets/ex.svg"></button>
                        </div>
                </div>
            </div>
            <button @click="$emit('new-subtask')"><img id="button-img" src="../assets/plus.svg"></button>
        </div>
        <div class="container" v-else>
            <p class="subtask m-1" @click="open = true"> {{ (subtasks && subtasks.length) ? subtasks[displayedIdx].name : '' }}</p>
            <button @click="rerollSubtask(subtasks.length)" class="align-center m-1" :class="{ hidden: !subtasks.length }"><img id="button-img"
                    src="../assets/die.svg"></button>
        </div>
    </div>
</template>

<style scoped>
li {
    list-style-type: none;
}

.subtask {
    font-size: 2rem;
    font-weight: 600;
    max-width: 50vw;
}

.done {
    opacity: 40%;
    text-decoration: line-through;
}</style>
