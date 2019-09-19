import { observe, computed, dispose } from 'hyperactiv/dist'

const _store = {
    state: {
        abc: 'nothing here',
        todos: [
            { id: 0, title: 'taks one', done: false },
            { id: 1, title: 'taks two', done: false },
            { id: 2, title: 'third thing', done: true }
        ],
        id: 100
    }
}

export default observe(_store, { bind: true, deep: true })
