<template>
    <div class="question-wrapper">
        <div class="question-title">{{ title }}</div>
        
        <slot name="text"></slot>
        <slot name="image"></slot>
        <slot name="title"></slot>

        <input 
            v-if="!options.length" 
            type="text" 
            class="question-input"
            v-model.trim="values"
            @blur="onChange()">

        <template v-else>
            <div v-for="(option, index) in options"
                class="pretty p-smooth p-default p-curve"
                :class="lock ? 'p-locked' : ''"
                :key="index">
                <input 
                    :type="multiple ? 'checkbox' : 'radio'" 
                    :value="option"
                    v-model="values"
                    @change="multiple && checkMax(option), onChange()"
                />
                <div class="state p-success-o">
                    <label>{{ option }}</label>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import EventBus from '../eventBus'

    export default {
        components: {
        },
        props: {
            id: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            options: {
                type: Array,
                default: () => []
            },
            correct: {
                type: [String, Array],
                default: ''
            },
            demo: {
                type: Boolean,
                default: false
            },
            lock: {
                type: Boolean,
                default: false
            },
            multiple: {
                type: Boolean,
                default: false
            }, 
            max: {
                type: String,
                default: ''
            },
        },
        data () {
            return {
                values: null,
                disabled: false
            }
        },
        mounted() {
            if (this.demo) {
                this.values = this.correct
            } else if (this.multiple) {
                this.values = []
            }
        },
        methods: {
            checkMax(option) {
                if (this.values.length > this.max) {
                    this.values.shift()
                }
            },
            onChange() {
                EventBus.$emit('answerChanged', { id: this.id, isCorrect: this.isCorrect() })
            },
            isCorrect() {
                if (this.values === null) return false
                
                if (!this.options.length) {
                    let inputValue = this.values.replace(' ', '')
                    return this.correct.includes(inputValue)
                }
                if (this.values.sort) {
                    this.values.sort()
                }
                return this.values.toString() === this.correct.toString()
            }
        }
    }
</script>

<style lang="scss">
    @import '~pretty-checkbox/dist/pretty-checkbox.min.css';

    .question-wrapper {
        margin-bottom: 30px;
    }
    .question-title {
        font-size: 17px;
        font-weight: 600;
        margin-bottom: 20px;
        color: #000;
    }
    .question-input {
        height: 40px;
        background-color: #fff;
        -webkit-appearance: none;
        appearance: none;
        line-height: 1.2;
        border: 0;
        outline: 0;
        padding: 0 20px;
        resize: none;
        font-family: inherit;
        font-size: 18px;
        border-radius: 5px;
        box-shadow: #d6d6d6 0px 0px 0px 1px inset;
        @media (max-width: 600px) {
            width: 100%;
        }
    }
    .pretty {
        display: block;
        font-size: 17px;
        .state {
            label {
                text-indent: 2em;
                padding: 7px 0;
                &:before, &:after {
                    top: 7px;
                }
            }
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
