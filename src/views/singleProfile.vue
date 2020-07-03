<template>
    <section class="profile-step single-profile">
        <form @submit.prevent="!sending && submit()">
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
                        rows="8"
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

            <button class="button" type="submit">
                <transition name="fade" mode="out-in">
                    <spring-spinner v-if="sending" />
                    <span v-else>Отправить</span>
                </transition>
            </button>

            <p class="agreement">Я соглашаюсь передать свои персональные данные, содержащиеся в анкете и всех приложенных файлах, в КИВИ Банк (АО) исключительно для того, чтобы КИВИ Банк (АО) мог предлагать мне вакансии. Я понимаю и соглашаюсь, что мои данные будут храниться и&nbsp;обрабатываться КИВИ Банк (АО) в&nbsp;течение десяти лет, в соответствии с&nbsp;Федеральным законом «О персональных данных».</p>
            <p class="get-card">Кстати, если у вас еще нет карты Рокетбанка, заказать можно <a href="https://rocketbank.ru/welcome/" class="external-link" target="_blank">здесь</a>.</p>
        </form>
    </section>
</template>

<script>

import scroll from 'vue-scrollto'
import SpringSpinner from '@/components/SpringSpinner'

export default {
    components: {
        SpringSpinner
    },
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
            aboutPlaceholder: 'Подробный рассказ о себе',
            originOptions: ['Реклама в соцсетях', 'HeadHunter', 'Рассказали друзья', 'Рассказали в ВУЗе/колледже', 'Другое'],
            sending: false
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
        role() {
            return this.$route.query.role
        },
        url() {
            // processing
            // processingCap
            // workflow
            // workflowCap
            // supportCap
            // antiFraud

            return `saveToEkatProfile?role=${this.role}`
        },
    },
    mounted() {
        document.body.classList.add('ekat')
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
                    
                    this.sending = true

                    this.$http({
                        url: this.url,
                        data: this.profileData,
                        method: 'POST',
                        withCredentials: true
                    }).then(res => {
                        window.top.location.href = "https://allstars-ekat.rocketbank.ru/thanks/"
                    })
                    .catch(error => {
                        console.log(error)
                        this.sending = false
                    })

                } else {
                    let firstInvalid = document.querySelector('.invalid') 
                    scroll.scrollTo(firstInvalid, 300, { offset: -20 })
                }
            })
        },
    }
}
</script>

<style lang="scss">
    .single-profile {
        padding-top: 30px;
        @media (max-width: 600px) {
            padding: 20px 20px 0;
        }
        form {
            padding-bottom: 0;
        }
        .get-card {
            margin-bottom: 0;
        }
        .question-title,
        .question-wrapper,
        p {
            color: #fff;
        }
        &.profile-step .horizontal-label {
            color: rgba(255, 255, 255, 0.6);
        }
        @media (max-width: 600px) {
            .agreement {
                margin-bottom: 0;
            }
        }
    }
</style>