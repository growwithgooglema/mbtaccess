// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MBTAccess Service Worker ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
/* eslint-env serviceworker */
// Set up cache ID variable
const cacheID = 'mbtaccess-v1'

// Install: Open a cache, cache files, return any errors
self.addEventListener('install', event => {
  const filesToCache = [
    '/',
    '/about',
    '/universities',
    'https://code.jquery.com/jquery-3.3.1.slim.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
    'static/css/custom.css',
    'static/img/favicon.ico',
    'static/img/mbtaccess-about-google-maps.png',
    'static/img/mbtaccess-meetup-20180407-mit.jpg',
    'static/js/about.js',
    'static/js/date.js',
    'static/js/google-maps.js',
    'static/js/sw-install.js',
    'static/js/universities.js'
  ]
  console.log('Installing Service Worker and caching static assets')
  event.waitUntil(caches.open(cacheID).then(cache => {
    return cache.addAll(filesToCache).catch(error => {
      console.log(`Caching failed: ${error}.`)
    })
  }))
})

// Fetch: Intercept network fetch request and return resources from cache
self.addEventListener('fetch', event => {
  let cacheRequest = event.request
  let cacheUrlObj = new URL(event.request.url)
  if (cacheUrlObj.hostname !== 'localhost') {
    event.request.mode = 'no-cors'
  }
  if (event.request.url.indexOf('index.html') > -1) {
    const cacheURL = '/'
    cacheRequest = new Request(cacheURL)
  }
  if (event.request.url.indexOf('about.html') > -1) {
    const cacheURL = '/about'
    cacheRequest = new Request(cacheURL)
  }
  if (event.request.url.indexOf('universities.html') > -1) {
    const cacheURL = '/universities'
    cacheRequest = new Request(cacheURL)
  }
  event.respondWith(caches.match(cacheRequest)
    .then(response => {
      return (response || fetch(event.request).then(fetchResponse => {
        return caches.open(cacheID)
          .then(cache => {
            cache.put(event.request, fetchResponse.clone())
            return fetchResponse
          })
      }).catch(error => {
        throw (error)
      })
      )
    })
  )
})

// Get and handle messages from clients
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting()
  }
})

// Update cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheIDs => {
      return Promise.all(
        cacheIDs.filter(cache => {
          return cache.startsWith('mbtaccess-') && cache !== cacheID
        }).map(cache => {
          return caches.delete(cache).then(() => {
            console.log('Old cache deleted')
          }).catch(() => {
            console.log('Failed to get rid of old cache')
          })
        })
      )
    })
  )
})
