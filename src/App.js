import { html } from 'lit-html'
import { observe } from 'store'
import bind from './bind'

const state = observe({
    text: 'World',
    chk1: undefined,
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
    <p>
        Binding a text input will automatically add an event handler that syncs
        the entered value back to the model.
    </p>
    Enter some text: <input .value=${bind(state, 'text')} />
    <br />
    <p>
        Checkboxes bound to the same array will add their value to the bound
        array when checked and remove it when unchecked.
    </p>
    Chose as many as you like:
    ${['a', 'b', 'c', 'd'].map(
        s => html`
            <input type="checkbox" value=${s} .checked=${bind(state, 'chk3')} />
        `
    )}

    <br />
    <p>Checkboxes with the same binding are mutually exclusive:</p>
    chk1:
    <input type="checkbox" .checked=${bind(state, 'chk1')} value="111" />
    <input type="checkbox" .checked=${bind(state, 'chk1')} value="2222" />
    <br />
    chk2:
    <input type="checkbox" .checked=${bind(state, 'chk2')} value="3" />
    <input type="checkbox" .checked=${bind(state, 'chk2')} value="444" />

    <br />
    <p>
        All radios with the same binding are mutually exclusive. It is also
        possible to select none by specifying the option
        <code>{ allowUnset: true }</code>:
    </p>
    Choose one or none:
    ${['a', 'b', 'c', 'd'].map(
        s => html`
            <input
                type="radio"
                .checked=${bind(state, 'rad', { allowUnset: true })}
                value=${s}
            />
        `
    )}
    <br /><br />
    Select one:
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
