import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Istance, setIstance } from './rootIstances'

const vueApp = createApp(App)
  .use(store)
  .use(router)
  .mount('#app')

setIstance(vueApp)
