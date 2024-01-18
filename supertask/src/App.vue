<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Subtasks from './components/Subtasks.vue'
import Editable from './components/Editable.vue';

let taskIdx = -1

const tasks = ref([])

function newTask() {
  tasks.value.push({ id: ++taskIdx, name: 'New Task', subtasks: [] })
}

function newSubtask(task) {
  task.subtasks.push({ name: 'New subtask', done: false })
}

function removeTask(...args) {  // 0: tasks ref; 1: subtask idx
  if (args.length > 1) {
    args[0].subtasks.splice(args[1], 1)
  }
  else {
    tasks.value = tasks.value.filter((t) => t !== task)
  }
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

onMounted(() => {
  const storedTasks = localStorage.getItem('tasks')
  if (storedTasks) {
    try {
      tasks.value = JSON.parse(storedTasks)

      taskIdx = tasks.value.length
      console.log('taskIdx is', taskIdx)
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
        <Editable class="task m-1" @update="updateTaskName" :task-name="task.name" :task="task" />
        <div class="right">
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
