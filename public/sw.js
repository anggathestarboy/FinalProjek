let CACHE_NAME = "pwa-v1";
let TAMPILAN_OFFLINE = "/offline.html"


let ASSETS = [
    TAMPILAN_OFFLINE,
    "/aksata1.png"
]



self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS)
    }))

    self.skipWaiting();
})



self.addEventListener('fetch', (e) => {
    e.respondWith(fetch(e.request).catch(() => {
        if (e.request.mode === "navigate") {
            return caches.match(TAMPILAN_OFFLINE)
        }

        return caches.match(e.request)
    }))
})

