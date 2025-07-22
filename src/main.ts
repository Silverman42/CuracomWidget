import './assets/main.css'

import { createApp, defineCustomElement } from 'vue'
import App from './App.ce.vue'
import { GetToken } from './utils/helpers/GetToken'
;(function () {
  const installComponent = () => {
    const CuracomPlugin = defineCustomElement(App)
    customElements.define('curacom-plugin', CuracomPlugin)
  }
  // createApp(App).mount('#app')

  const saveWidgetToken = () => {
    window.localStorage.setItem(import.meta.env.VITE_WIDGET_ID, GetToken())
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
    installComponent()
    if (import.meta.env.MODE === 'production') {
      loadCss()
      addPlugin()
    }
  }

  prepareWidget()
})()
