/**
 * @file store
 */

import Vue from 'vue';
import axios from 'axios';
import Vuex from 'vuex';

Vue.use(Vuex);

const FETCH_NPM_DOWNLOADS = 'fetch-npm-downloads';

/**
 * create a new store instance
 */
export default function createStore() {
    return new Vuex.Store({
        state: {
            downloads: []
        },

        mutations: {
            [FETCH_NPM_DOWNLOADS] (state, { downloads }) {
                state.downloads = downloads;
            }
        },

        actions: {
            async fetchNpmDownloads({ commit }) {
                let url = `https://api.npmjs.org/downloads/range/2019-05-10:2019-06-10/`;
                
                let res = await axios.get(url);
                if (res.data) {
                    commit(FETCH_NPM_DOWNLOADS, res.data);
                }
            }
        }
    })
};


