import './assets/main.css'

import withUUID from "vue-uuid";
import { createApp } from 'vue'
import App from './App.vue'

const app = withUUID(createApp(App).mount('#app'))
