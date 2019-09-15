import { LitElement, html } from 'lit-element'
import { render } from 'lit-html'
import { observe, computed, dispose } from 'hyperactiv/dist'

import store from './store'
import App from './App'

// render(App(), document.querySelector('lit-02'))
// computed(() => render(App(), document.querySelector('lit-02')))

customElements.define(
    'lit-02',
    class extends LitElement {
        $$store = computed(() => {
            this.template = App()
            queueMicrotask(() => {
                this.requestUpdate()
            })
        })

        render() {
            console.log('RENDER')
            return this.template
        }

        disconnectedCallback() {
            dispose(this.$$store)
        }
    }
)
