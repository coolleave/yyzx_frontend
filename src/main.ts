import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'normalize.css'
import './assets/css/index.less'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
