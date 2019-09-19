var cacheName = 'DeluxParking';
var filesToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/adress.html',
    '/booking.html',
    '/contact.html',
    '/services.html',
    '/assets/icons/icon-128x128.png',
    '/assets/icons/icon-144x144.png',
    '/assets/icons/icon-152x152.png',
    '/assets/icons/icon-192x192.png',
    '/assets/icons/icon-384x384.png',
    '/assets/icons/icon-512x512.png',
    '/assets/icons/icon-72x72.png',
    '/assets/icons/icon-96x96.png',
    '/assets/adress-car.png',
    '/assets/booking-img.jpg',
    '/assets/contact-img.jpg',
    '/assets/empty-parking.jpg',
    '/assets/start-img.jpg',
    '/assets/workshop.jpg',
    '/css/main.css',
    '/js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});