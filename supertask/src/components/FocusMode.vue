<template>
    <div v-for="task in tasksNow">
        <p class="task m-1">{{ task.name }}</p>
        <div class="container">
            <p class="subtask m-1"> {{ (task.subtasks && task.subtasks.length) ? task.subtasks[displayedIdx].name : '' }}</p>
            <button @click="rerollSubtask(task.subtasks.length)" class="align-center m-1 die" :class="{ hidden: !task.subtasks.length }"><img id="button-img" src="../assets/die.svg"></button>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'

const props = defineProps({
    tasks: Array
})

let now = ref(new Date())
let tasksNow = ref([])
const displayedIdx = ref(0)
const hidden = ref(false)

setInterval(() => {
    now.value = new Date()
    tasksNow.value = getCurrentTasks()
}, 1000);

onMounted(() => tasksNow.value = getCurrentTasks())

function isHappeningNow(task) {
    const today = now.value.getDay()
    console.log('today', today, 'task.days[thisDay]', task.days[today])
    const currentTime = now.value.getHours().toString().padStart(2, '0') + ':' + now.value.getMinutes().toString().padStart(2, '0');
    // console.log('timeNow', currentTime, 'task.timeSpan.start', task.timeSpan.start, 'task.timeSpan.end', task.timeSpan.end)
    return task.days[today] === true && (task.timeSpan.start <= currentTime && currentTime <= task.timeSpan.end)
}

function getCurrentTasks() {
    tasksNow = props.tasks.filter((t) => isHappeningNow(t))
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

</script>
