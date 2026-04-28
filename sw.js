// v20w 1777394055
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.map(function(c){return caches.delete(c);}));}).then(function(){return self.clients.claim();}));});
