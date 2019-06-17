/**
 * @file entry client
 */

import Vue from 'vue';
import createApp from '../app';

Vue.mixin({
    // fetch data when the different path for the same route.
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options;
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next);
        } else {
            next();
        }
    }
});

const { app, store, router } = createApp();

if (window.__INITIAL_STATE__) {
    // initialize client state by server state.
    store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
    // render components related when the route changed.
    router.beforeResolve((to, from, next) => {
        // the matched components for current router.
        const matched = router.getMatchedComponents(to);
        // the matched components for last router.
        const prevMatched = router.getMatchedComponents(from);

        let diffed = false;
        // diff and filter the components which not be rendered.
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        });
        // get all hooks from activated components.
        const asyncDataHooks = activated.map(({ asyncData }) => {
            if (asyncData) {
                return asyncData({
                    store,
                    route: to
                })
            }
        });
        // execute all hooks method then go next page.
        Promise.all(asyncDataHooks).then(next).catch(next);
    });
    // mount vue instance to static html for hydration.
    app.$mount('#app');
});
