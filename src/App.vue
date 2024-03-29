<template>
  <main>
    <div id="gradient-top" class="z-10 m-0 p-0 fixed w-full pointer-events-none">
      <div id="blocker" class="z-0 m-0 p-0 relative w-full h-[60%] pointer-events-auto"></div>
    </div>
    <div id="gradient-bottom" class="z-10 m-0 p-0 fixed w-full pointer-events-none">
      <div id="blocker" class="z-0 translate-y-14 m-0 p-0 relative w-full h-[60%] pointer-events-auto"></div>
    </div>
    <div id="header" class="z-20 w-full h-0.5 fixed text-2xl font-bold text-center">
      <button v-show="editMode"
        class="m-4 p-2 px-4 bg-zinc-800 shadow-[6px_6px_0px_rgba(225,90,65,0.4)] hover:shadow-[8px_8px_0px_rgba(225,90,65,0.4)] border-red-400 border-2 rounded-sm"
        @click.stop="editMode = !editMode">
        Focus
      </button>
      <button v-show="editMode" @click.stop="newTask"
        class="m-4 p-2 px-4 bg-zinc-800 shadow-[6px_6px_0px_rgba(225,90,65,0.2)] hover:shadow-[8px_8px_0px_rgba(225,90,65,0.4)] border-red-400 border-2 rounded-sm">
        + Task
      </button>
      <button v-show="!editMode"
        class="m-4 p-2 px-4  bg-zinc-800 shadow-[6px_6px_0px_rgba(180,225,65,0.2)] hover:shadow-[8px_8px_0px_rgba(180,225,65,0.4)] border-lime-400 border-2 rounded-sm"
        @click.stop="editMode = !editMode">
        Edit
      </button>
    </div>
    <div class="place-items-center justify-center p-0 min-h-[100vh] bg-zinc-900 flex flex-col"
      @click.self="activeIdx = -1">
      <div id="task-list-container">
        <div v-if="editMode">
          <div v-for="(task, index) in tasks" :key="task">
            <div
              class="mt-8 p-5 m-4 mb-4 place-items-center min-h-24 text-lg w-[17.5rem] border-2 border-lime-400 bg-zinc-800 shadow-[8px_8px_0px_rgba(180,225,65,0.2)] hover:shadow-[10px_10px_0px_rgba(180,225,65,0.4)] rounded-sm"
              @click="activeIdx = index, scrollToElement($event)">
              <div v-show="index === activeIdx">
                <button class="absolute translate-x-[15rem] translate-y-[-2.2rem]" @click.stop="removeTask(task)">
                  <RemoveIcon></RemoveIcon>
                </button>
              </div>
              <Editable @keydown.enter.prevent="onPressEnter" id="task" class="text-2xl font-bold justify-start mt-2 ml-1"
                @update="updateTaskName" :task-name="task.name" :task="task" />
              <Collapse @click.stop :when="index === activeIdx" class="v-collapse">
                <div v-for="time in task.timeSpans" class="flex flex-wrap place-items-center space-x-1 space-y-1.5 my-6 bg-gradient-to-t to-40% from-zinc-900 to-zinc-800 border-zinc-900 border-2">
                  <div class="inline-flex basis-full text-sm place-items-center justify-evenly">
                      <label for="start">Start</label>
                      <input id="time" @keydown.enter.prevent="onPressEnter" class="text-sm h-6 bg-zinc-900" type="time"
                      name="start" v-model="time.start">
                      <label for="end">End</label>
                      <input id="time" @keydown.enter.prevent="onPressEnter" class="text-sm h-6 bg-zinc-900" type="time"
                      name="end" v-model="time.end">
                  </div>
                  <div v-for="(day, index) in time.days">
                    <button class="p-0 w-7 h-7 mb-1.5 rounded-full hover:bg-lime-800 selection:bg-transparent"
                      :class="{ 'bg-lime-700': day }" @click="time.days[index] = !time.days[index]">
                      {{ dayAliases[index].short }}
                    </button>
                  </div>
                  <div class="absolute translate-x-[14.4rem] -translate-y-6">
                    <RemoveIcon @click="removeTimeSpan(task, time)" class="h-[1.75rem] w-[1.75rem]" />
                </div>
                </div>
                <div v-show="!hasValidTimeSpan(task)" >
                  <p class="text-red-500 w-64 text-md -translate-y-2 my-1" :class="{ mt2: task.timeSpans <= 0 }">Requires at least one time span.</p>
                </div>
                <Subtasks @new-subtask="" @remove-subtask="removeSubtask" :task="task" />
                <div class="flex space-x-4 mb-2 mt-5 place-items-center">
                  <button @click="newSubtask(task)"
                    class="p-2 px-4 bg-zinc-800 shadow-[6px_6px_0px_rgba(225,90,65,0.2)] hover:shadow-[8px_8px_0px_rgba(225,90,65,0.4)] border-red-400 border-2 rounded-sm">
                    <p class="font-bold text-lg h-6 w-20 -translate-y-0.5 -translate-x-0.5">+ Subtask</p>
                  </button>
                  <button @click="newTimeSpan(task)"
                    class="flex place-items-center h-11 w-11 bg-zinc-800 shadow-[6px_6px_0px_rgba(225,90,65,0.2)] hover:shadow-[8px_8px_0px_rgba(225,90,65,0.4)] border-red-400 border-2 rounded-sm">
                    <TimeIcon></TimeIcon>
                  </button>
                  <button @click="activeIdx = -1"
                    class="flex place-items-center h-11 w-11 bg-zinc-800 shadow-[6px_6px_0px_rgba(225,90,65,0.2)] hover:shadow-[8px_8px_0px_rgba(225,90,65,0.4)] border-red-400 border-2 rounded-sm">
                    <SaveIcon></SaveIcon>
                  </button>
                </div>
              </Collapse>
              <div v-show="index !== activeIdx">
                <p class="my-2 ml-4">
                  {{ (task.subtasks && task.subtasks.length) ? task.subtasks.length + ' subtask' + (task.subtasks.length >
                    1 ? 's' : '') : '' }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <FocusMode :tasks="tasks" :day-aliases="dayAliases" />
        </div>
      </div>
    </div>

  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch, vShow } from 'vue'
