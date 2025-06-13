import './assets/main.css'

import { createApp, defineCustomElement } from 'vue'
import App from './App.ce.vue'
import { loadEnv } from 'vite'

const CuracomPlugin = defineCustomElement(App)
customElements.define('curacom-plugin', CuracomPlugin)
// createApp(App).mount('#app')

// const env = loadEnv('production', process.cwd())

// function loadCss() {
//   const style = document.createElement('link')
//   style.rel = 'stylesheet'
//   style.href = env.BASE_URL + '/assets/widget-index.css'
//   document.head.appendChild(style)
// }

// function addPlugin() {
//   const body = document.querySelector('body')
//   const plugin = document.createElement('curacom-plugin')
//   body?.appendChild(plugin)
// }

// function prepareWidget() {
//   if (env.ENV === 'production') {
//     loadCss()
//     addPlugin()
//   }
// }

// prepareWidget()
