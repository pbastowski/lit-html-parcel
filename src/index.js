import { LitElement } from 'lit-element'
import { render } from 'lit-html'
import { computed, dispose } from 'store'

import store from './store'

import App from './App'

// computed(() => render(App(), document.querySelector('lit-02')))

customElements.define(
    'lit-02',
    class extends LitElement {
        static get properties() {
            return {
                abc: String
            }
        }

        updated(changes) {
            // Sync the store with the prop (if that'w what you need)
            changes.forEach((ov, prop) => {
                store.state[prop] = this[prop]
            })
        }

        $$store = computed(() => {
            // Passing this to App gives App to refer to any properties
            this.template = App(this)
            this.requestUpdate()
        })

        render() {
            return this.template
        }

        disconnectedCallback() {
            dispose(this.$$store)
        }
    }
)
