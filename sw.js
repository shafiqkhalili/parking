/*const cacheName = 'DeluxP';
const filesToCache = [
    './',
    './index.html',
    './about.html',
    './adress.html',
    './booking.html',
    './contact.html',
    './services.html',
    './assets/icons/icon-128x128.png',
    './assets/icons/icon-144x144.png',
    './assets/icons/icon-152x152.png',
    './assets/icons/icon-192x192.png',
    './assets/icons/icon-384x384.png',
    './assets/icons/icon-512x512.png',
    './assets/icons/icon-72x72.png',
    './assets/icons/icon-96x96.png',
    './assets/adress-car.png',
    './assets/booking-img.jpg',
    './assets/contact-img.jpg',
    './assets/empty-parking.jpg',
    './assets/start-img.jpg',
    './assets/workshop.jpg',
    './css/main.css',
    './js/main.js'
];
*/
/* Start the service worker and cache all of the app's content */
/*
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});
*/
/* Serve cached content when offline */
/*
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});
*/
// Hey there! This is an over-simplified ServiceWorker for a tutorial.
// For any real apps, please use workboxjs.org or similar
// If you do want to use this, you'll need to update the file manually for every change to trigger an update
// Last modified: 2018-04-25 12:58PT

const cacheName = 'DeluxPark';
const staticAssets = [
    './',
    './index.html',
    './about.html',
    './adress.html',
    './booking.html',
    './contact.html',
    './services.html',
    './assets/icons/icon-128x128.png',
    './assets/icons/icon-144x144.png',
    './assets/icons/icon-152x152.png',
    './assets/icons/icon-192x192.png',
    './assets/icons/icon-384x384.png',
    './assets/icons/icon-512x512.png',
    './assets/icons/icon-72x72.png',
    './assets/icons/icon-96x96.png',
    './assets/adress-car.png',
    './assets/booking-img.jpg',
    './assets/contact-img.jpg',
    './assets/empty-parking.jpg',
    './assets/start-img.jpg',
    './assets/workshop.jpg',
    './css/main.css'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
});

// Optional: clents.claim() makes the service worker take over the current page
// instead of waiting until next load. Useful if you have used SW to prefetch content
// that's needed on other routes. But potentially dangerous as you are still running the
// previous version of the app, but with new resources.
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    const req = event.request;

    if (/.*(json)$/.test(req.url)) {
        event.respondWith(networkFirst(req));
    } else {
        event.respondWith(cacheFirst(req));
    }
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(req);
    return cachedResponse || networkFirst(req);
}

async function networkFirst(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        const cachedResponse = await cache.match(req);
        return cachedResponse;
    }
}