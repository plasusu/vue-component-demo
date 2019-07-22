<template>
    <label>
        <span>
            <input
                v-if="group"
                type="checkbox"
                :disabled="disabled"
                :value="label"
                v-model="model"
                @change="change"
            >
            <input 
                v-else
                type="checkbox"
                :disabled="disabled"
                :checked="currentValue"
                @change="change"
            >
        </span>
        <slot></slot>
    </label>
</template>


<script>
import {findComponentUpward} from '@/utils/assist'
import Emitter from '@/mixins/emitter'
export default {
    name: 'ICheckbox',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
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

    mixins: [Emitter],

    data() {
        return {
            currentValue: this.value,
            model: [],
            group: false,
            parent: null
        }
    },
    
    watch: {
        value(val) {
            if (val === this.trueValue || val === this.falseValue) {
                this.updateModel()
            } else {
                throw `Value should be ${trueValue} or ${falseValue}.`
            }
        }
    },

    mounted() {
        this.parent = findComponentUpward(this, 'ICheckboxGroup')

        if (this.parent) {
            this.group = true
        }

        if (this.group) {
            this.parent.updateModel(true)
        } else {
            this.updateModel
        }
    },

    methods: {
        change(event) {
            if (this.disabled) {
                return false
            }

            const checked = event.target.checked
            this.currentValue = checked

            const value = checked ? this.trueValue : this.falseValue
            this.$emit('input', value)

            if (this.group) {
                this.parent.change(this.model)
            } else {
                this.$emit('onChange', value)
                this.dispatch('IFormItem', 'onFormChange', value)
            }
        },

        updateModel() {
            this.currentValue = this.value === this.trueValue
        }
    }
}
</script>
