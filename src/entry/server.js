/**
 * @file entry server
 */

import createApp from '../app';

/**
 * The method will be called by renderer.
 * @param {*} context renderer context
 */
export default function (context) {
    // return a promise to renderer.
    return new Promise((resolve, reject) => {

        const { app, store, router } = createApp();

        // set current router.
        router.push(context.url);

        // awaiting async router to resolve.
        router.onReady(() => {
            // get matched components from current router.
            const matchedComponents = router.getMatchedComponents();
            // return 404 if there is no matched components.
            if (!matchedComponents.length) {
                reject({ code: 404 });
            }
            // get all hooks from matched components.
            const asyncDataHooks = matchedComponents.map(({ asyncData }) => {
                if (asyncData) {
                    return asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            });
            // execute all hooks of matched components synchronously.
            // fetch data from server and fill it to store.
            Promise.all(asyncDataHooks).then(() => {
                // serialize the state and set it to `window.__INITIAL_STATE__`.
                context.state = store.state;
                // return app instance to renderer.
                resolve(app);
            }).catch(reject);
        });
    });
};