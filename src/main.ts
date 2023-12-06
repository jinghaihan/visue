import { createApp } from 'vue'
import { setupComponent } from '@/components/index'
import { setupRouter } from './router'
import { setupStyle } from '@/styles/index'
import App from '@/App.vue'

function setup() {
  const app = createApp(App)

  // Initialize Components
  setupComponent(app)

  // Initialize Routers
  setupRouter(app)

  // Initialize Styles
  setupStyle()

  app.mount('#app')
}

setup()
