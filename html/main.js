const highAccuracy = false;

window.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            if (registration.installing) {
                console.log("Service worker installing with scope:", registration.scope);
            } else if (registration.waiting) {
                console.log("Service worker installed with scope:", registration.scope);
            } else if (registration.active) {
                console.log("Service worker active with scope:", registration.scope);
            }
        }).catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
    }

    document.getElementById('startTracking').addEventListener('click', () => {
        if (navigator.geolocation) {
            console.log(`High Accuracy: ${highAccuracy}`)
            outputToBody(`HighAccuracy: ${highAccuracy}`)
            navigator.geolocation.getCurrentPosition((position) => {
                console.log('Current position:', position);

                let newElement = document.createElement("div");
                newElement.innerHTML += `${JSON.stringify(position)}<br/>`;
                document.getElementById("body").append(newElement);

            }, (error) => {
                console.error('Error getting location:', error);
                outputToError(error.message)
            }, {
                enableHighAccuracy: highAccuracy,
                timeout: 10000,
                maximumAge: 0
            });
        } else {
            console.log('Geolocation is not supported by this browser.');
            outputToError('Geolocation is not supported by this browser.')
        }
    });


    // Check if permissions are here
    navigator.permissions.query({name: "periodic-background-sync"})
        .then((status) => {
            console.log(`periodic background sync is ${status.state}`)
            outputToBody(`periodic background sync is ${status.state}`)
        }
    )
});
