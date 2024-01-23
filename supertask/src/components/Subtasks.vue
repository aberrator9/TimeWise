<template>
    <div class="container">
        <div v-if="expandedId === task.id">
            <div v-for="(subtask, index) in task.subtasks" :key="subtask.id">
                <div class="container" @mouseover="activeIndex = index" @mouseleave="activeIndex = -1">
                    <input type="checkbox" v-model="subtask.done" />
                    <Editable class="subtask m-1" :class="{ done: subtask.done }"
                        @update="updateTaskName" :task-name="subtask.name" :task="subtask" ref="editable" />
                        <div class="align-center" v-if="index === activeIndex">
                            <SaveButton @click="$emit('save-tasks')" />
                            <RemoveButton @click="$emit('remove-subtask', [index, task.subtasks])" />
                        </div>
                </div>
            </div>
            <button @click="$emit('new-subtask')"><p class="plus-task">+ Subtask</p></button>
        </div>
        <div class="container" v-else>
            <p class="subtask m-1" @click="$emit('expand')"> {{ (task.subtasks && task.subtasks.length) ? task.subtasks.length + ' subtasks' : '' }}</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import Editable from './Editable.vue'
import SaveButton from './SaveButton.vue'
import RemoveButton from './RemoveButton.vue'

defineProps({
    task: Object,
    expandedId: String
})

defineEmits(['new-subtask', 'save-tasks', 'remove-subtask', 'expand', 'retract'])

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
