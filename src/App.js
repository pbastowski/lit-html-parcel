import { html } from 'lit-html'
import { observe } from 'hyperactiv/dist'
import bind from './bind'

const state = observe({ text: 'World', chk: undefined, chk2: '3', rad: 'c' })

const style = html`
    <style>
        h1 {
            color: blue;
        }
    </style>
`

export default () => html`
    ${style}
    <h1>Hello ${state.text}...</h1>
    <input .value=${bind(state, 'text')} />
    <br />
    <input type="checkbox" .checked=${bind(state, 'chk')} value="111" />
    <input type="checkbox" .checked=${bind(state, 'chk')} value="2222" />
    <input type="checkbox" .checked=${bind(state, 'chk2')} value="3" />
    <input type="checkbox" .checked=${bind(state, 'chk2')} value="444" />
    <br />
    <input type="radio" .checked=${bind(state, 'rad')} value="a" />
    <input type="radio" .checked=${bind(state, 'rad')} value="b" />
    <input type="radio" .checked=${bind(state, 'rad')} value="c" />
    <input type="radio" .checked=${bind(state, 'rad')} value="d" />
    <hr />
    <pre>${JSON.stringify(state, null, 4)}</pre>
`
