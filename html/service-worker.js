const cacheName = "antaliepte-pwa"
const filesToCache = [
    '/'
]

// Start the service worker and cache all of the app's content
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

// Serve cached content when offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('sync', (event) => {
    outputToBody(JSON.stringify(event))
    if (event.tag === 'location-sync') {
        event.waitUntil(trackLocation());
    }
});

async function trackLocation() {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        });

        const response = await fetch('/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        console.log('Location updated:', position);
    } catch (error) {
        console.error('Error tracking location:', error);
    }
}
