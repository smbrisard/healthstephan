// v20zzA 1777819756
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.map(function(c){return caches.delete(c);}));}).then(function(){return self.clients.claim();}));});
