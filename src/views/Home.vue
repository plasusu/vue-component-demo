<template>
  <div class="home">
    <i-form :model="formValidate" :rules="ruleValidate" ref="form">
      <i-form-item label="用户名" prop="name">
        <i-input v-model="formValidate.name"></i-input>
      </i-form-item>
      <i-form-item label="邮箱" prop="mail">
        <i-input v-model="formValidate.mail"></i-input>
      </i-form-item>
      <i-form-item label="测试单个checkbox">
        <i-checkbox v-model="checked">单个</i-checkbox>
        <span>{{checked}}</span>
      </i-form-item>
      <i-form-item label="测试checkbox" prop="member">
        <i-checkbox-group v-model="formValidate.member">
          <i-checkbox label="1">小明</i-checkbox>
          <i-checkbox label="2">小李</i-checkbox>
          <i-checkbox label="3">小赵</i-checkbox>
        </i-checkbox-group>
        <span>{{formValidate.member}}</span>
      </i-form-item>
      <i-form-item label="测试radio" prop="radio">
        <i-radio v-model="formValidate.radio">是否勾选</i-radio>
      </i-form-item>
      <i-form-item label="测试radio组" prop="radioGroup">
        <i-radio-group v-model="formValidate.radioGroup">
          <i-radio label="1">radio1</i-radio>
          <i-radio label="2">radio2</i-radio>
          <i-radio label="3">radio3</i-radio>
        </i-radio-group>
      </i-form-item>
      <button @click="handleSubmit">提交</button>
    </i-form>

    <textarea v-model="originCode"></textarea>
    <i-display :code="code"></i-display>
    <button @click="handleDisplay">渲染</button>
    <button @click="handleAlert1">打开提示1</button>
    <button @click="handleAlert2">打开提示2</button>

    <i-tree
      :list="treeList"
      :show-checkbox="true"
    ></i-tree>
  </div>
</template>

<script>
import IForm from '@/components/Form.vue'
import IFormItem from '@/components/FormItem.vue'
import IInput from '@/components/Input.vue'
import ICheckbox from '@/components/Checkbox.vue'
import ICheckboxGroup from '@/components/CheckboxGroup.vue'
import IRadio from '@/components/Radio.vue'
import IRadioGroup from '@/components/RadioGroup.vue'
import IDisplay from '@/components/Display.vue'
import ITree from '@/components/Tree/Tree.vue'
import mock from './mock'

export default {
  name: 'home',
  components: {
    IForm,
    IFormItem,
    IInput,
    ICheckbox,
    ICheckboxGroup,
    IRadio,
    IRadioGroup,
    IDisplay,
    ITree
  },
  data() {
    return {
      checked: false,
      formValidate: {
        name: '',
        mail: '',
        member: ['1'],
        radio: false,
        radioGroup: '2',
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
      },
      originCode: mock,
      code: mock,
      treeList: [
  {
    title: 'parent 1',
    expand: true,
    children: [
      {
        title: 'parent 1-1',
        expand: true,
        children: [
          {
            title: 'leaf 1-1-1'
          },
          {
            title: 'leaf 1-1-2'
          }
        ]
      },
      {
        title: 'parent 1-2',
        children: [
          {
            title: 'leaf 1-2-1'
          },
          {
            title: 'leaf 1-2-1'
          }
        ]
      }
    ]
  }
]
    }
  },
  watch: {
    'formValidate.radioGroup'(val) {
      console.log(val)
    },
    'formValidate.member'(val) {
      console.log(val)
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
    },
    handleDisplay() {
      this.code = this.originCode
    },
    handleAlert1() {
      this.$Alert.info({
        content: '提示1'
      })
    },
    handleAlert2() {
      this.$Alert.info({
        content: '提示2'
      })
    }
  }
}
</script>
