import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import ChatProfile from '@/views/ChatProfile.vue'

export default new Router({
    mode: 'history',
    routes: [
        { 
            path: process.env.NODE_ENV !== 'production' && '/',
            redirect: '/anketesting', 
        },
        { 
            path: '/anketesting',
            component: ChatProfile
        },
        {
            path: '/anketesting/chat',
            component: ChatProfile,
        }
    ]
})
