<template>
    <section class="kot-step">
        <div class="shadow-box">
            <slot name="progress"></slot>
            <div class="test-wrapper" >
                <countdown 
                    ref="countdown"
                    class="countdown"
                    :class="lastMinute ? 'red' : ''"
                    emit-events
                    tag="div"
                    :time="900000"
                    :transform="formatTime"
                    @end="onCountdownEnd">
                    <template slot-scope="props">
                        {{ props.minutes }}:{{ props.seconds }}
                    </template>
                </countdown>

                <test />

                <button id="saveKot" class="button" :class="btnDisabled ? 'disabled' : ''" @click="saveResult">
                    <transition name="fade" mode="out-in">
                        <spring-spinner v-if="sending" />
                        <span v-else>Отправить</span>
                    </transition>
                </button>
            </div>
        </div>
    </section>
</template>

<script>
    import Countdown from '@chenfengyuan/vue-countdown'
    import SpringSpinner from './SpringSpinner'
    import EventBus from '../eventBus'

    function randomTest() {
        let rand = 1 - 0.5 + Math.random() * 3
        return Math.round(rand)
    }
    
    export default {
        components: {
            Countdown, SpringSpinner,
            'test': () => import(`./KotTest1`)
        },
        data () {
            return {
                startCountdown: false,
                lastMinute: false,
                questionCount: 50,
                answers: [],
                sending: false
            }
        },
        computed: {
            allFilled() {
                let unanswered = this.answers.filter(function(item) {
                    return typeof item === 'undefined'
                })
                return unanswered.length <= 1 && this.answers.length > 0
            },
            btnDisabled() {
                if (this.allFilled && !this.sending) {
                    return false
                } else {
                    return true
                }
            }
        },
        mounted() {
            const unwatch = this.$watch('$refs.countdown.totalSeconds', function(newVal) {
                if (newVal === 60) {
                    this.lastMinute = true
                    unwatch()
                }
            }, {
                immediate: true
            })

            for (let i = 0; i < this.questionCount; i++) {
                this.answers.push(undefined)
            }

            let self = this
            EventBus.$on('answerChanged', answer => {
                self.answers.splice(answer.id, 1, answer.isCorrect)
            })
        },
        methods: {
            onCountdownEnd() {
                this.saveResult()
            },
            formatTime(props) {
                Object.entries(props).forEach(([key, value]) => {
                    // Adds leading zero
                    const digits = value < 10 ? `0${value}` : value;
                    props[key] = `${digits}`
                })
                return props
            },
            countResult() {
                let correctCount = this.answers.reduce((n, x) => n + (x === true), 0)
                return `${correctCount}/${this.questionCount}`
            },
            saveResult() {
                if (this.sending) return
                
                document.querySelector('#saveKot').focus()
                this.sending = true
                this.$emit('kotCompleted', this.countResult())
            },
        }
    }
</script>

<style lang="scss" scoped>
    .kot-step {
        .shadow-box {
            padding: 40px 20px;
            margin-top: 40px;
            @media (max-width: 600px) {
                margin-top: 0;
            }
        }
    }
    .kot-test {
        margin-bottom: 40px;
    }
    .countdown {
        margin-bottom: 20px;
        font-size: 40px;
        &.red {
            color: #bf0e0e;
        }
    }
    .kot-test {
        h2 {
            margin-bottom: 20px;
        }
        p {
            position: relative;
            margin-bottom: 33px;
            z-index: 0;
        }
    }
    p {
        font-size: 17px;
        line-height: 26px;
    }
    .test-wrapper {
        margin: 0 40px;
        @media (max-width: 600px) {
            margin: 0;
        }
        .button.disabled {
            pointer-events: none;
            opacity: .5;
        }
    }
    .spring-spinner {
        margin: 0 auto;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .9s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    
</style>