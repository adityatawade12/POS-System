const staticCacheName = "site-cache";
const assets=[
    '/',
    '/index.html',
    '/pages/menu.html',
    '/js/app.js',
    '/js/materialize.min.js',
    '/js/ui.js',
    '/css/materialize.min.css',
    '/css/styles.css',
    '/img/dish.png',
    '/img/logo.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
];

self.addEventListener('install',evt=>{
    //console.log("service worker installed!");
    evt.waitUntil(
        caches.open(staticCacheName).then(cache=>{
            cache.addAll(assets);
        })
    );
    
});

self.addEventListener('activate',evt=>{
    console.log("service worker activated!");
});

self.addEventListener('fetch',evt=>{
    evt.respondWith(
        caches.match(evt.request).then(cacheRes=>{
            return cacheRes || fetch(evt.request);
        })
    );
});