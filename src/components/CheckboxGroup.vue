<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
import Emitter from '@/mixins/emitter'
  import { findComponentsDownward } from'@/utils/assist.js';
export default {
    name: 'ICheckboxGroup',
    mixins: [Emitter],
    props: {
        value: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            currentValue: this.value,
            childrens: []
        }
    },
    watch: {
        value() {
            this.updateModel(true)
        }
    },
    mounted() {
        this.updateModel(true)
    },
    methods: {
        updateModel(update) {
            this.childrens = findComponentsDownward(this, 'ICheckbox')
            if (this.childrens) {
                const {value} = this
                this.childrens.forEach(child => {
                    child.model = value

                    if (update) {
                        child.currentValue = value.indexOf(child.label) >= 0
                        child.group = true
                    }
                })
            }
        },
        change(data) {
            this.currentValue = data
            this.$emit('input', data)
            this.$emit('onChange', data)
            this.dispatch('IFormItem', 'onFormChange', data)
        }
    }
}
</script>
