<template>
    <div class="alert">
        <div class="alert-main" v-for="item in notices" :key="item.name">
            <div class="alert-content">{{ item.content }}</div>
        </div>
    </div>
</template>

<script>
import { setTimeout } from 'timers';

let uid = 0

function getUid() {
    return `alert${uid++}`
}

export default {
    data() {
        return {
            notices: []
        }
    },
    methods: {
        add(notice) {
            Object.assign(notice, {
                name: getUid()
            })
            this.notices.push(notice)
            setTimeout(() => {
                this.remove(notice)
            }, notice.duration * 1000)
        },
        remove(notice) {
            console.log(notice)
            const notices = this.notices
            for (let i = 0; i < notices.length; i++) {
                if (notices[i].name === notice.name) {
                    this.notices.splice(i, 1);
                    break;
                }
            }
            console.log(this.notices)
            // this.notices.forEach((v, i) => {
            //     if (v.name === notice.name) {
            //         this.notices.splice(i, 1)
            //         break
            //     }
            // })
        }
    }
}
</script>
<style>
  .alert{
    position: fixed;
    width: 100%;
    top: 16px;
    left: 0;
    text-align: center;
    pointer-events: none;
  }
  .alert-content{
    display: inline-block;
    padding: 8px16px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 01px6pxrgba(0, 0, 0, .2);
    margin-bottom: 8px;
  }
</style>

