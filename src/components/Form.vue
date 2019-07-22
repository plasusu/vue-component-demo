<template>
    <form>
        <slot></slot>
    </form>
</template>

<script>
export default {
    name: 'IForm',
    provide() {
        return {
            form: this
        }
    },
    props: {
        model: {
            type: Object
        },
        rules: {
            type: Object
        }
    },
    data() {
        return {
            fields: []
        }
    },
    created() {
        this.$on('onFormItemAdd', field => {
            if (field) this.fields.push(field)
        })
        this.$on('onFormItemRemove', field => {
            if (field.prop) this.fields.splice(this.fields.indexOf(field), 1)
        })
    },
    methods: {
        validate(callback) {
            console.log(this.fields)
            return new Promise(resolve => {
                let valid = true
                let count = 0

                this.fields.forEach(field => {
                    field.validate('', errors => {
                        if (errors) {
                            valid = false
                        }

                        if (++count === this.fields.length) {
                            resolve(valid)

                            if (typeof callback === 'function') {
                                callback(valid)
                            }
                        }
                    })
                })
            })
        }
    }
}
</script>
