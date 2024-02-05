<template>
    <div>
        <div v-for="(subtask, index) in task.subtasks" :key="subtask.id" class="mx-3 space-y-8">
            <div class="flex justify-between">
                <div class="flex items-start space-x-3">
                    <input type="checkbox" v-model="subtask.done" class="translate-y-2" />
                    <Editable @keydown.enter.prevent="onPressEnter" @focus="activeIdx = index" id="subtask"
                        :class="{ done: subtask.done }" @update="updateTaskName" :task-name="subtask.name"
                        :task="subtask" class=" w-40" />
                </div>
                <div v-show="index === activeIdx" class="flex">
                    <RemoveIcon @click="$emit('remove-subtask', [index, task.subtasks])" class="h-[1.75rem] w-[1.75rem]" />
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
