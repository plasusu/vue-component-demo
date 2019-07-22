<template>
    <div>
        <input type="text" :value="currentValue" @input="handleInput" @blur="handleBlur">
    </div>
</template>

<script>
import Emitter from '@/mixins/emitter'
export default {
    name: 'IInput',
    mixins: [Emitter],
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            currentValue: this.value
        }  
    },
    watch: {
        value(val) {
            this.currentValue = val
        }
    },
    methods: {
        handleInput(event) {
            const value = event.target.value

            this.currentValue = value

            this.$emit('input', value)

            this.dispatch('IFormItem', 'onFormChange', value)
        },
        handleBlur(event) {
            this.dispatch('IFormItem', 'onFormBlur', this.currentValue)
        }
    }
}
</script>

