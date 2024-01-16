<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Block from './components/Block.vue'

let id = -1;

const tasks = ref([
  // {
  //   id: ++id,
  //   name: `Learn`,
  //   subtasks: [
  //     { name: 'REST APIs', done: false },
  //     { name: 'React', done: false },
  //     { name: 'jQuery', done: false }
  //   ]
  // },
  // {
  //   id: ++id,
  //   name: `Apply to jobs`,
  // },
  // {
  //   id: ++id,
  //   name: `Learn`,
  //   subtasks: [
  //     { name: 'REST APIs', done: false },
  //     { name: 'React', done: false },
  //     { name: 'jQuery', done: false }
  //   ]
  // },
])

function addTask() {
  // if (tasks.value.some(x => x.name == 'New Task')) {
  //   return
  // }

  tasks.value.push({ id: ++id, name: 'New Task', subtasks: [] })
}

function saveTasks() {
  console.log('tasks saved')
  const parsed = JSON.stringify(tasks)
  localStorage.setItem('tasks', parsed)

  console.log('saved', parsed)
}

onMounted(() => {
  if (localStorage.getItem('tasks')) {
    try {
      tasks = JSON.parse(localStorage.getItem('tasks'))
      } catch(e) {
        console.log('Could not load from local storage')
        // localStorage.removeItem('tasks')
      }
    }
  })

  onUnmounted(() => {
  saveTasks();
});

</script>


<template>
  <main>
    <div v-for="task in tasks">
      <form @submit.prevent="saveTasks">
        <input v-model="task.name">
        <button>Save Task</button>
      </form>
      <Block :name="task.name" :subtasks="task.subtasks" />
    </div>
    <!-- id < 0 ? 'Add your first task' :  -->
    <button @click="addTask">{{ '+' }}</button>
  </main>
</template>

<style scoped>
input {
  font-size: 2rem;
}

@media (min-width: 1024px) {}
</style>
