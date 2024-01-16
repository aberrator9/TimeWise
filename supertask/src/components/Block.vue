<script setup>
import { defineProps, ref } from 'vue';

defineProps({
    name: String,
    timeStart: Number,
    timeEnd: Number,
    subtasks: Array,
})

let open = ref(false)

</script>

<template>
    <div class="wrapper">
        <!-- <h1>{{ name }}</h1> -->
        <button @click="open = !open">...</button>
        <ul :class="{ hidden: !open }">
            <li v-for="subtask in subtasks">
                <input type="checkbox" v-model="subtask.done">
                <input type="text" :class="{ done: subtask.done }" v-model="subtask.name">
            </li>
            <button>+</button>
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

button {
    margin: 1rem;
    max-height: 100%;
    align-self: center;
}
</style>
