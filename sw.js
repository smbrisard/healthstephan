// FORCE-UPDATE-v21aa 1777825478
self.addEventListener('install',function(e){
  e.waitUntil(self.skipWaiting());
});
self.addEventListener('activate',function(e){
  e.waitUntil(
    caches.keys().then(function(names){
      return Promise.all(names.map(function(n){return caches.delete(n);}));
    }).then(function(){return self.clients.claim();})
    .then(function(){
      // Notify all clients to reload
      return self.clients.matchAll({type:'window'});
    }).then(function(clients){
      clients.forEach(function(client){client.navigate(client.url);});
    })
  );
});
self.addEventListener('fetch',function(e){
  // Always fetch fresh, never serve from cache
  e.respondWith(fetch(e.request.clone()).catch(function(){return caches.match(e.request);}));
});
