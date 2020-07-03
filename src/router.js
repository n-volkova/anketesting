import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import ChatProfile from '@/views/ChatProfile.vue'
import HotlineProfile from '@/views/HotlineProfile.vue'

export default new Router({
    mode: 'history',
    routes: [
        { 
            path: '/anketesting/',
            redirect: '/anketesting/chat', 
        },
        {
            path: '/anketesting/chat',
            component: ChatProfile,
        },
        { 
            path: '/anketesting/hotline',
            component: HotlineProfile 
        },
    ]
})
