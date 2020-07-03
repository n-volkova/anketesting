<template>
    <section class="ready-step">
        <p><strong>{{ message }}</strong></p>
        <p>Тест содержит 50 вопросов. На выполнение теста дается 15 минут.</p>
        <p>Ответь на столько вопросов, на сколько сможешь, и не трать много времени на один вопрос.</p>
        <p>Работай как можно быстрее. Если какое-нибудь задание теста не получается, не задерживайся на нем слишком долго, переходи к следующему.</p>

        <h3>Образец:</h3>

        <div class="sample shadow-box">
            <kot-question 
                title="«Быстрый» является противоположным по смыслу слову:"
                :options="['тяжелый', 'упругий', 'скрытный', 'легкий', 'медленный']"
                correct="медленный"
                demo
                lock />
        </div>
        <p>Правильный ответ — «медленный».</p>
        <div v-if="isSingle" class="">
            <p>Если готов, укажи имя и фамилию.</p>

            <div class="input-wrapper js-input-wrapper">
                <input 
                    class="js-input"
                    v-model.trim.lazy="name"
                    v-validate="'required|min:5'"
                    type="text" 
                    autocomplete
                    name="first_last_name" 
                    ref="first_last_name"  
                    placeholder="Фамилия и имя"
                    @focus="onInvalidFocus($event)"
                />
                    <span class="error-message">{{ errors.first('first_last_name') }}</span>
            </div>
        </div>

        <p v-else>Если готов, жми кнопку!</p>

        <div class="button start-test" @click="toKot()">Погнали</div>
    </section>
</template>

<script>
    import KotQuestion from './KotQuestion'
    import scroll from 'vue-scrollto'

    export default {
        components: {
            KotQuestion
        },
        data() {
            return {
                name: ''
            }
        },
        computed: {
            isHot() {
                return this.$route.path === '/anketesting/hotline'
            },
            isSingle() {
                return this.$route.path === '/anketesting/kot'
            },
            message() {
                return this.isHot ? 'В поддержке ребята сталкиваются с большим количеством разноплановых задачек, а ответы клиентам дают не более, чем за три минуты. Проверим, готов ли ты работать в таком темпе!' 
                : 'В поддержке ребята сталкиваются с большим количеством разноплановых задачек, а ответы клиентам дают не более, чем за три минуты. Проверим, готов ли ты работать в таком темпе!'
            },
        },

        mounted() {
            scroll.scrollTo('#app', 300, { offset: -20 })
        },
        
        methods: {
            submit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$emit('name', this.name)
                        this.$emit('change', 'Kot')
                    } else {
                        let firstInvalid = document.querySelector('.invalid') 
                        scroll.scrollTo(firstInvalid, 300, { offset: -20 })
                    }
                })
            },
            toKot() {
                if (!this.isSingle) {
                    this.$emit('change', 'Kot')
                } else {
                    this.submit()
                }
            },
            onInvalidFocus(e) {
                let fieldname = e.currentTarget.getAttribute('name')
                if (this.fields[fieldname].invalid) {
                    this.$validator.flag(fieldname, {invalid: false})
                }
            },
        }
    }
</script>

<style lang="scss">

    .ready-step {
        padding: 40px;
        margin-top: 40px;
        @media (max-width: 600px) {
            margin-top: 0;
        }
        h3 {
            margin-bottom: 20px;
        }
        p {
            margin-bottom: 20px;
            font-size: 17px;
            line-height: 26px;
        }
        .shadow-box {
            padding: 20px 25px;
        }
        .sample {
            margin-bottom: 30px;
        }
        .input-wrapper {
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 30px;
        }
        .js-input {
            flex-shrink: 0;
            height: 60px;
            width: 580px;
            margin-right: 18px;
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
                margin-right: 0;
            }
        }
        .invalid {
            box-shadow: #ff4828 0px 0px 0px 1px inset;
        }
        .js-input:not(.invalid) + .error-message {
            display: none;
        }
        .error-message {
            position: absolute;
            left: 20px;
            bottom: -20px;
            color:  #ff4828;
        }
    }
    
</style>