// public/sw-register.js
// Registers the RemoteRozgar service worker safely (no dangerouslySetInnerHTML needed)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js')
      .then(function (registration) {
        console.log('RemoteRozgar PWA ServiceWorker registered with scope:', registration.scope);
      })
      .catch(function (err) {
        console.warn('RemoteRozgar PWA ServiceWorker registration failed:', err);
      });
  });
}
