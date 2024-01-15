<script setup>
import { ref } from 'vue'
import Block from './components/Block.vue'

let id = -1;

let supertasks = ref([
  {
    id: ++id,
    txt: `supertask text ${id}`,
  },
  {
    id: ++id,
    txt: `supertask text ${id}`,
  },
])

function getTasks() {
  // supertasks = localStorage.supertasks;
}
getTasks(); 

</script>


<template>
  <main>
    <div v-for="task in supertasks">
      <Block :txt="task.txt" />
    </div>
  </main>
</template>

<style scoped>
@media (min-width: 1024px) {
}
</style>
