if (navigator.serviceWorker) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register('sw.js').then(function(reg) {
      // If waiting, send message to service worker to skip waiting
      if (reg.waiting) {
        reg.waiting.postMessage({action: "skipWaiting"});
        return;
      }
      // If installing, wait for it and ask service worker to skip waiting
      if (reg.installing) {
        reg.installing.addEventListener("statechange", function() {
          if (this.state == "installed") {
            this.postMessage({action: "skipWaiting"});
            return;
          }
        });
      }
    });
  });
  navigator.serviceWorker.addEventListener("controllerchange", function() {
    window.location.reload();
    return;
  });
} else {
  console.log("Browser does not support service workers");
}