import { uuid } from 'vue-uuid';
import { Collapse } from 'vue-collapsed'
import FocusMode from './components/FocusMode.vue'
import Subtasks from './components/Subtasks.vue'
import Editable from './components/Editable.vue'
import SaveIcon from './components/icons/SaveIcon.vue'
import TimeIcon from './components/icons/TimeIcon.vue'
import RemoveIcon from './components/icons/RemoveIcon.vue'

let activeIdx = ref(-1)
const editMode = ref(true)

const tasks = ref([])

const dayAliases = {
  0: { short: 'Su', long: 'Sunday' },
  1: { short: 'M', long: 'Monday' },
  2: { short: 'T', long: 'Tuesday' },
  3: { short: 'W', long: 'Wednesday' },
  4: { short: 'Th', long: 'Thursday' },
  5: { short: 'F', long: 'Friday' },
  6: { short: 'Sa', long: 'Saturday' }
}

function onPressEnter(e) {
  if (e.target.id !== 'time') {
    activeIdx.value = -1
  }
  e.target.blur()
}

function scrollToElement(e) {
  if (e.target) {
    e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

function hasValidTimeSpan(task) {
  return task.timeSpans.length > 0 &&
    task.timeSpans.some((t) =>
      t.start !== '-1' &&
      t.end !== '-1' &&
      t.days.some((d) => d === true))
}

function newTimeSpan(task) {
  task.timeSpans.push({ start: '-1', end: '-1', days: [false, false, false, false, false, false, false] })
}

function removeTimeSpan(task, timeSpan) {
  task.timeSpans = task.timeSpans.filter((t) => t !== timeSpan)
}

function newTask() {
  tasks.value.push({
    id: uuid.v1(), name: 'New Task', subtasks: [], subIdx: 0,
    timeSpans: [{ start: '-1', end: '-1', days: [false, false, false, false, false, false, false] }]
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
},
  { deep: true }
);

</script>
