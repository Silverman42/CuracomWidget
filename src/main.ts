import './assets/main.css'

import { createApp, defineCustomElement } from 'vue'
import App from './App.ce.vue'

const CuracomPlugin = defineCustomElement(App)
customElements.define('curacom-plugin', CuracomPlugin)
// createApp(App).mount('#app')

const saveWidgetToken = () => {
  let token: string = 'QdiR8tnXeZSbP2TIYCZNxzJi2ocKERdc'

  if (import.meta.env.MODE === 'production') {
    const widgetScript = document.querySelector(
      `#${import.meta.env.VITE_WIDGET_ID}`,
    ) as HTMLScriptElement

    const url = new URL(widgetScript?.src || '')

    token = url.searchParams.get('id') || ''
  }

  window.localStorage.setItem(import.meta.env.VITE_WIDGET_ID, token)
}

function loadCss() {
  const style = document.createElement('link')
  style.rel = 'stylesheet'
  style.type = 'text/css'
  style.href = import.meta.env.VITE_BASE_URL + '/assets/widget-index.css'
  document.head.appendChild(style)
}

function addPlugin() {
  const plugin = document.createElement('curacom-plugin')
  const body = document.querySelector('body') as HTMLBodyElement
  body.appendChild(plugin)
}

function prepareWidget() {
  saveWidgetToken()
  if (import.meta.env.MODE === 'production') {
    loadCss()
    addPlugin()
  }
}

prepareWidget()
