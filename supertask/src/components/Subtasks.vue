<template>
    <div>
        <div class="mt-6">
            <div v-for="(subtask, index) in task.subtasks" :key="subtask.id">
                <div class="inline-flex space-x-2">
                    <input type="checkbox" v-model="subtask.done" />
                    <Editable @keydown.enter.prevent="onPressEnter" @focus="activeIdx = index" id="subtask"
                        :class="{ done: subtask.done }" @update="updateTaskName" :task-name="subtask.name"
                        :task="subtask" />
                    <span v-if="index === activeIdx">
                        <RemoveIcon @click="$emit('remove-subtask', [index, task.subtasks])" />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import Editable from './Editable.vue'
import RemoveIcon from './icons/RemoveIcon.vue'

defineProps({
    task: Object,
})

defineEmits(['remove-subtask'])

let activeIdx = ref(-1)

function onPressEnter(e) {
    activeIdx.value = -1
    e.target.blur()
}

function updateTaskName(...args) {  // Child function returns a new name and a target task reference
    args[0][1].name = args[0][0]    // targetTask.name = newName
}
</script>
