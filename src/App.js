import { html } from 'lit-html'
import { observe } from 'store'
import bind from './bind'

const state = observe({
    text: 'World',
    chk: undefined,
    chk2: '3',
    chk3: [],
    rad: 'c',
    sel: 'c'
})

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
    <p>Chose as many as you like:</p>
    ${['a', 'b', 'c', 'd'].map(
        s => html`
            <input type="checkbox" value=${s} .checked=${bind(state, 'chk3')} />
        `
    )}
    <br />
    <p>checkboxes with the same binding are mutually exclusive:</p>

    <input type="checkbox" .checked=${bind(state, 'chk')} value="111" />
    <input type="checkbox" .checked=${bind(state, 'chk')} value="2222" />
    <input type="checkbox" .checked=${bind(state, 'chk2')} value="3" />
    <input type="checkbox" .checked=${bind(state, 'chk2')} value="444" />
    <br />
    <p>All radios with the same binding are mutually exclusive:</p>
    ${['a', 'b', 'c', 'd'].map(
        s => html`
            <input
                type="radio"
                .checked=${bind(state, 'rad', { allowUnset: true })}
                value=${s}
            />
        `
    )}
    <hr />
    <select .value=${bind(state, 'sel')}
        ><option value="">don't know</option
        ><option value="a">A</option
        ><option value="b">B</option
        ><option value="c">C</option
        ><option value="d">D</option></select
    >
    <hr />
    <pre>${JSON.stringify(state, null, 4)}</pre>
`
