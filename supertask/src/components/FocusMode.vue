<template>
    <div v-for="task in tasksNow">
        <div class="mt-8 p-5 m-4 mb-4 place-items-center min-h-24 text-lg w-[17.5rem] border-2 border-red-400 bg-zinc-800 shadow-[8px_8px_0px_rgba(225,90,65,0.4)] hover:shadow-[10px_10px_0px_rgba(225,90,65,0.6)] transition-all rounded-sm">
            <Editable class="pointer-events-none text-2xl font-bold justify-start mt-2 ml-1" :task-name="task.name"
                :task="task" readonly />
            <div class="flex justify-between">
                <p class="my-2 ml-4"> {{ (task.subtasks && task.subtasks.length) ? task.subtasks[task.subIdx].name : '' }}
                </p>
                <button class="end-0 block" @click="rerollSubtask(task)"
                    :class="{ hidden: task.subtasks.length <= 1 }">
                    <svg width="36px" height="36px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>random-filled</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="icon" fill="#f87171" transform="translate(46.976875, 46.976875)"> <path d="M379.689791,38.3564581 L379.689791,379.689791 L38.3564581,379.689791 L38.3564581,38.3564581 L379.689791,38.3564581 Z M283.689791,251.689791 C266.016679,251.689791 251.689791,266.016679 251.689791,283.689791 C251.689791,301.362903 266.016679,315.689791 283.689791,315.689791 C301.362903,315.689791 315.689791,301.362903 315.689791,283.689791 C315.689791,266.016679 301.362903,251.689791 283.689791,251.689791 Z M209.023125,177.023125 C191.350013,177.023125 177.023125,191.350013 177.023125,209.023125 C177.023125,226.696237 191.350013,241.023125 209.023125,241.023125 C226.696237,241.023125 241.023125,226.696237 241.023125,209.023125 C241.023125,191.350013 226.696237,177.023125 209.023125,177.023125 Z M134.356458,102.356458 C116.683346,102.356458 102.356458,116.683346 102.356458,134.356458 C102.356458,152.02957 116.683346,166.356458 134.356458,166.356458 C152.02957,166.356458 166.356458,152.02957 166.356458,134.356458 C166.356458,116.683346 152.02957,102.356458 134.356458,102.356458 Z" id="Combined-Shape" transform="translate(209.023125, 209.023125) rotate(90.000000) translate(-209.023125, -209.023125) "> </path> </g> </g> </svg>
                </button>
            </div>
            <p class="ml-2 mt-6 mb-3">For {{ timeLeft(task) }} more {{ units }}</p>
            <div class="w-[90%] h-0.5 my-1 ml-[5%]">
                <div class="shadow w-full bg-zinc-700 h-0.5">
                    <div class="bg-red-400 leading-none text-center text-white h-0.5" :style="{ width: getPercentComplete(task) + '%' }"></div>
                </div>
            </div>
        </div>
    </div>

        <div class="mt-8 p-5 m-4 mb-4 place-items-center min-h-24 text-lg w-[17.5rem] border-2 border-red-400 bg-zinc-800 shadow-[8px_8px_0px_rgba(225,90,65,0.4)] hover:shadow-[10px_10px_0px_rgba(225,90,65,0.6)] transition-all rounded-sm">
            <Editable class="pointer-events-none text-2xl font-bold justify-start mt-2 ml-1" :task-name="task.name"
                :task="task" readonly />
            <div class="flex justify-between">
                <p class="my-2 ml-4"> {{ (task.subtasks && task.subtasks.length) ? task.subtasks[task.subIdx].name : '' }}
                </p>
                <button class="end-0 block" @click="rerollSubtask(task)"
                    :class="{ hidden: task.subtasks.length <= 1 }">
                    <svg width="36px" height="36px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>random-filled</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="icon" fill="#f87171" transform="translate(46.976875, 46.976875)"> <path d="M379.689791,38.3564581 L379.689791,379.689791 L38.3564581,379.689791 L38.3564581,38.3564581 L379.689791,38.3564581 Z M283.689791,251.689791 C266.016679,251.689791 251.689791,266.016679 251.689791,283.689791 C251.689791,301.362903 266.016679,315.689791 283.689791,315.689791 C301.362903,315.689791 315.689791,301.362903 315.689791,283.689791 C315.689791,266.016679 301.362903,251.689791 283.689791,251.689791 Z M209.023125,177.023125 C191.350013,177.023125 177.023125,191.350013 177.023125,209.023125 C177.023125,226.696237 191.350013,241.023125 209.023125,241.023125 C226.696237,241.023125 241.023125,226.696237 241.023125,209.023125 C241.023125,191.350013 226.696237,177.023125 209.023125,177.023125 Z M134.356458,102.356458 C116.683346,102.356458 102.356458,116.683346 102.356458,134.356458 C102.356458,152.02957 116.683346,166.356458 134.356458,166.356458 C152.02957,166.356458 166.356458,152.02957 166.356458,134.356458 C166.356458,116.683346 152.02957,102.356458 134.356458,102.356458 Z" id="Combined-Shape" transform="translate(209.023125, 209.023125) rotate(90.000000) translate(-209.023125, -209.023125) "> </path> </g> </g> </svg>
                </button>
            </div>
            <p class="ml-2 mt-6 mb-3">For {{ timeUntil(task) }} more {{ units }}</p>
        </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'
import Editable from './Editable.vue';

const props = defineProps({
    tasks: Array
})

let now = ref(new Date())
let tasksNow = ref([])
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

function timeLeft(task) {
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

function getPercentComplete(task) {
    const nowSplit = HHMM(now.value).split(':')
    const startSplit = task.timeSpan.start.split(':')
    const endSplit = task.timeSpan.end.split(':')

    const nowMinutes = nowSplit[0] * 60 + nowSplit[1]
    const startMinutes = startSplit[0] * 60 + startSplit[1]
    const endMinutes = endSplit[0] * 60 + endSplit[1]

    return (1 - (endMinutes - nowMinutes) / (endMinutes - startMinutes)) * 100
}

function rerollSubtask(task) {
    if (task.subtasks.length < 2) {
        return
    }

    let random = task.subIdx

    while (random === task.subIdx) {
        random = Math.floor(Math.random() * task.subtasks.length)
    }

    task.subIdx = random
}

</script>
