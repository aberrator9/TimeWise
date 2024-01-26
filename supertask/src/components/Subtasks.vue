<template>
    <div>
        <div class="mt-6">
            <div v-for="(subtask, index) in task.subtasks" :key="subtask.id">
                <div class="inline-flex space-x-2">
                    <input type="checkbox" v-model="subtask.done" />
                    <Editable @focus="activeIndex = index" :class="{ done: subtask.done }"
                        @update="updateTaskName" :task-name="subtask.name" :task="subtask" ref="editable" />
                        <span v-if="index === activeIndex">
                            <RemoveButton @click="$emit('remove-subtask', [index, task.subtasks])" />
                        </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import Editable from './Editable.vue'
import RemoveButton from './RemoveButton.vue'

defineProps({
    task: Object,
})

defineEmits(['remove-subtask'])

const editable = ref(null)
let activeIndex = ref(-1)

function updateTaskName(...args) {  // Child function returns a new name and a target task reference
    args[0][1].name = args[0][0]    // targetTask.name = newName
}

</script>

<style scoped>
li {
    list-style-type: none;
}

</style>
