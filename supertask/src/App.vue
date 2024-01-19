<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Subtasks from './components/Subtasks.vue'
import Editable from './components/Editable.vue';

let taskIndex = -1
let clickedIndex = ref(-1)

const tasks = ref([])

function newTask() {
  tasks.value.push({ id: ++taskIndex, name: 'New Task', subtasks: [] })
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
  const [ subtaskIndex, subtasks ] = [ args[0][0], args[0][1] ]

  subtasks.splice(subtaskIndex, 1)
  saveTasks()
}

function saveTasks() {
  console.log('tasks saved')
  const parsed = JSON.stringify(tasks.value)
  localStorage.setItem('tasks', parsed)
  console.log('saved', parsed)
}

function handleClick(index) {
  clickedIndex.value = index
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
});

onUnmounted(() => {
  saveTasks()
})

</script>

<template>
  <main>
    <div v-for="(task, index) in tasks" :key="index">
      <div class="container">
        <Editable class="task m-1" @click="handleClick(index)" @update="updateTaskName" :task-name="task.name"
          :task="task" />
        <div v-if="index === clickedIndex" class="right align-center">
          <button @click="saveTasks"><img id="button-img" src="./assets/check.svg"></button>
          <button @click="removeTask(task)"><img id="button-img" src="./assets/ex.svg"></button>
        </div>
      </div>
      <Subtasks @new-subtask="newSubtask(task)" @save-tasks="saveTasks" @remove-subtask="removeSubtask" :task="task"
        :subtasks="task.subtasks" />
    </div>
    <button @click="newTask"><img id="button-img" src="./assets/plus.svg"></button>
  </main>
</template>

<style scoped>
p {
  font-size: 2rem;
}

.task {
  font-size: 4rem;
  font-weight: 200;
  max-width: 60vw;
}
</style>
