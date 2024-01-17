<script setup>
import { defineProps, onMounted, ref } from 'vue';

defineProps({
    name: String,
    timeStart: Number,
    timeEnd: Number,
    subtasks: Array,
})

defineEmits(['new-subtask', 'save-tasks'])

let open = ref(false)
let currentIdx = ref(0)

</script>

<template>
    <div class="container">
        <!-- <ul :class="{ hidden: !open }"> -->
        <button @click="open = !open">...</button>
        <div v-if="open">
            <ul>
                <li v-for="subtask in subtasks">
                    <form @submit.prevent="$emit('save-tasks')">
                        <input type="checkbox" v-model="subtask.done">
                        <div class="task" contenteditable="true" :class="{ done: subtask.done }">{{ subtask.name }}</div>
                        <button><img id="button-img" src="../assets/check.svg"></button>
                    </form>
                </li>
                <button @click="$emit('new-subtask')"><img id="button-img" src="../assets/plus.svg"></button>
            </ul>
        </div>
        <div class="container" v-else>
            <p> {{ (subtasks && subtasks.length) ? subtasks[currentIdx].name : '' }}</p>
            <button @click="randomIdx" :class="{ hidden: !subtasks.length }"><img id="button-img" src="../assets/die.svg"></button>
        </div>
    </div>
</template>

<style scoped>
li {
    list-style-type: none;
}

.task {
  font-size: 1.4rem;
  font-weight: 400;
  max-width: 50vw;
  word-wrap: break-word;
}

.done {
    opacity: 40%;
    text-decoration: line-through;
}
</style>
