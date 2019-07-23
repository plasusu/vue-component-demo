<template>
    <label>
        <input
            v-if="group"
            type="radio"
            :value="label"
            v-model="model"
            @change="change"
        >
        <input
            v-else
            type="radio"
            :checked="currentValue"
            @change="change"
        >
        <slot></slot>
    </label>
</template>

<script>
import {findComponentUpward} from '@/utils/assist'
import Emitter from '@/mixins/emitter'
export default {
    name: 'IRadio',
    mixins: [Emitter],
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
        label: {
            type: [String, Number, Boolean]
        }
    },
    data() {
        return {
            currentValue: this.value,
            group: false,
            parent: null,
            model: ''
        }
    },
    watch: {
        value(val) {
            this.currentValue = this.trueValue === val
        }
    },
    mounted() {
        this.parent = findComponentUpward(this, 'IRadioGroup')

        if (this.parent) {
            this.group = true
        }
    },
    methods: {
        change(event) {
            const checked = event.target.checked
            
            const value = checked ? this.trueValue : falseValue

            this.$emit('input', value)
            
            if (this.group) {
                this.parent.change(this.model)
            } else {
                this.dispatch('IFormItem', 'onFormChange', value)
            }
        }
    }
}
</script>
