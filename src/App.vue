<template>
    <div id='app'>
        <transition name="fade" mode="out-in">
            <component 
                :is="`${current}Step`" 
                @profileCompleted="onProfileCompleted"
                @grammarCompleted="onGrammarCompleted"
                @kotCompleted="onKotCompleted"
                @change="(step) => changeStep(step)">
                    <template v-slot:progress>
                        <step-progress :steps="steps" :current-step="currentIndex" icon-class="check-icon"></step-progress>
                    </template>
            </component>
        </transition>
    </div>
</template>

<script>

import StepProgress from 'vue-step-progress'
import ProfileStep from './components/ProfileStep.vue'
import GrammarReadyStep from './components/GrammarReadyStep.vue'
import GrammarStep from './components/GrammarStep.vue'
// KOT - это краткий отборочный тест  Σ:з
import KotReadyStep from './components/KotReadyStep.vue'
import KotStep from './components/KotStep.vue'
import FinalStep from './components/FinalStep.vue'

export default {
    name: 'app',
    components: {
        StepProgress,
        ProfileStep,
        GrammarReadyStep,
        GrammarStep,
        KotReadyStep,
        KotStep,
        FinalStep,
    },
    data () {
        return {
            current: 'Profile',
            steps: ['Profile', 'Grammar', 'Kot'],
            profileData: null,
        }
    },
    computed: {
        currentIndex() {
            return this.steps.indexOf(this.current)
        },
        isHot() {
            return this.$route.path.indexOf('hotline') !== -1 || this.$route.path.indexOf('Hotline') !== -1
        },
        isEkat() {
            return this.$route.path.indexOf('ekat') !== -1 || this.$route.path.indexOf('kot') !== -1 
        },
        url() {
            if (this.isHot && !this.isEkat) {
                return 'saveToHotline'

            } else if (!this.isHot && !this.isEkat) {
                return 'saveToChat'

            } else if (this.isHot && this.isEkat) {
                return 'saveToEkatHotline'

            } else if (!this.isHot && this.isEkat) {
                return 'saveToEkatChat'
            }
        },
    },
    mounted() {
        if (this.isEkat) {
            document.body.classList.add('ekat')
        }
    },
    methods: {
        changeStep(step) {
            this.current = step
        },
        onProfileCompleted(profile) {
            this.profileData = profile
        },
        onGrammarCompleted(resultCount) {
            this.profileData.grammar = resultCount

            if (this.isEkat) {
                this.submit()
            }
        },
        onKotCompleted(resultCount) {
            this.profileData.kot = resultCount
            this.submit()
        },
        submit() {
            this.$http({
                url: this.url,
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

<style lang="scss">
    @import '/styles/fonts.scss';
    @import '/styles/main.scss';
    @import '/styles/steps.scss';

    #app {
        width: 880px;
        margin: 0 auto;
        padding-bottom: 1px;
        @media (max-width: 600px) {
            width: 100%;
        }
    }

    .intro {
        width: 100%;
        padding: 0 20px;
        margin-top: 40px;
        hr {
            margin: 20px 0;
        }
        p {
            margin-bottom: 20px;
            font-size: 18px;
        }
    }
    
    .shadow-box {
        width: 100%;
        margin-bottom: 40px;
        background-color: #fff;
        box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, .1);
        border-radius: 10px;
        @media (max-width: 600px) {
            padding: 0 20px 20px;
            margin: 0;
            box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, .1);
            border-radius: 10px;
        }
    }
    .button {
        position: relative;
        display: inline-block;
        -webkit-tap-highlight-color: transparent;
        -webkit-appearance: none;
        border: none;
        cursor: pointer;
        vertical-align: top;
        height: 60px;
        width: 580px;
        line-height: 60px;
        background-color: #0090ff;
        border-radius: 5px;
        box-shadow: #000 0px 0px 0px 0px inset;
        font-family: inherit;
        font-style: normal;
        font-weight: 500;
        color: #fff;
        font-size: 21px;
        text-align: center;
        transition: all .15s linear;
        &:hover {
            background-color: #837ddb;
        }
        @media (max-width: 600px) {
            width: 100%;
        }
    }
    .ekat {
        .button {
            background-color: #FF5F0A;
            &:hover {
                background-color: #d35b27;
            }
        }
        .profile-step {
            .agreement:before {
                background: url('./assets/agree-icon-orange.png') no-repeat;
            }
            .external-link {
                color: #FF5F0A;
            }
            &:not(.single-profile) form p {
                color: #121b21;
            }
        }
        .profile-step p,
        .ready-step p,
        .ready-step h3 {
            color: #fff;
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
