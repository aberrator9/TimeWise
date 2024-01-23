<template>
    {{ now }}
    <div v-for="task in tasksNow">
        <p class="task m-1">{{ task.name }}</p>
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'

const props = defineProps({
    expandedId: String,
    tasks: Array
})

let now = ref(new Date())
let tasksNow = ref([])

setInterval(() => {
    now.value = new Date()
    tasksNow.value = getCurrentTasks()
}, 1000);


function isHappeningNow(task) {
    const currentTime = now.value.getHours().toString().padStart(2, '0') + ':' + now.value.getMinutes().toString().padStart(2, '0');
    console.log('timeNow', currentTime, 'task.timeSpan.start', task.timeSpan.start, 'task.timeSpan.end', task.timeSpan.end)
    return task.timeSpan.start <= currentTime && currentTime <= task.timeSpan.end
}

function getCurrentTasks() {
    tasksNow = props.tasks.filter((t) => isHappeningNow(t))
    console.log('tasksNow', tasksNow)
}

</script>
