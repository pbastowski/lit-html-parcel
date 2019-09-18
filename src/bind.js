import { directive, EventPart } from 'lit-html'

const cache = new WeakMap()

export const bind = directive(
    (context, name, { event, allowUnset = false } = {}) => part => {
        // const el = (part.committer && part.committer.element) || part.element
        const el = part.committer.element
        const radio = el.type === 'radio'
        const checkbox = el.type === 'checkbox'

        // Checkboxes can be bound to an array for a multiple choice result
        const arrayBinding = Array.isArray(context[name])

        // Always set the prop value based on the passed in value
        let value
        if (radio) {
            // radios are always mutually exclusive
            // and their "value" needs to be read in the next tick,
            // otherwise they will have the value of "on".
            // radios also have to have "checked" set directly,
            // as part.setValue does not work in the first instance.
            queueMicrotask(() => {
                value = context[name] === el.value
                part.setValue(value)
                part.commit()
            })
        } else {
            if (checkbox) {
                value = arrayBinding
                    ? // arrays hold multiple choices
                      context[name].includes(el.value)
                    : // otherwise checkboxes are mutually exclusive
                      context[name] === el.value
            } else {
                // text/number inputs are always just values, as typed
                // by the user and passed in with .value
                value = context[name]
            }
            part.setValue(value)
        }
        // Add an event handler to set the value of the binding
        if (!cache.has(el)) {
            let _event =
                event ||
                ((radio && 'click') || (checkbox && 'change') || 'input')
            let _value = 'value'

            cache.set(el, _event)

            const eventPart = new EventPart(el, _event, part.options)

            eventPart.setValue(e => {
                if (radio && allowUnset) {
                    if (el.checked && context[name] === el.value) {
                        el.checked = false
                        context[name] = undefined
                    } else context[name] = el.value
                } else {
                    context[name] = checkbox
                        ? arrayBinding
                            ? (el.checked && [...context[name], el.value]) ||
                              context[name].filter(v => v !== el.value)
                            : (el.checked && el.value) || undefined
                        : el[_value]
                }
            })
            eventPart.commit()
        }
    }
)

export default bind
