import './assets/main.css'

import { createApp, defineCustomElement } from 'vue'
import App from './App.ce.vue'

const CuracomPlugin = defineCustomElement(App)
customElements.define('curacom-plugin', CuracomPlugin)
// createApp(App).mount('#app')
