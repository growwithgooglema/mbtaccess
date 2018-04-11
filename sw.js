// Service worker script
// Cache static files and images
// Cache GET and POST requests, especially API calls

var cacheName = 'gwg-mbta-v4';
var key = "AIzaSyBkvLRF67g3vk9YnX_rNjErv3UTdJhqdmQ";
var staticScripts = [
  "https://code.jquery.com/jquery-3.2.1.slim.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
  "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js",
  "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
  "https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css",
  "https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js",
  "https://api-v3.mbta.com/stops",
  "data/cleaner_universities.json",
  "index.html",
  "static/js/index.js",
  "static/js/dbCaching.js",
  "static/js/localforage.min.js",
  "static/js/utilities.js"
];

self.addEventListener('fetch', function(event) {
  var requestUrl = event.request.url;
  var responseCaches = !requestUrl.includes('datatables') && !requestUrl.includes('maps') && !requestUrl.includes(key) && !requestUrl.includes('fonts.googleapis');
  if (responseCaches) {
    // console.log(event.request.url);
    event.respondWith(caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request).then(function(response) {
          if (!response.ok) throw Error(response.statusText);
          return response;
        }).then(function(response) {
          var toCache = response.clone();
          cache.put(event.request, toCache);
          return response;
        }).catch(function(error) {
          console.log(`Encountered: ${error.message}.`);
        });
      });
    }));
    return;
  }
});

// Cache static stuff during install
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      var staticRequests = staticScripts.map(function(script) {
        return new Request(script, {mode: 'no-cors'});
      });
      return cache.addAll(staticScripts);
    })
  );
});

// Get and handle messages from clients
self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cache) {
          return cache.startsWith('gwg-mbta-') && cache != cacheName;
        }).map(function (cache) {
          return caches.delete(cache).then(function () {
            console.log('Old cache deleted');
          }).catch(function () {
            console.log('Failed to get rid of old cache');
          });
        })
      );
    })
  );
});