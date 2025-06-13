import './assets/main.css'

import { createApp, defineCustomElement } from 'vue'
import App from './App.ce.vue'

const CuracomPlugin = defineCustomElement(App)
customElements.define('curacom-plugin', CuracomPlugin)
// createApp(App).mount('#app')

function loadCss() {
  const style = document.createElement('link')
  style.rel = 'stylesheet'
  style.href = import.meta.env.BASE_URL + '/assets/widget-index.css'
  document.head.appendChild(style)
}

function addPlugin() {
  const body = document.querySelector('body')
  const plugin = document.createElement('curacom-plugin')
  body?.appendChild(plugin)
}

// console.log(import.meta.env.MODE)

function prepareWidget() {
  if (import.meta.env.MODE === 'production') {
    loadCss()
    addPlugin()
  }
}

prepareWidget()
