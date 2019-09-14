import { LitElement, html } from 'lit-element'
import { observe, computed, dispose } from 'hyperactiv/dist'

import store from './store'
import App from './App'

customElements.define(
    'lit-02',
    class extends LitElement {
        $$store = computed(() => {
            this.template = App()
            this.requestUpdate()
        })
        render() {
            return this.template
        }
    }
)
