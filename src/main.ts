import './app.css'
import App from './App.svelte'

let target: Element | null = document.querySelector('#app')

if (!target) {
  target = document.createElement('div')
  document.body.append(target)
}

const app = new App({ target })

export default app
