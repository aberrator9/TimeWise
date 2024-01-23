<template>
  <main>
    <button class="flex right plus-task" @click="editMode = !editMode">{{ editMode ? 'Focus' : 'Edit' }}</button>
    <div v-if="editMode">
      <div v-for="(task, index) in tasks" :key="index">
        <div class="container">
          <div v-for="(day, index) in task.days">
            <button class="day" :class="{ inactive: !day }" @click="task.days[index] = !task.days[index]">{{ index }}</button>
          </div>
          <input type="time" name="start" v-model="task.timeSpan.start">
          <input type="time" name="end" v-model="task.timeSpan.end">
        </div>
        <div class="container" @mouseover="activeId = index" @mouseleave="activeId = -1">
          <div v-if="index === activeId" class="align-center">
            <RemoveButton @click="removeTask(task)" />
          </div>
          <Editable class="task m-1" @update="updateTaskName" :task-name="task.name" :task="task"
          ref="editable" />
          <div v-if="index === activeId" class="right align-center">
            <SaveButton @click="saveTasks()" />
            <button class="m-1" @click="expandedId = expandedId === task.id ? -1 : task.id">
                <svg id="button-img" width="800px" height="800px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="0" fill="none" width="20" height="20" /> <g> <path d="M5 10c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm12-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /> </g> </svg>
              </button>
            </div>
          </div>
          <Subtasks @new-subtask="newSubtask(task)" @save-tasks="saveTasks" @expand="expandedId = expandedId === task.id ? -1 : task.id" @retract="retract = expandedId = -1" @remove-subtask="removeSubtask" :task="task"
          :expanded-id="expandedId" />
        </div>
        <button @click="newTask"><img id="button-img" src="./assets/plus.svg"></button>
      </div>
      <div v-else>
        <FocusMode :tasks="tasks" />
      </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { uuid } from 'vue-uuid';
import FocusMode from './components/FocusMode.vue'
import Subtasks from './components/Subtasks.vue'
import Editable from './components/Editable.vue'
import SaveButton from './components/SaveButton.vue'
import RemoveButton from './components/RemoveButton.vue'

let activeId = ref(-1)
let expandedId = ref(-1)
let editable = ref(null)
const editMode = ref(true)

const tasks = ref([])

function newTask() {
  tasks.value.push({
    id: uuid.v1(), name: 'New Task', subtasks: [],
    days: { M: false, T: false, W: false, Th: false, F: false, S: false, Su: false },
    timeSpan: { start: '00:00 AM', end: '00:00 AM'}
  })
}

function removeTask(task) {
  tasks.value = tasks.value.filter((t) => t !== task)
  saveTasks()
}

function updateTaskName(...args) {    // 0: newName; 1: targetTask
  args[0][1].name = args[0][0]        // targetTask.name = newName
  saveTasks()
}

function newSubtask(task) {
  task.subtasks.push({ name: 'New subtask', done: false })
}

function removeSubtask(...args) {
  const [subtaskIndex, subtasks] = [args[0][0], args[0][1]]
  
  subtasks.splice(subtaskIndex, 1)
  saveTasks()
}

function saveTasks() {
  const parsed = JSON.stringify(tasks.value)
  localStorage.setItem('tasks', parsed)
}

onMounted(() => {
  const storedTasks = localStorage.getItem('tasks')
  if (storedTasks) {
    try {
      tasks.value = JSON.parse(storedTasks)
    } catch (e) {
      localStorage.removeItem('tasks').json
    }
  }
})

onUnmounted(() => {
  saveTasks()
})

</script>

<style scoped>
.task {
  font-size: 4rem;
  font-weight: 200;
  max-width: 60vw;
}</style>
