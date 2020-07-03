import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import router from './router'

import VeeValidate, { Validator } from 'vee-validate'
import ru from 'vee-validate/dist/locale/ru'

import VueMask from 'v-mask'
import { registerPath } from '@/utils'

Vue.use(router)

Validator.localize({ ru: ru })
const dict = {
    custom: {
        first_last_name: {
            min: () => 'Имя слишком короткое',
            required: 'Обязательное поле'
        },
        email: {
            required: 'Обязательное поле',
            email: 'Неправильный email'
        },
        phone: {
            length: () => 'Телефон слишком короткий',
            required: 'Обязательное поле'
        },
        social: {
            url: 'Неправильный формат ссылки'
        },
        cv: {
            url: 'Неправильный формат ссылки'
        },
        about: {
            min: () => 'Не похоже на подробный рассказ :(',
            required: 'Обязательное поле'
        },
        startup: {
            required: 'Обязательное поле'
        },
        rocket: {
            required: 'Обязательное поле'
        },
        origin: {
            required: 'Обязательное поле'
        },
    }
}
  
Validator.localize('ru', dict)

Vue.use(VeeValidate, {
    locale: 'ru',
    classes: true
})

Vue.use(VueMask)

Vue.config.productionTip = false

Vue.prototype.$http = axios

registerPath()

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
