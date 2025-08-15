import './assets/main.css'

import { createApp } from 'vue'
import App from './App.ce.vue'
import { GetToken } from './utils/helpers/GetToken'
;(function () {
  // Function to extract CSS from style tags and stylesheets
  function extractStyles(): string {
    let cssText = ''

    // Get styles from style tags
    const styleTags = document.querySelectorAll('style')
    styleTags.forEach((style) => {
      cssText += style.textContent + '\n'
    })

    // Get styles from stylesheets
    const styleSheets = Array.from(document.styleSheets)
    styleSheets.forEach((sheet) => {
      try {
        const rules = Array.from(sheet.cssRules || sheet.rules)
        const sheetCssText = rules.map((rule) => rule.cssText).join('\n')
        cssText += sheetCssText + '\n'
      } catch (e) {
        // Skip cross-origin stylesheets
        console.warn('Could not access stylesheet:', e)
      }
    })

    return cssText
  }

  const installComponent = () => {
    // Create a custom element class with shadow DOM
    class CuracomPlugin extends HTMLElement {
      private app: any = null

      constructor() {
        super()

        // Create shadow root with closed mode for maximum encapsulation
        const shadow = this.attachShadow({ mode: 'closed' })

        // Create a container for the Vue app
        const container = document.createElement('div')
        shadow.appendChild(container)

        // Inject styles into shadow DOM first
        this.injectStyles(shadow)

        // Create and mount the Vue app inside the shadow DOM
        this.app = createApp(App)
        this.app.mount(container)
      }

      injectStyles(shadow: ShadowRoot) {
        // Extract all current styles
        const cssText = extractStyles()

        if (cssText) {
          const style = document.createElement('style')
          style.textContent = cssText
          shadow.appendChild(style)
        }

        // Also inject any dynamically loaded styles
        this.observeStyleChanges(shadow)
      }

      observeStyleChanges(shadow: ShadowRoot) {
        // Create a MutationObserver to watch for new style tags
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
              mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName === 'STYLE') {
                  const style = document.createElement('style')
                  style.textContent = (node as HTMLStyleElement).textContent
                  shadow.appendChild(style)
                }
              })
            }
          })
        })

        observer.observe(document.head, {
          childList: true,
          subtree: true,
        })
      }

      disconnectedCallback() {
        // Clean up the Vue app when the element is removed
        if (this.app) {
          this.app.unmount()
        }
      }
    }

    customElements.define('curacom-plugin', CuracomPlugin)
  }

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

    // In production mode, load external CSS and add plugin
    if (import.meta.env.MODE === 'production') {
      // loadCss()
      addPlugin()
    } else {
      // In development mode, just add the plugin (styles are already loaded)
      addPlugin()
    }
  }

  prepareWidget()
})()
