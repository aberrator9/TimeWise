<template>
  <main>
    <div class="absolute top-0 border-blue-500">
      <div class="flex-auto" v-if="editMode">
        <button @click="newTask">+ Task</button>
      </div>
      <button class="absolute" @click="editMode = !editMode">{{ editMode ? 'Focus' : 'Edit' }}</button>
    </div>
    <div v-if="editMode">
      <div
      class="place-items-center min-h-24 text-lg w-[17.5rem] border-2 border-lime-400 bg-zinc-800 shadow-[8px_8px_0px_rgba(180,225,65,0.2)] hover:shadow-[8px_8px_0px_rgba(180,225,65,0.4)] transition-colors p-5 m-4 rounded-sm"
      @click="activeId = index" v-for="(task, index) in tasks" :key="index">
      <div v-show="index === activeId">
        <RemoveButton class="absolute translate-x-[17rem] translate-y-[-1rem]" @click="removeTask(task)" />
      </div>
        <Editable class="text-2xl font-bold justify-start m-0.5" @update="updateTaskName" :task-name="task.name" :task="task" ref="editable" />
          <div v-if="index === activeId">
            <div class="space-y-8">
              <label class="text-sm mr-2" for="start">Start</label>
              <input class="text-sm h-6 bg-zinc-900" type="time" name="start" v-model="task.timeSpan.start">
              <label class="text-sm ml-4 mr-2" for="end">End</label>
              <input class="text-sm h-6 bg-zinc-900" type="time" name="end" v-model="task.timeSpan.end">
            </div>
            <span v-for="(day, index) in task.days">
              <button class="mt-2 m-0.5 p-0 w-[1.8rem] h-[1.8rem] rounded-full hover:bg-lime-800" :class="{ 'bg-lime-700': day }" @click="task.days[index] = !task.days[index]">
                {{ dayAliases[index] }} 
              </button>
            </span>
            <Subtasks class="flex-auto" @new-subtask="" @remove-subtask="removeSubtask" :task="task" />
              <SaveButton class="absolute translate-x-[17rem] translate-y-[5rem]" @click="saveTasks()" />
              <button class="mt-4 mb-14 ml-8" @click="newSubtask(task)">
                <p>+ Subtask</p>
              </button>
          </div>
        <div v-else>
          <p class="my-2 ml-4">
            {{ (task.subtasks && task.subtasks.length) ? task.subtasks.length + ' subtask' + (task.subtasks.length > 1 ? 's' : '') : '' }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <FocusMode :tasks="tasks" />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { uuid } from 'vue-uuid';
import FocusMode from './components/FocusMode.vue'
import Subtasks from './components/Subtasks.vue'
import Editable from './components/Editable.vue'
import SaveButton from './components/SaveButton.vue'
import RemoveButton from './components/RemoveButton.vue'

let activeId = ref(-1)
let editable = ref(null)
const editMode = ref(true)

const tasks = ref([])

function newTask() {
  tasks.value.push({
    id: uuid.v1(), name: 'New Task', subtasks: [],
    days: [false, false, false, false, false, false, false],
    timeSpan: { start: '00:00 AM', end: '00:00 AM' }
  })
}

const dayAliases = { 0: 'Su', 1: 'M', 2: 'T', 3: 'W', 4: 'Th', 5: 'F', 6: 'Sa' }

function removeTask(task) {
  tasks.value = tasks.value.filter((t) => t !== task)
  saveTasks()
}

function updateTaskName(...args) {    // 0: newName; 1: targetTask
  args[0][1].name = args[0][0]        // targetTask.name = newName
  saveTasks()
}

function newSubtask(task) {
  task.subtasks.push({ name: 'New subtask', done: false })
}

function removeSubtask(...args) {
  const [subtaskIndex, subtasks] = [args[0][0], args[0][1]]

  subtasks.splice(subtaskIndex, 1)
  saveTasks()
}

function saveTasks() {
  const parsed = JSON.stringify(tasks.value)
  localStorage.setItem('tasks', parsed)
}

onMounted(() => {
  const storedTasks = localStorage.getItem('tasks')
  if (storedTasks) {
    try {
      tasks.value = JSON.parse(storedTasks)
    } catch (e) {
      localStorage.removeItem('tasks').json
    }
  }
})

onUnmounted(() => {
  saveTasks()
})

</script>
