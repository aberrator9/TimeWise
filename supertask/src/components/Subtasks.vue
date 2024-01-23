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
            <button @click="$emit('new-subtask')"><p class="plus-task">+ subtask</p></button>
        </div>
        <div class="container" v-else>
            <p class="subtask m-1" @click="$emit('expand')"> {{ (task.subtasks && task.subtasks.length) ? task.subtasks[displayedIdx].name : '' }}</p>
            <button @click="rerollSubtask(task.subtasks.length)" class="align-center m-1 die" :class="{ hidden: !task.subtasks.length }"><img id="button-img"
                    src="../assets/die.svg"></button>
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

const displayedIdx = ref(0)

const editable = ref(null)
let activeIndex = ref(-1)

function updateTaskName(...args) {  // Child function returns a new name and a target task reference
    args[0][1].name = args[0][0]    // targetTask.name = newName
}

function rerollSubtask(length){
    if (length < 2) {
        return
    }

    let random = displayedIdx.value

    while(random === displayedIdx.value) {
        random = Math.floor(Math.random() * length)
    }

    displayedIdx.value = random
}

</script>

<style scoped>
li {
    list-style-type: none;
}

.subtask {
    font-size: 2rem;
    font-weight: 600;
    max-width: 50vw;
}

.die {
    position: absolute;
    right: 0;
    margin: 0 40vw 0 auto
}

.done {
    opacity: 40%;
    text-decoration: line-through;
}</style>
