<template>
    <div>
        <label v-if="label" :class="{'i-form-item-label-required': isRequired}">{{label}}</label>
        <slot></slot>
        <div v-if="validateState === 'error'" class="i-form-item-message">{{validateMessage}}</div>
    </div>
</template>


<script>
import AsyncValidator from'async-validator';
import Emitter from '@/mixins/emitter'

export default {
    name: 'IFormItem',
    inject: ['form'],
    mixins: [Emitter],
    props: {
        label: {
            type: String,
            default: ''
        },
        prop: {
            type: String
        }
    },
    data() {
        return {
            isRequired: false,
            validateState: '',
            validateMessage: ''
        }
    },
    computed: {
        fieldValue() {
            return this.form.model[this.prop]
        }
    },
    mounted() {
        if (this.prop) {
            this.dispatch('IForm', 'onFormItemAdd', this)
            this.setRules()
        }
    },
    beforeDestroy() {
        this.dispatch('IForm', 'onFormItemRemove', this)
    },
    methods: {
        setRules() {
            let rules = this.getRules()
            this.isRequired = rules.some(rule => rule.required)

            this.$on('onFormChange', this.onFieldChange)
            this.$on('onFormBlur', this.onFieldBlur)
        },
        onFieldChange() {
            this.validate('change')
        },
        onFieldBlur() {
            this.validate('blur')
        },
        getRules() {
            let formRules = this.form.rules;
            
            formRules = formRules ? formRules[this.prop] : []

            return [].concat(formRules || [])
        },
        getFilteredRule(trigger) {
            const rules = this.getRules()

            return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
        },
        validate(trigger, callback = function() {}) {
            let rules = this.getFilteredRule(trigger)

            if (!rules || rules.length === 0) {
                return true
            }

            this.validateState = 'validating'

            let descriptor = {}
            descriptor[this.prop] = rules

            const validator = new AsyncValidator(descriptor);

            let model = {}
            model[this.prop] = this.fieldValue

            validator.validate(model, { firstFields: true }, errors => {
                this.validateState = !errors ? 'success' : 'error'
                this.validateMessage = errors ? errors[0].message : ''

                callback(this.validateMessage)
            })
        }
    }
}
</script>

<style>
.i-form-item-label-required:before {
    content: '*';
    color: red;
}
.i-form-item-message {
    color: red;
}
</style>

