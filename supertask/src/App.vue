<script setup>
import { ref, onMounted } from 'vue'
import Block from './components/Block.vue'

let id = -1;

let supertasks = ref([
  {
    id: ++id,
    name: `Learn`,
    subtasks: [
      { name: 'REST APIs', done: false },
      { name: 'React', done: false },
      { name: 'jQuery', done: false }
    ]
  },
  {
    id: ++id,
    name: `Apply to jobs`,
  },
  {
    id: ++id,
    name: `Learn`,
    subtasks: [
      { name: 'REST APIs', done: false },
      { name: 'React', done: false },
      { name: 'jQuery', done: false }
    ]
  },
])

onMounted({
})

</script>


<template>
  <main>
    <div v-for="task in supertasks">
      <Block :name="task.name" :subtasks="task.subtasks" />
    </div>
  </main>
</template>

<style scoped>
@media (min-width: 1024px) {}
</style>
