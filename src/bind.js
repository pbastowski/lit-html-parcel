import { directive, EventPart } from 'lit-html'

const cache = new WeakMap()

export const bind = directive((context, name, event) => part => {
    const el = part.committer.element
    const radio = el.type === 'radio'
    const checkbox = el.type === 'checkbox'
    const arrayBinding = Array.isArray(context[name])

    let value
    if (radio) value = context[name] === el.value
    else if (checkbox) value = context[name] === el.value ? el.value : undefined
    else value = context[name]
    part.setValue(value)

    if (!cache.has(el)) {
        let _event = event || (radio || checkbox ? 'change' : 'input')
        let _value = 'value'

        const eventPart = new EventPart(el, _event, part.options)

        cache.set(el, _event)

        eventPart.setValue(
            e =>
                (context[name] = checkbox
                    ? (el.checked && el.value) || undefined
                    : e.path[0][_value])
        )
        eventPart.commit()
    }
})

export default bind
