<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Block from './components/Block.vue';

let id = -1;

const tasks = ref([]);

function addTask() {
  tasks.value.push({ id: ++id, name: 'New Task', subtasks: [] });
}

function saveTasks() {
  console.log('tasks saved');
  const parsed = JSON.stringify(tasks.value);
  localStorage.setItem('tasks', parsed);
  console.log('saved', parsed);
}

onMounted(() => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    try {
      tasks.value = JSON.parse(storedTasks);
    } catch (e) {
      localStorage.removeItem('tasks');
    }
  }
});

onUnmounted(() => {
  saveTasks();
});
</script>

<template>
  <main>
    <div v-for="task in tasks" :key="task.id">
      <form @submit.prevent="saveTasks">
        <input v-model="task.name">
        <button><img id="check" src="./assets/check.svg"></button>
      </form>
      <Block :name="task.name" :subtasks="task.subtasks" />
    </div>
    <button @click="addTask">+</button>
  </main>
</template>

<style scoped>
input {
  font-size: 2rem;
}
#check {
  height: 35px;
  width: 35px;
}

@media (min-width: 1024px) {}
</style>
