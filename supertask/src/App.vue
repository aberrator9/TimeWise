<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Subtasks from './components/Subtasks.vue'
import Editable from './components/Editable.vue';

let taskIdx = -1
let clickedIndex = ref(-1)

const tasks = ref([])

function newTask() {
  tasks.value.push({ id: ++taskIdx, name: 'New Task', subtasks: [] })
}

function newSubtask(task) {
  task.subtasks.push({ name: 'New subtask', done: false })
}

function removeTask(task) {  // 0: tasks ref; 1: subtask idx
  // if (args.length > 1) {
  //   args[0].subtasks.splice(args[1], 1)
  // }
    tasks.value = tasks.value.filter((t) => t !== task)
  saveTasks()
}

function updateTaskName(...args) {    // 0: newName; 1: targetTask
  args[0][1].name = args[0][0]        // targetTask.name = newName
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
      taskIdx = tasks.value.length
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
        <Editable class="task m-1" @click="handleClick(index)" @update="updateTaskName" :task-name="task.name" :task="task" />
        <div v-if="index === clickedIndex" class="right align-center">
          <button @click="saveTasks"><img id="button-img" src="./assets/check.svg"></button>
          <button @click="removeTask(task)"><img id="button-img" src="./assets/ex.svg"></button>
        </div>
      </div>
      <Subtasks @new-subtask="newSubtask(task)" @save-tasks="saveTasks" @remove-task="removeTask" :task="task"
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
