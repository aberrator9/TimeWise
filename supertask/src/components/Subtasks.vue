<script setup>
import { defineProps, ref } from 'vue';
import Editable from './Editable.vue';

defineProps({
    task: Object,
    timeStart: Number,
    timeEnd: Number,
    subtasks: Array,
})

defineEmits(['new-subtask', 'save-tasks', 'remove-task'])

const open = ref(false)
const displayedIdx = ref(0)

function updateTaskName(...args) {    // Child function returns a new name and a target task reference
  args[0][1].name = args[0][0]        // targetTask.name = newName
}

</script>

<template>
    <div class="container">
        <button @click="open = !open">...</button>
        <div v-if="open">
            <div v-for="subtask in subtasks">
                <!-- <form @submit.prevent="$emit('save-tasks')"> -->
                    <div class="container">
                        <input type="checkbox" v-model="subtask.done" />
                        <Editable class="subtask m-1" :class="{ done: subtask.done }" @update="updateTaskName" :task-name="subtask.name" :task="subtask" />
                        <button @click="$emit('save-tasks')"><img id="button-img" src="../assets/check.svg"></button>
                        <button @click="$emit('remove-task', [prop.task, subtask.id])"><img id="button-img" src="../assets/ex.svg"></button>
                    </div>
                    <!-- </form> -->
            </div>
            <button @click="$emit('new-subtask')"><img id="button-img" src="../assets/plus.svg"></button>
        </div>
        <div class="container" v-else>
            <p> {{ (subtasks && subtasks.length) ? subtasks[displayedIdx].name : '' }}</p>
            <button @click="randomIdx" :class="{ hidden: !subtasks.length }"><img id="button-img"
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
}
</style>
