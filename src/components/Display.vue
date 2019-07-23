<template>
    <div ref="display"></div>
</template>

<script>
import Vue from 'vue'
export default {
    name: 'IDisplay',
    props: {
        code: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            html: '',
            js: '',
            css: '',
            component: null,
            styleId: ''
        }
    },
    watch: {
        code(val) {
            this.destroyComponent()
            this.renderCode()
        }
    },
    mounted() {
        this.renderCode()
    },
    methods: {
        getSoure(source, type) {
            const reg = new RegExp(`<${type}[^>]*>`)
            const matched = source.match(reg)

            return source.slice(matched.index + matched[0].length, source.lastIndexOf(`</${type}>`))
        },
        splitCode() {
            const code = this.code
            this.html = `<div id="app">${this.getSoure(code, 'template')}</div>`
            this.js = this.getSoure(code, 'script').replace('export default', 'return')
            this.css = this.getSoure(code, 'style')
        },
        renderCode() {
            this.splitCode()

            const {
                html, js
            } = this

            if (html !== '' && js !== '') {
                const options = new Function(this.js)()
                const Component = Vue.extend(Object.assign({
                    template: html
                }, options))
                this.component = new Component().$mount()

                this.$refs.display.appendChild(this.component.$el)

                if (this.css !== '') {
                    const style = document.createElement('style')
                    style.type = 'text/css'
                    this.id = Date.now()
                    style.id = this.id
                    style.innerHTML = this.css
                    document.getElementsByTagName('head')[0].appendChild(style)
                }
            }     
        },
        destroyComponent() {
            const target = document.getElementById(this.id)
            if (target) target.parentNode.removeChild(target)

            this.$refs.display.removeChild(this.component.$el)
            this.component.$destroy()
            this.component = null
        }
    },
    beforeDestroy() {
        this.destroyComponent()
    }
}
</script>

