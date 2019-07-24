<template>
    <div>
        <i-node v-for="(item, index) in cloneList" :key="index" :data="item" :show-checkbox="showCheckbox"></i-node>
    </div>
</template>

<script>
import INode from './Node'
import {deepCopy} from '../../utils/assist'
export default {
    name: 'ITree',
    components: {
        INode
    },
    props: {
        list: {
            type: Array,
            default() {
                return []
            }
        },
        showCheckbox: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            cloneList: []
        }
    },
    created() {
        this.rebuildList()
    },
    watch: {
        list() {
            this.rebuildList()
        }
    },
    methods: {
        rebuildList() {
            this.cloneList = deepCopy(this.list)
        },
        eventEmit(eventName, data) {
            this.$emit(eventName, data, this.rebuildList)
        }
    }
}
</script>

