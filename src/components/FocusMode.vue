<template>
    <div v-if="!showNext" v-for="task in tasksNow">
        <div
            class="mt-8 p-5 m-4 mb-4 place-items-center min-h-24 text-lg w-[17.5rem] border-2 border-red-400 bg-zinc-800 shadow-[8px_8px_0px_rgba(225,90,65,0.4)] hover:shadow-[10px_10px_0px_rgba(225,90,65,0.6)]rounded-sm">
            <Editable class="pointer-events-none text-2xl font-bold justify-start mt-2 ml-1" :task-name="task.name"
                :task="task" readonly />
            <div class="flex justify-between">
                <p class="my-2 ml-4"> {{ (task.subtasks && task.subtasks.length) ? task.subtasks[task.subIdx].name : '' }}
                </p>
                <button class="end-0 block" @click="rerollSubtask(task)" :class="{ hidden: task.subtasks.length <= 1 }">
                    <svg width="36px" height="36px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink">
                        <title>random-filled</title>
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="icon" fill="#f87171" transform="translate(46.976875, 46.976875)">
                                <path
                                    d="M379.689791,38.3564581 L379.689791,379.689791 L38.3564581,379.689791 L38.3564581,38.3564581 L379.689791,38.3564581 Z M283.689791,251.689791 C266.016679,251.689791 251.689791,266.016679 251.689791,283.689791 C251.689791,301.362903 266.016679,315.689791 283.689791,315.689791 C301.362903,315.689791 315.689791,301.362903 315.689791,283.689791 C315.689791,266.016679 301.362903,251.689791 283.689791,251.689791 Z M209.023125,177.023125 C191.350013,177.023125 177.023125,191.350013 177.023125,209.023125 C177.023125,226.696237 191.350013,241.023125 209.023125,241.023125 C226.696237,241.023125 241.023125,226.696237 241.023125,209.023125 C241.023125,191.350013 226.696237,177.023125 209.023125,177.023125 Z M134.356458,102.356458 C116.683346,102.356458 102.356458,116.683346 102.356458,134.356458 C102.356458,152.02957 116.683346,166.356458 134.356458,166.356458 C152.02957,166.356458 166.356458,152.02957 166.356458,134.356458 C166.356458,116.683346 152.02957,102.356458 134.356458,102.356458 Z"
                                    id="Combined-Shape"
                                    transform="translate(209.023125, 209.023125) rotate(90.000000) translate(-209.023125, -209.023125) ">
                                </path>
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
            <p class="ml-3 mt-4 mb-2">For {{ timeLeft(task) }} more {{ units }}</p>
            <div class="w-[90%] h-0.5 my-1 ml-[5%]">
                <div class="shadow w-full bg-zinc-700 h-0.5">
                    <div class="bg-red-400 leading-none text-center text-white h-0.5"
                        :style="{ width: `${percentComplete(task)}%` }"></div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <p class="text-center text-2xl pb-5">Up next...</p>
        <div
            class="p-5 m-4 mb-4 place-items-center min-h-24 text-lg w-[17.5rem] border-2 border-red-400 bg-zinc-800 shadow-[8px_8px_0px_rgba(225,90,65,0.4)] hover:shadow-[10px_10px_0px_rgba(225,90,65,0.6)] rounded-sm">
            <div class="text-2xl font-bold justify-start mt-2 ml-1">{{ next ? next.task : 'Nothing left to do 💀' }}</div>
            <p class="my-2 ml-4">{{ next ? (isTomorrow(next.day) ? `Tomorrow at ${next.start}` :
                `${dayAliases[next.day].long} at ${next.start}`) : '' }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted, onUnmounted, isReactive } from 'vue'
import Editable from './Editable.vue';

const props = defineProps({
    tasks: Array,
    dayAliases: Object
})

const now = ref(new Date())
let tasksNow = ref([])
const next = ref({ task: '', start: '', day: 0 })
const showNext = ref(false)

let units = 'hours'
let today = 0


onMounted(() => {
    now.value = new Date()
    tasksNow.value = currentTasks()
    next.value = getNextTask()
    console.log('next after assignment', next)
})

