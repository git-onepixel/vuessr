/**
 * @file create app 
 */

import Vue from 'vue';
import root from './components/root';
import createStore from './store';
import createRouter from './router';
import { sync } from 'vuex-router-sync';
import 'babel-polyfill';

/**
 * create a new app instance.
 */
export default function createApp() {
    const store = createStore();
    const router = createRouter();

    sync(store, router);

    const app = new Vue({
        store,
        router,
        render: h => h(root)
    });

    return { app, store, router };
};