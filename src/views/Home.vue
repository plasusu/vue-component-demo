<template>
  <div class="home">
    <i-form :model="formValidate" :rules="ruleValidate" ref="form">
      <i-form-item label="用户名" prop="name">
        <i-input v-model="formValidate.name"></i-input>
      </i-form-item>
      <i-form-item label="邮箱" prop="mail">
        <i-input v-model="formValidate.mail"></i-input>
      </i-form-item>
      <i-form-item label="测试checkbox" prop="member">
        <i-checkbox-group v-model="formValidate.member">
          <i-checkbox label="1">小明</i-checkbox>
          <i-checkbox label="2">小李</i-checkbox>
          <i-checkbox label="3">小赵</i-checkbox>
        </i-checkbox-group>
      </i-form-item>
      <i-form-item label="测试radio" prop="radio">
        <i-radio v-model="formValidate.radio">是否勾选</i-radio>
      </i-form-item>
      <button @click="handleSubmit">提交</button>
    </i-form>
  </div>
</template>

<script>
import IForm from '@/components/Form.vue'
import IFormItem from '@/components/FormItem.vue'
import IInput from '@/components/Input.vue'
import ICheckbox from '@/components/Checkbox.vue'
import ICheckboxGroup from '@/components/CheckboxGroup.vue'
import IRadio from '@/components/Radio.vue'

export default {
  name: 'home',
  components: {
    IForm,
    IFormItem,
    IInput,
    ICheckbox,
    ICheckboxGroup,
    IRadio
  },
  data() {
    return {
      formValidate: {
        name: '',
        mail: '',
        member: ['1'],
        radio: false
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        member: [
          {
            validator(rule, value, callback) {
              if (value.length < 1) {
                callback(new Error('必须选择一个'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      console.log(this.formValidate.radio)
      this.$refs.form.validate(valid => {
        if (valid) {
          consle.log('提交成功')
        } else {
          console.log('表单校验失败')
        }
      })
    }
  }
}
</script>