const getNextInterval = setInterval(() => {
    now.value = new Date()
    tasksNow.value = currentTasks()
    next.value = getNextTask()
    console.log('next after assignment', next)
}, 1000);

onUnmounted(() => {
    clearInterval(getNextInterval)
})


function isTomorrow(day) {
    return day - today === 1 || day - today === -6
}

function HHMM(date) {
    return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
}

function convertTo12Hr(timeStr) {
    const split = timeStr.split(':')
    const hrs = split[0] > 12 ? split[0] - 12 : split[0]
    const ampm = split[0] >= 12 ? 'PM' : 'AM'

    return `${hrs}:${split[1]} ${ampm}`
}

function isValid(timeSpan) {
    return timeSpan.start !== '-1' && timeSpan.end !== '-1' && timeSpan.days.some((day) => day === true)
}

function isHappeningNow(timeSpan) {
    today = now.value.getDay()
    const time = HHMM(now.value);

    if (timeSpan.start <= timeSpan.end) {     // Doesn't go over midnight
        return timeSpan.days[today] && (timeSpan.start <= time && time <= timeSpan.end)
    } else {
        return (timeSpan.days[today] || timeSpan.days[today === 6 ? 0 : today + 1, 6]) && (timeSpan.start <= time || time <= timeSpan.end)
    }
}

function lastEndTimeSpanHappeningNow(task) {
    return task.timeSpans
        .filter((x) => isHappeningNow(x))
        .sort((a, b) => a.end - b.end)[0]
}

function currentTasks() {
    tasksNow = props.tasks
        .filter((task) => task.timeSpans.some((time) => isValid(time) && isHappeningNow(time)))
    showNext.value = tasksNow.length <= 0
}

function getNextTask() {
    const tasksFuture = props.tasks
        .filter((task) => task.timeSpans.some((time) => isValid(time) && !isHappeningNow(time)))

    if (tasksFuture.length <= 0) {
        return
    }

    let day = today
    let result = undefined

    while (result === undefined) {
        day = day === 6 ? 0 : day + 1

        const tasksToday = tasksFuture
            .filter((t) => t.timeSpans.some((span) => span.days[day] === true))

            console.log('tasksToday', tasksToday)

        let timeSpansToday = [];
        for (let t = 0; t < tasksToday.length; t++) {
            for (let s = 0; s < tasksToday[t].timeSpans.length; s++) {
                if(tasksToday[t].timeSpans[s].days[day] === true) {
                    timeSpansToday.push([tasksToday[t].name, tasksToday[t].timeSpans[s].start]);
                }
            }
        }

        timeSpansToday.sort();
        result = timeSpansToday[0]
    }

    return { task: result[0], start: convertTo12Hr(result[1]), day: day }
}

function timeLeft(task) {
    const lastEndTimeSpan = lastEndTimeSpanHappeningNow(task)

    const endSplit = lastEndTimeSpan.end.split(':')
    const nowSplit = HHMM(now.value).split(':')

    let [hours, minutes] = [0, 0]

    if (lastEndTimeSpan.start <= lastEndTimeSpan.end) {   // Doesn't go past midnight
        hours = endSplit[0] - nowSplit[0]
    } else {
        hours = 24 - nowSplit[0] + Number(endSplit[0])
    }

    if (nowSplit[1] <= endSplit[1]) {               // Doesn't go past the top of the hour
        minutes = endSplit[1] - nowSplit[1]
    } else {
        minutes = 60 - nowSplit[1] + Number(endSplit[1])
    }

    if (hours > 1) {
        units = 'hour' + (hours === 1 ? '' : 's')
        return hours
    } else {
        units = 'minute' + (minutes === 1 ? '' : 's')
        return minutes
    }
}

function percentComplete(task) {
    const nowSplit = HHMM(now.value).split(':')

    const lastEndTimeSpan = lastEndTimeSpanHappeningNow(task)
    const startSplit = lastEndTimeSpan.start.split(':')
    const endSplit = lastEndTimeSpan.end.split(':')

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
