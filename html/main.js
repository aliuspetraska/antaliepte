const highAccuracy = false;
const timeout = 10_000;

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

            navigator.serviceWorker.addEventListener('message', event => {
                outputToBody(`Received message: ${JSON.stringify(event)}`)
                navigator.serviceWorker.ready.then(reg => {
                    navigator.geolocation.getCurrentPosition(position => {
                        reg.active.postMessage(position)
                    })
                })
            })
        }).catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
    }

    document.getElementById('startTracking').addEventListener('click', () => {
        if (navigator.geolocation) {
            console.log(`High Accuracy: ${highAccuracy}`)
            outputToBody(JSON.stringify({
                HighAccuracy: highAccuracy,
                TimeoutInS: timeout / 1_000,
            }))
            navigator.geolocation.getCurrentPosition((position) => {
                console.log('Current position:', position);

                const {altitude, longitude, accuracy, heading, latitude, altitudeAccuracy, speed} = position.coords

                outputToBody(JSON.stringify({
                    altitude,
                    longitude,
                    latitude,
                    accuracy,
                    heading,
                    altitudeAccuracy,
                    speed
                }))

            }, (error) => {
                console.error('Error getting location:', error);
                outputToError(error.message)
            }, {
                enableHighAccuracy: highAccuracy,
                timeout,
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
        ).catch(error => {
        console.error(error)
        outputToError(`Something went wrong with permission query: ${error.message}`)
    })
});
