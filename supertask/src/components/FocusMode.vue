<template>
    <div v-for="task in tasksNow">
        <p>{{ task.name }}</p>
        <p>For {{ getRemaining(task) }} more {{ units }}</p>
        <div>
            <p> {{ (task.subtasks && task.subtasks.length) ? task.subtasks[displayedIdx].name : '' }}
            </p>
            <button @click="rerollSubtask(task.subtasks.length)"
                :class="{ hidden: !task.subtasks.length }"><img id="button-img" src="../assets/die.svg"></button>
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
let units = 'hours'

setInterval(() => {
    now.value = new Date()
    tasksNow.value = getCurrentTasks()
}, 1000);

onMounted(() => tasksNow.value = getCurrentTasks())

function isHappeningNow(task) {
    const today = now.value.getDay()
    const time = HHMM(now.value);

    // console.log('today', today, 'task.days[thisDay]', task.days[today])
    // console.log('timeNow', currentTime, 'task.timeSpan.start', task.timeSpan.start, 'task.timeSpan.end', task.timeSpan.end)

    if (task.timeSpan.start <= task.timeSpan.end) {     // Doesn't go over midnight
        return task.days[today] && (task.timeSpan.start <= time && time <= task.timeSpan.end)
    } else {
        return (task.days[today] || task.days[today === 6 ? 0 : Math.min(today + 1, 6)]) && (task.timeSpan.start <= time || time <= task.timeSpan.end)
    }
}

function HHMM(date) {
    return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
}

function getCurrentTasks() {
    tasksNow = props.tasks.filter((t) => isHappeningNow(t))
}

function getRemaining(task) {
    let [hours, minutes] = [0, task.timeSpan.end.split(':')[1] - HHMM(now.value).split(':')[1]]

    if (task.timeSpan.start <= task.timeSpan.end) {     // Doesn't go over midnight
        hours = task.timeSpan.end.split(':')[0] - HHMM(now.value).split(':')[0]
    } else {
        hours = 24 - HHMM(now.value).split(':')[0] + Number(task.timeSpan.end.split(':')[0])
    }

    if (hours > 0) {
        units = 'hour' + (hours === 1 ? '' : 's')
        return hours
    } else {
        units = 'minute' + (minutes === 1 ? '' : 's')
        return minutes
    }
}

function rerollSubtask(length) {
    if (length < 2) {
        return
    }

    let random = displayedIdx.value

    while (random === displayedIdx.value) {
        random = Math.floor(Math.random() * length)
    }

    displayedIdx.value = random
}

</script>
