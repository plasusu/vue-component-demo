<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import {findComponentsDownward} from '@/utils/assist'
import Emitter from '@/mixins/emitter'
export default {
    name: 'IRadioGroup',
    mixins: [Emitter],
    props: {
        value: {
            type: [String, Number, Boolean]
        }
    },
    data() {
        return {
            currentValue: this.value
        }
    },
    watch: {
        value() {
            this.updateModel()
        }
    },
    mounted() {
        this.updateModel()
    },
    methods: {
        updateModel() {
            const children = findComponentsDownward(this, 'IRadio')

            children.forEach(child => {
                child.model = this.value
            })
        },
        change(val) {
            this.currentValue = val
            this.$emit('input', val)
            this.dispatch('IFormItem', 'onFormChange', val)
        }
    }
}
</script>


