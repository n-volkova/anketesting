
<template>
    <router-view @profileCompleted="onProfileCompleted">
        <template v-slot:progress>
            <step-progress :steps="['Profile', 'Grammar', 'Kot']" :current-step="0" icon-class="check-icon" />
        </template>
    </router-view>
</template>

<script>
    import StepProgress from 'vue-step-progress'

    export default {
        components: {
            StepProgress,
        },
        methods: {
            onProfileCompleted(data) {
                this.$emit('profileCompleted', data)
                this.$emit('change', 'GrammarReady')
            }
        }
    }
</script>