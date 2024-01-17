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
let currentSubtask = 'current'

onMounted(() => {
    // currentSubtask = (this.subtasks && this.subtasks.length) ? this.subtasks[0].name: ''
})

</script>

<template>
    <div class="wrapper">
        <!-- <ul :class="{ hidden: !open }"> -->
            <button @click="open = !open">...</button>
            <div v-if="open">
                <ul>
                    <li v-for="subtask in subtasks">
                        <form @submit.prevent="$emit('save-tasks')">
                            <input type="checkbox" v-model="subtask.done">
                            <input type="text" :class="{ done: subtask.done }" v-model="subtask.name">
                        <button><img id="button-img" src="../assets/check.svg"></button>
                    </form>
                </li>
                <button @click="$emit('new-subtask')"><img id="button-img" src="../assets/plus.svg"></button>
            </ul>
        </div>
        <div v-else>
            <p> {{ (subtasks && subtasks.length) ? subtasks[subtasks.length - 1].name : '' }}</p>
        </div>
    </div>
</template>

<style scoped>
input {
    font-size: 1rem;
}

button {
    width: 30px;
    height: 30px;
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
}
</style>
