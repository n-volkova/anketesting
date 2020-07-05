<template>
    <section class="profile-step">
        <div class="intro" v-html="message"></div>
        
        <div class="shadow-box">
            <slot name="progress"></slot>

            <form @submit.prevent="submit">
                <h2>Анкета</h2>
                <p>Заполните форму, и мы ответим в течение 2–3 рабочих дней.</p>

                <div class="profile-form">
                    <div class="input-wrapper js-input-wrapper">
                        <input 
                            class="js-input"
                            v-model.trim.lazy="profileData.name"
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
                    <div class="input-wrapper js-input-wrapper">
                        <input 
                            class="js-input" 
                            v-model.trim.lazy="profileData.email"
                            v-validate="'required|email'"
                            type="text"
                            autocomplete
                            name="email" 
                            ref="email" 
                            placeholder="Электронная почта"
                            @focus="onInvalidFocus($event)"
                        />
                        <span class="error-message">{{ errors.first('email') }}</span>
                    </div>
                    <div class="input-wrapper js-input-wrapper">
                        <input 
                            class="js-input" 
                            v-model="profileData.phone"
                            v-mask="'+7 (###) ###-##-##'"
                            v-validate="'required|length:18'"
                            data-vv-validate-on="none"
                            type="tel"
                            autocomplete="tel" 
                            name="phone" 
                            ref="phone" 
                            placeholder="Телефон (в формате +7 (9ХХ) ХХХ-ХХ-ХХ)"
                            @focus="onPhoneFocus"
                        />
                        <span class="error-message">{{ errors.first('phone') }}</span>
                    </div>
                    <div class="input-wrapper js-input-wrapper">
                        <textarea 
                            class="js-input"
                            v-model.trim.lazy="profileData.social"
                            v-validate="'url'"
                            type="text"
                            name="social" 
                            ref="social" 
                            placeholder="Ссылка на соцсеть"
                            rows="1"
                            @focus="onInvalidFocus($event)"
                        />
                        <span class="error-message">{{ errors.first('social') }}</span>
                        <label for="social" class="horizontal-label">Ссылка на ваш профиль в&nbsp;контакте или фейсбуке</label>
                    </div>

                    <div class="input-wrapper js-input-wrapper">
                        <textarea 
                            class="js-input" 
                            v-model.trim.lazy="profileData.cv"
                            v-validate="'url'"
                            type="text"
                            name="cv" 
                            ref="cv" 
                            placeholder="Ссылка на резюме"
                            rows="1"
                            @focus="onInvalidFocus($event)"
                        />
                        <span class="error-message">{{ errors.first('cv') }}</span>
                        <label for="cv" class="horizontal-label">Если есть</label>
                    </div>

                    <div class="input-wrapper js-input-wrapper">
                        <textarea 
                            class="js-input"
                            v-model.trim.lazy="profileData.about"
                            v-validate="'required|min:250'"
                            type="text"
                            name="about" 
                            ref="about" 
                            :placeholder="aboutPlaceholder"
                            rows="10"
                            @focus="onInvalidFocus($event)"
                        />
                        <span class="error-message">{{ errors.first('about') }}</span>
                        <label for="about" class="horizontal-label">Сопроводительные письма очень важны, потому что работа в чате напрямую связана с письменным выражением своих мыслей. Если письмо шаблонное или состоит из двух предложений (250 символов) — считаем, что его нет 🙂</label>
                    </div>

                    <div class="question-wrapper">
                        <div class="question-title">Откуда узнал про нашу вакансию?</div>
                        <div v-for="(option, index) in originOptions"
                            class="pretty p-smooth p-default p-curve"
                            :key="index">
                            <input 
                                type="radio"
                                :value="option"
                                name="origin"
                                ref="origin"
                                v-validate="'required'"
                                v-model="profileData.origin"
                                @focus="onInvalidFocus($event)"
                                @change="onCheckboxChange"
                            />
                            <div class="state p-success-o">
                                <label>{{ option }}</label>
                            </div>
                        </div>

                        <input
                            type="text"
                            class="question-input"
                            name="origin_text"
                            ref="origin_text"
                            :class="profileData.origin === 'Другое' ? 'expanded' : ''"
                            v-model.trim.lazy="origin_text"
                            @focus="onInvalidFocus($event)" />

                        <span class="error-message">{{ errors.first('origin_text') }}</span>
                        <span class="error-message">{{ errors.first('origin') }}</span>
                    </div>
                </div>

                <button 
                    class="button"
                    type="submit">
                        Перейти к тесту
                </button>

                <p class="agreement">Я соглашаюсь передать свои персональные данные, содержащиеся в анкете и всех приложенных файлах, в КИВИ Банк (АО) исключительно для того, чтобы КИВИ Банк (АО) мог предлагать мне вакансии. Я понимаю и соглашаюсь, что мои данные будут храниться и&nbsp;обрабатываться КИВИ Банк (АО) в&nbsp;течение десяти лет, в соответствии с&nbsp;Федеральным законом «О персональных данных».</p>
                <p class="get-card">Кстати, если у вас еще нет карты Рокетбанка, заказать можно <a href="https://rocketbank.ru/welcome/" class="external-link" target="_blank">здесь</a>.</p>
            </form>
        </div>
    </section>
