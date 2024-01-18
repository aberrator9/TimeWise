<script setup>

import { onMounted, ref } from 'vue'

const props = defineProps({
  taskName: String,
  task: Object
})
const emit = defineEmits(['update'])

const editableRef = ref(null)

onMounted(()=>{
    console.log(props.taskName)
})

</script>
  
<template>
    <div contenteditable="true" @blur="emit('update', [editableRef.textContent, task])" ref="editableRef">{{ props.taskName }}</div>
</template>

<style>
div {
    word-wrap: break-word;
}
</style>
