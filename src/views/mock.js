const code =
`<template>
    <div>
        <input v-model="message">
        {{ message }}
    </div>
    <div class="test"></div>
</template>
<script>
    export default {
        data () {
            return {
                message: ''
            }
        }
    }
</script>
<style>
    .test {
        width: 100px;
        height: 100px;
        background-color: red;
    }
</style>
`;

export default code;