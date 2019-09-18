import { LitElement } from 'lit-element'
import { render } from 'lit-html'
import { computed, dispose } from 'store'

import App from './App'

computed(() => render(App(), document.querySelector('lit-02')))

// customElements.define(
//     'lit-02',
//     class extends LitElement {
//         $$store = computed(() => {
//             this.template = App()
//             this.requestUpdate()
//         })
//
//         render() {
//             return this.template
//         }
//
//         disconnectedCallback() {
//             dispose(this.$$store)
//         }
//     }
// )
