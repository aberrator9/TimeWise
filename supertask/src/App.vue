<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Subtasks from './components/Subtasks.vue'

let id = -1

const tasks = ref([])

function newTask() {
  tasks.value.push({ id: ++id, name: 'New Task', subtasks: [] })
}

function newSubtask(task){
  console.log('new subtask requested')
  task.subtasks.push({name: 'New subtask', done: false})
}

function removeTask(task) {
  tasks.value = tasks.value.filter((t) => t !== task)
  saveTasks()
}

function saveTasks() {
  console.log('tasks saved')
  const parsed = JSON.stringify(tasks.value)
  localStorage.setItem('tasks', parsed)
  console.log('saved', parsed)
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
    <div v-for="task in tasks" :key="task.id">
      <form @submit.prevent="saveTasks">
        <input v-model="task.name">
        <button><img id="button-img" src="./assets/check.svg"></button>
        <button @click="removeTask(task)"><img id="button-img" src="./assets/ex.svg"></button>
      </form>
      <Subtasks @new-subtask="newSubtask(task)" @save-tasks="saveTasks" :name="task.name" :subtasks="task.subtasks" />
    </div>
    <button @click="newTask"><img id="button-img" src="./assets/plus.svg"></button>
  </main>
</template>

<style scoped>
input {
  font-size: 2rem;
}

#button-img {
  height: 30px;
  width: 30px;
}

@media (min-width: 1024px) {}</style>
