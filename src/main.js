import 'bootstrap/dist/css/bootstrap.css'
import * as bootstrap from 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import axios from 'axios'

// const token = localStorage.getItem('token')
// axios.defaults.headers.common['Authorization'] = `${token}`

const app = createApp(App)

app.use(router)

app.mount('#app')
