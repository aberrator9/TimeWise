import './assets/main.css'

import { createApp } from 'vue'
import withUUID from "vue-uuid";
import App from './App.vue'

const app = withUUID(createApp(App).mount('#app'))
