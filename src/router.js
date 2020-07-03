import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import ChatProfile from '@/views/ChatProfile.vue'

export default new Router({
    mode: 'history',
    base: process.env.NODE_ENV === 'production' && '/anketesting',
    routes: [
        { 
            path: '/',
            component: ChatProfile
        },
    ]
})
