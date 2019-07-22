<template>
    <label>
        <input
            type="radio"
            :checked="currentValue"
            @change="change"
        >
        <slot></slot>
    </label>
</template>

<script>
export default {
    name: 'IRadio',
    props: {
        value: {
            type: [String, Number, Boolean],
            default: false
        },
        trueValue: {
            type: [String, Number, Boolean],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean],
            default: false
        },
    },
    data() {
        return {
            currentValue: this.value
        }
    },
    watch: {
        value(val) {
            this.currentValue = this.trueValue === val
        }
    },
    methods: {
        change(event) {
            const value = event.target.value
            console.log(value)
            this.$emit('input', value)
        }
    }
}
</script>
