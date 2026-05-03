// FORCE-UPDATE-v21ah 1777837013
self.addEventListener('install',function(e){e.waitUntil(self.skipWaiting());});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(names){return Promise.all(names.map(function(n){return caches.delete(n);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){e.respondWith(fetch(e.request.clone()).catch(function(){return caches.match(e.request);}));});
