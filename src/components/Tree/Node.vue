<template>
<div>
    <ul class="tree-ul">
        <li class="tree-li">
            <span class="tree-expand" @click="handleExpand">
                <span v-if="data.children && data.children.length && !data.expand">+</span>
                <span v-if="data.children && data.children.length && data.expand">-</span>
            </span>
            <i-checkbox
                v-if="showCheckbox"
                :value="data.checked"
                @input="handleCheck"
            ></i-checkbox>
            <span>{{data.title}}</span>
            <i-node
                v-if="data.expand"
                v-for="(item, index) in data.children"
                :key="index"
                :data="item"
                :show-checkbox="showCheckbox"
            ></i-node>
        </li>
    </ul>
</div>
</template>

<script>
import ICheckbox from '../Checkbox'
import {findComponentUpward} from '../../utils/assist'
export default {
    name: 'INode',
    components: {
        ICheckbox
    },
    props: {
        data: {
            type: Object,
            default() {
                return {}
            }
        },
        showCheckbox: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            test: false,
            tree: findComponentUpward(this, 'Itree')
        }
    },
    watch: {
        'data.children': {
            handler(data) {
                if (data) {
                    const checkedAll = data.every(v => v.checked)
                    this.$set(this.data, 'checked', checkedAll)
                }
            },
            deep: true
        }
    },
    methods: {
        handleCheck(checked) {
            this.updateTreeDown(this.data, checked)

            if (this.tree) {
                this.tree.eventEmit('on-check-change', this.data)
            }
        },
        handleExpand() {
            this.$set(this.data, 'expand', !this.data.expand)

            if (this.tree) {
                this.tree.eventEmit('on-toggle-expand', this.data)
            }
        },
        updateTreeDown(data, checked) {
            this.$set(data, 'checked', checked)

            if (data.children && data.children.length) {
                data.children.forEach(v => {
                    this.updateTreeDown(v, checked)
                })
            }
        }
    }
}
</script>
<style>
  .tree-ul, .tree-li{
    list-style: none;
    padding-left: 10px;
  }
  .tree-expand{
    cursor: pointer;
  }
</style>

