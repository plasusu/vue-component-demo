function boardcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        if (child.$options.name === componentName) {
            child.$emit.apply(child, [eventName].concat(params))
        } else {
            boardcast.call(child, componentName, eventName, params)
        }
    })
}

export default {
    methods: {
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root
            let name = parent.$options.name

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent

                if (parent) {
                    name = parent.$options.name
                }
            }

            parent.$emit.apply(parent, [eventName].concat(params))
        },
        boardcast(componentName, eventName, params) {
            boardcast.call(this, componentName, eventName, params)
        }
    }
}