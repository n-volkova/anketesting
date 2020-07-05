<template>
    <div id='app'>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="scss">
    @import '/styles/fonts.scss';
    @import '/styles/main.scss';

    #app {
        width: 880px;
        margin: 0 auto;
        padding-bottom: 1px;
        @media (max-width: 600px) {
            width: 100%;
        }
    }
</style>
