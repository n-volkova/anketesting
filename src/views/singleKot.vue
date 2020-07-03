<template>
    <transition name="fade" mode="out-in">
        <component 
            :is="`${current}Step`"
            @kotCompleted="onKotCompleted"
            @change="(step) => changeStep(step)"
            @name="(name) => profileData.name = name">
        </component>
    </transition>
</template>

<script>
import KotReadyStep from '@/components/KotReadyStep.vue'
import KotStep from '@/components/KotStep.vue'
import FinalStep from '@/components/FinalStep.vue'

export default {
    components: {
        KotReadyStep,
        KotStep,
        FinalStep,
    },
    data() {
        return {
            formValid: false,
            current: 'KotReady',
            profileData: {
                name: '',
                kot: ''
            },
        }
    },
    computed: {
        isMobile() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true
            } else {
                return false
            }
        },
    },
    methods: {
        changeStep(step) {
            this.current = step
        },
        onKotCompleted(resultCount) {
            this.profileData.kot = resultCount
            this.submit()
        },
        submit() {
            this.$http({
                url: 'saveToEkatKot',
                data: this.profileData,
                method: 'POST',
                withCredentials: true
            }).then(res => {
                this.changeStep('Final')
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>
