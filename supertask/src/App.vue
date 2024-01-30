<template>
  <main>
    <div
      class="z-10 m-0 w-[100%] h-[100px] fixed text-2xl font-bold text-center">
      <button v-if="editMode" @click="newTask"
        class="m-4 p-2 px-4 bg-zinc-800 shadow-[6px_6px_0px_rgba(225,90,65,0.2)] hover:shadow-[8px_8px_0px_rgba(225,90,65,0.4)] border-red-400 border-2 transition-all rounded-sm">
        + Task
      </button>
      <button v-show="editMode"
        class="m-4 p-2 px-4 bg-zinc-800 shadow-[6px_6px_0px_rgba(225,90,65,0.4)] hover:shadow-[8px_8px_0px_rgba(225,90,65,0.4)] border-red-400 border-2 transition-all rounded-sm"
        @click="editMode = !editMode">
        Focus
      </button>
      <button v-show="!editMode"
        class="m-4 p-2 px-4  bg-zinc-800 shadow-[8px_8px_0px_rgba(180,225,65,0.2)] hover:shadow-[10px_10px_0px_rgba(180,225,65,0.4)] border-lime-400 border-2 transition-all rounded-sm"
        @click="editMode = !editMode">
        Edit
      </button>
    </div>
    <div class="place-items-center justify-center p-0 min-h-[100vh] bg-zinc-900 flex flex-col"
      @click.self="activeIdx = -1">
      <div class="mt-16 mb-4">
        <div v-if="editMode">
          <div v-for="(task, index) in tasks" :key="index">
            <div
              class="mt-8 p-5 m-4 mb-4 place-items-center min-h-24 text-lg w-[17.5rem] border-2 border-lime-400 bg-zinc-800 shadow-[8px_8px_0px_rgba(180,225,65,0.2)] hover:shadow-[10px_10px_0px_rgba(180,225,65,0.4)] transition-all rounded-sm"
              @click="activeIdx = index, scrollToElement($event)">
              <div v-show="index === activeIdx">
                <RemoveButton class="absolute translate-x-[15rem] translate-y-[-2.2rem]" @click.stop="removeTask(task)" />
              </div>
              <Editable @keydown.enter.prevent="onPressEnter" id="task" class="text-2xl font-bold justify-start mt-2 ml-1" @update="updateTaskName" :task-name="task.name"
                :task="task" />
              <div @click.stop v-if="index === activeIdx">
                <div class="space-y-8">
                  <label class="text-sm mr-2" for="start">Start</label>
                  <input class="text-sm h-6 bg-zinc-900" type="time" name="start" v-model="task.timeSpan.start">
                  <label class="text-sm ml-4 mr-2" for="end">End</label>
                  <input class="text-sm h-6 bg-zinc-900" type="time" name="end" v-model="task.timeSpan.end">
                </div>
                <span v-for="(day, index) in task.days">
                  <button class="mt-2 m-0.5 p-0 w-[1.8rem] h-[1.8rem] rounded-full hover:bg-lime-800"
                    :class="{ 'bg-lime-700': day }" @click="task.days[index] = !task.days[index]">
                    {{ dayAliases[index] }}
                  </button>
                </span>
                <Subtasks @new-subtask="" @remove-subtask="removeSubtask" :task="task" />
                <div class="flex">
                  <button class="m-4 p-2 px-4 bg-zinc-800 shadow-[6px_6px_0px_rgba(225,90,65,0.2)] hover:shadow-[8px_8px_0px_rgba(225,90,65,0.4)] border-red-400 border-2 transition-all rounded-sm"
                  @click="newSubtask(task)">
                  <p class="font-bold text-xl">+ Subtask</p>
                </button>
                <button class="flex place-items-center h-12 w-12 m-4 p-2 px-4 bg-zinc-800 shadow-[6px_6px_0px_rgba(225,90,65,0.2)] hover:shadow-[8px_8px_0px_rgba(225,90,65,0.4)] border-red-400 border-2 transition-all rounded-sm" @click="activeIdx = -1">
                  <SaveIcon class="flex-auto min-w-10 -translate-x-4"></SaveIcon>
                </button>
              </div>
              </div>
              <div v-else>
                <p class="my-2 ml-4">
                  {{ (task.subtasks && task.subtasks.length) ? task.subtasks.length + ' subtask' + (task.subtasks.length >
                    1 ? 's' : '') : '' }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <FocusMode :tasks="tasks" />
        </div>
      </div>
    </div>

  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { uuid } from 'vue-uuid';
import FocusMode from './components/FocusMode.vue'
import Subtasks from './components/Subtasks.vue'
import Editable from './components/Editable.vue'
import SaveIcon from './components/SaveIcon.vue'
import RemoveButton from './components/RemoveButton.vue'

let activeIdx = ref(-1)
const editMode = ref(true)

const tasks = ref([])

const dayAliases = { 0: 'Su', 1: 'M', 2: 'T', 3: 'W', 4: 'Th', 5: 'F', 6: 'Sa' }

function onPressEnter(e) {
    activeIdx.value= -1
    e.target.blur()
}

function scrollToElement(e) {
  if (e.target) {
    e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

function newTask() {
  tasks.value.push({
    id: uuid.v1(), name: 'New Task', subtasks: [], subIdx: 0,
    days: [false, false, false, false, false, false, false],
    timeSpan: { start: '00:00 AM', end: '00:00 AM' }
  })

  // Wait for DOM update before scrolling
  nextTick(() => {
    activeIdx.value = tasks.value.length - 1
    window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight, block: 'top' })
  })
}

function removeTask(task) {
  tasks.value = tasks.value.filter((t) => t !== task)
}

function updateTaskName(...args) {    // 0: newName; 1: targetTask
  args[0][1].name = args[0][0]        // targetTask.name = newName
}

function newSubtask(task) {
  task.subtasks.push({ name: 'New subtask', done: false })
}

function removeSubtask(...args) {
  const [subtaskIndex, subtasks] = [args[0][0], args[0][1]]

  subtasks.splice(subtaskIndex, 1)
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

watch(tasks, () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value));
    console.log('task.value changed')
  //   const parsed = JSON.stringify(tasks.value)
  // localStorage.setItem('tasks', parsed)
  },
  { deep: true }
);

</script>
