<template>
    <section class="grammar-step">
        <div class="shadow-box">
            <slot name="progress"></slot>
            <div class="test-wrapper" :class="sending ? 'disabled-gaps': ''" >
                <countdown 
                    ref="countdown"
                    class="countdown"
                    :class="lastMinute ? 'red' : ''"
                    emit-events
                    tag="div"
                    :time="420000"
                    :transform="formatTime"
                    @end="onCountdownEnd">
                    <template slot-scope="props">
                        {{ props.minutes }}:{{ props.seconds }}
                    </template>
                </countdown>

                <test @gapData="setGapData" />

                <div class="button" :class="allFilled ? '' : 'disabled'" @click="saveResult">
                    <transition name="fade" mode="out-in">
                        <span>Отправить</span>
                    </transition>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Countdown from '@chenfengyuan/vue-countdown'
    import SpringSpinner from './SpringSpinner'
    import EventBus from '../eventBus'

    function randomInteger() {
        let rand = 1 - 0.5 + Math.random() * 3
        return Math.round(rand)
    }

    const randomTestId = randomInteger()
    
    export default {
        components: {
            Countdown, SpringSpinner,
            'test': () => import(`./GrammarTest${randomTestId}`)
        },
        data () {
            return {
                startCountdown: false,
                lastMinute: false,
                gapCount: null,
                variants: null,
                gaps: [],
                chosenVariants: [],
                sending: false
            }
        },
        computed: {
            allFilled() {
                return !this.chosenVariants.includes(undefined) && this.chosenVariants.length !== 0
            },
            isEkat() {
                return this.$route.path.indexOf('ekat') !== -1 
            }
        },
        mounted() {
            window.gtag('event', 'test_chat', { event_category: 'general'})
            
            const unwatch = this.$watch('$refs.countdown.totalSeconds', function(newVal) {
                if (newVal === 60) {
                    this.lastMinute = true
                    unwatch()
                }
            }, {
                immediate: true
            })

            let self = this
            EventBus.$on('gapChanged', gap => {
                self.gaps.splice(gap.id, 1, gap.isCorrect)
                self.chosenVariants.splice(gap.id, 1, gap.chosen)
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
            setGapData(variants) {
                this.gapCount = variants.length
                this.variants = variants
                variants.forEach(item => {
                    this.gaps.push(undefined)
                    this.chosenVariants.push(undefined)
                })
            },
            countResult() {
                let correctCount = this.gaps.reduce((n, x) => n + (x === true), 0)
                let mistakes = []

                if (this.gapCount - correctCount <= 8 && this.gapCount !== correctCount) {
                    this.gaps.forEach((gap, index) => {
                        if (!gap) {
                            mistakes.push(`${index + 1}(${this.chosenVariants[index]})`)
                        }
                    })
                    return `Тест №${randomTestId}\n${correctCount}/${this.gapCount}\n${mistakes.join(', ')}`

                } else {
                    return `${correctCount}/${this.gapCount}`
                }
            },
            saveResult() {
                if (this.sending) return
                
                this.sending = true
                this.$emit('grammarCompleted', this.countResult())

                if (!this.isEkat) {
                    this.$emit('change', 'KotReady')
                }
            }
        }
    }
</script>

<style lang="scss">
    .grammar-step {
        .shadow-box {
            padding-bottom: 40px;
            margin-top: 40px;
            @media (max-width: 600px) {
                margin-top: 0;
            }
        }
    }
    .disabled-gaps  {
        .gap-wrapper {
            pointer-events: none;
            cursor: auto;
        }
        .gap, .gap.empty {
            background-color: #d6d6d6;
        }
    }
    .grammar-test {
        margin-bottom: 40px;
        user-select: none;
    }
    .countdown {
        margin-bottom: 20px;
        font-size: 40px;
        &.red {
            color: #bf0e0e;
        }
    }
    .grammar-test {
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
            margin: 0 20px;
        }
        .button.disabled {
            pointer-events: none;
            opacity: .5;
        }
    }
    .spring-spinner {
        margin: 14px auto 0;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .9s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    
</style>