<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Subtasks from './components/Subtasks.vue'
import Editable from './components/Editable.vue';

let id = -1

const tasks = ref([])
const currentTaskRef = ref(null);

function newTask() {
  tasks.value.push({ id: ++id, name: 'New Task', subtasks: [] })
}

function newSubtask(task) {
  task.subtasks.push({ name: 'New subtask', done: false })
}

function removeTask(task) {
  tasks.value = tasks.value.filter((t) => t !== task)
  saveTasks()
}

function updateTaskName(...args) {    // Child function returns a new name and a target task reference
  args[0][1].name = args[0][0]        // targetTask.name = newName
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
      console.log(tasks.value)
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
      <div class="container">
        <Editable class="task" @update="updateTaskName" :task-name="task.name" :task="task"/>
        <div class="right">
          <button @click="saveTasks"><img id="button-img" src="./assets/check.svg"></button>
          <button @click="removeTask(task)"><img id="button-img" src="./assets/ex.svg"></button>
        </div>
      </div>
      <Subtasks @new-subtask="newSubtask(task)" @save-tasks="saveTasks" :name="task" :subtasks="task.subtasks" />
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

.right {
  position: fixed;
  align-self: center;
  right: 10vw;
}

@media (min-width: 1024px) {
  .right {
    position: fixed;
    align-self: center;
    right: 25vw;
  }
}
</style>
