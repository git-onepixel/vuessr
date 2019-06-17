/**
 * @file router
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const home = r => require.ensure([], () => r(require('../pages/home.vue')), 'home');
const about = r => require.ensure([], () => r(require('../pages/about.vue')), 'about');

/**
 *  create a new router instance
 */
export default function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                redirect: '/home'
            },
            {
                path: '/home',
                component: home
            },
            {
                path: '/about',
                component: about
            }
        ]
    })
};