</template>

<script>

import scroll from 'vue-scrollto'

export default {
    data() {
        return {
            formValid: false,
            profileData: {
                name: '',
                email: '',
                phone: '',
                social: '',
                cv: '',
                about: '',
                hero: '',
                quest: '',
                origin: '',
            },
            origin_text: '',
            aboutPlaceholder: 'Подробный рассказ о себе. Нам интересно и важно знать все\xa0— хобби, увлечения, достижения 🙂 Почему вы подойдете нам и как вы видите эту работу? Какие в ней могут быть трудности, как их решать? Какие плюсы и почему эта работа крутая?',
            originOptions: ['Реклама в соцсетях', 'HeadHunter', 'Рассказали друзья', 'Рассказали в ВУЗе/колледже', 'Другое'],
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
        message() {
            return `<p>Предлагаем тебе заполнить анкету и ответить на наши вопросы, чтобы мы начали знакомство с тобой. Сразу после анкеты тебя ждет два теста: на грамотность и на многозадачность. </p>
                        <div class="divider"></div>
                    <p><strong>Внимание!</strong> Тесты ограничены по времени, поэтому если прямо сейчас ты не готов к их прохождению, лучше всего приступить к заполнению анкеты когда будет удобно.</p>`
        }
    },
    methods: {
        onPhoneFocus() {
            if (this.profileData.phone === '' && !this.isMobile) {
                this.profileData.phone = '+7'
            }
            if (this.fields.phone.invalid) {
                this.$validator.flag('phone', {invalid: false})
            }
        },

        onInvalidFocus(e) {
            let fieldname = e.currentTarget.getAttribute('name')
            if (this.fields[fieldname].invalid) {
                this.$validator.flag(fieldname, {invalid: false})
            }
        },

        onCheckboxChange() {
            if (this.origin !== 'Другое') {
                this.origin_text = ''
            }
        },

        submit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    if (this.origin_text && this.profileData.origin === 'Другое') {
                        this.profileData.origin = this.origin_text
                    }
                    this.$emit('profileCompleted', this.profileData)

                } else {
                    let firstInvalid = document.querySelector('.invalid') 
                    scroll.scrollTo(firstInvalid, 300, { offset: -20 })
                }
            })
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.profile-step {
    form {
        padding-left: 60px;
        padding-right: 18px;
        padding-bottom: 20px;
        @media (max-width: 600px) {
            padding: 0;
        }
    }
    h2 {
        font-weight: 600;
        font-size: 40px;
        line-height: 38px;
        text-decoration: none;
        color: #000;
        margin-bottom: 23px;
    }
    p {
        margin-bottom: 20px;
        font-size: 17px;
        color: #121b21;
    }
    .divider {
        width: 100%;
        height: 1px;
        margin-bottom: 20px;
        background-color: rgba(0, 0, 0, .3);
    }
    .profile-form {
        margin-bottom: 15px;
    }
    textarea.js-input {
        height: auto;
        padding: 18px 20px;
        overflow: hidden;
    }
    .input-wrapper {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 30px;
    }
    .multiline {
        height: 249px;
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
    .vertical-label {
        display: block;
        margin-bottom: 10px;
        font-size: 18px;
    }
    .horizontal-label {
        width: 193px;
        font-weight: 300;
        font-size: 13px;
        letter-spacing: 0.3px;
        line-height: 18px;
        color: rgba(0, 0, 0, .6);
        @media (max-width: 600px) {
            display: none;
        }
    }
    .question-wrapper {
        position: relative;
    }
    .question-input {
        height: 0;
        margin-top: 0;
        transition: all .2s;
        &.expanded {
            height: 40px;
            margin-top: 15px;
        }
    }
    .agreement {
        position: relative;
        width: 550px;
        padding-left: 30px;
        margin: 40px 0 50px;
        font-weight: 300;
        font-size: 12px;
        letter-spacing: 0.3px;
        line-height: 18px;
        color: #000;
        @media (max-width: 600px) {
            width: 100%;
            padding-left: 0;
        }
        &:before {
            content: '';
            position: absolute;
            left: 0px;
            display: block;
            width: 21px;
            height: 21px;
            background: url('../assets/agree-icon.png') no-repeat;
            @media (max-width: 600px) {
                display: none;
            }
        }
    }
    .external-link {
        color: #0090ff;
        padding-bottom: 1px;
        &:hover {
            color: #837ddb;
        }
    }
    .get-card {
        padding-left: 30px;
        @media (max-width: 600px) {
            display: none;
        }
    }
}
</style>
