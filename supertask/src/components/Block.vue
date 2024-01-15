<script setup>
import { defineProps, ref } from 'vue';

defineProps({
    name: '',
    timeStart: -1,
    timeEnd: -1,
    subtasks: [],
})

let open = ref(false)

function addSubtask() {

}

function removeSubtask() {

}

function newSubtask() {
    this.subtasks.push({ name: '', done: false })
}

</script>

<template>
    <div class="wrapper">
        <h2>{{ name }}</h2>
        <button @click="open = !open">+</button>
        <ul :class="{ hidden: !open }">
            <li @click="editable = !editable" v-for="subtask in subtasks">
                <input type="checkbox" v-model="subtask.done">
                <!-- <span :class="{ done: subtask.done, hidden: !open }" type="textbox">{{ subtask.name }}</span> -->
                <input :class="{ done: subtask.done }" type="textbox" v-model="subtask.name">
            </li>
            <button @click="newSubtask">+</button>
        </ul>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
}

.block {
    font-size: 1.5rem;
    background-color: var(--color-02);
    /* padding: 8rem 20rem; */
    margin: 1rem 2rem;
    border-radius: 10px;
}

.done {
    opacity: 40%;
    text-decoration: line-through;
}

.hidden {
    display: none;
}

input {
    background-color: transparent;
    border-color: transparent;
    color: var(--color-text);
}

button {
    margin: 1rem;
    max-height: 100%;
    align-self: center;
}
</style>
