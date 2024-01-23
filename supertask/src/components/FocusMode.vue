<template>
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


function isHappeningNow(task) {
    const timeNow = Date.now()
    return task.timeSpan[0] < timeNow && timeNow < task.timeSpan[1]
}

function getCurrentTasks() {
    console.log('tasks', props.tasks[0])
    console.log('tasks', props.tasks[0])
    // tasks.filter((t) => isHappeningNow(t))
}

getCurrentTasks()
</script>
