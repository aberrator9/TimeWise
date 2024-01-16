<script setup>
import { defineProps, ref } from 'vue';

defineProps({
    name: String,
    timeStart: Number,
    timeEnd: Number,
    subtasks: Array,
})

defineEmits(['new-subtask'])

let open = ref(false)

</script>

<template>
    <div class="wrapper">
        <button @click="open = !open">...</button>
        <ul :class="{ hidden: !open }">
            <li v-for="subtask in subtasks">
                <input type="checkbox" v-model="subtask.done">
                <input type="text" :class="{ done: subtask.done }" v-model="subtask.name">
            </li>
            <button @click="$emit('new-subtask')">+</button>
        </ul>
    </div>
</template>

<style scoped>
input {
    font-size: 1rem;
}

button {
    margin: 1rem;
    max-height: 100%;
    align-self: center;
}

.wrapper {
    display: flex;
}

.done {
    opacity: 40%;
    text-decoration: line-through;
}

.hidden {
    display: none;
}</style>
