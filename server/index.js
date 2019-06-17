/**
 * @file server
 */

const fs = require('fs');
const path = require('path');
const express = require('express');
const LRU = require('lru-cache');

// server bundle for building server app instance
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
// client resource manifest
const clientManifest = require('../dist/vue-ssr-client-manifest.json');
// read html template string from index.html
const template = fs.readFileSync(path.resolve(__dirname, 'template/index.html'), 'utf-8');

// create renderer with server bundle and client manifest.
const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
    template: template,
    // auto inject client resource to html template
    clientManifest: clientManifest,
    runInNewContext: false
});

const app = express();
// at first, intercept static resource request such as png, js and css files.
app.use(express.static('./dist'));

// use cache
const useMicroCache = process.env.MICRO_CACHE !== 'false';
const microCache = new LRU({
    max: 100,
    maxAge: 5000 // cache 5 seconds
});

// intercept other resource request such as html files.
app.get('*', (req, res) => {
    // set response header
    res.setHeader('Content-Type', 'text/html');
    // renderer context
    const ctx = {
        title: 'vuessr',
        url: req.url
    };

    // read cache
    if (useMicroCache) {
        const hit = microCache.get(req.url);
        if (hit) {
            console.log('read from cache.')
            return res.end(hit);
        }
    }

    // create app instance and render it to static html.
    renderer.renderToString(ctx, (err, html) => {
        if (err) {
            const code = err.code || 500;
            res.status(code).end(JSON.stringify(err));
            return;
        }
        // return complete html content
        res.end(html);
        // set cache
        if (useMicroCache) {
            microCache.set(req.url, html);
        }
    })
});

app.listen(8080, () => {
    console.log('The server running at 8080...');
});
