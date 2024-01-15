<script setup>
import { ref, onMounted } from 'vue'
import Block from './components/Block.vue'

let id = -1;

let supertasks = ref([
  {
    id: ++id,
    txt: `supertask text ${id}`,
  },
])

onMounted({
  supertasks: localStorage.supertasks
})

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
