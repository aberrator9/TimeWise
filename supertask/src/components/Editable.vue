<template>
  <div @blur="emit('update', [editable.textContent, task])" contenteditable="true" ref="editable">{{ props.taskName }}</div>
</template>

<script setup>

import { onMounted, ref } from 'vue'

const props = defineProps({
  taskName: String,
  task: Object
})
const emit = defineEmits(['update'])

const editable = ref(null)

</script>

<style>
div {
    word-wrap: break-word;
}
</style>
