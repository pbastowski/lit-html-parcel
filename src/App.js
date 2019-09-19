import { html } from 'lit-html'
import { observe } from 'hyperactiv/dist'
import bind from './bind'

import store from './store'

const state = observe({
    text: 'test',
    chk1: undefined,
    chk2: '3',
    chk3: [],
    rad: 'c',
    sel: 'c'
})

const style = html`
    <style>
        h2 {
            color: blue;
        }
    </style>
`

export default app => html`
    ${style}
    <h2>This is a lit-html reactive app</h2>

    <h4>
        Binding a text input will automatically add an event handler that syncs
        the entered value back to the model.
    </h4>
    Enter some text <input .value=${bind(state, 'text')} /> and see how the text
    below updates.
    <pre>state.text: ${state.text}</pre>

    <h4>Show prop "abc" set in index.html</h4>
    <pre>store.abc: ${JSON.stringify(store.state.abc, null, 4)}</pre>
    <pre>this.abc: ${JSON.stringify(store.state.abc, null, 4)}</pre>

    <h4>
        Checkboxes bound to the same array will add their value to the bound
        array when checked and remove it when unchecked.
    </h4>
    Chose as many as you like:
    ${['a', 'b', 'c', 'd'].map(
        s => html`
            <input type="checkbox" value=${s} .checked=${bind(state, 'chk3')} />
        `
    )}

    <h4>Checkboxes with the same binding are mutually exclusive:</h4>
    chk1:
    <input type="checkbox" .checked=${bind(state, 'chk1')} value="111" />
    <input type="checkbox" .checked=${bind(state, 'chk1')} value="2222" />
    <br />
    chk2:
    <input type="checkbox" .checked=${bind(state, 'chk2')} value="3" />
    <input type="checkbox" .checked=${bind(state, 'chk2')} value="444" />

    <h4>
        All radios with the same binding are mutually exclusive. It is also
        possible to select none by specifying the option
        <code>{ allowUnset: true }</code>:
    </h4>
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

    <h4>
        Bind selects to their value prop. Then assign each option a distinct
        value prop. When the user selects an option the select's bound value
        will be updated.
    </h4>
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
