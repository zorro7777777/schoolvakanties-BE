// ============================================================
// Schoolvakanties België — Service Worker v1.0.0
// Auteur: De Poortere Andy <andy.depoortere@gmail.com>
// Gegenereerd met: Claude AI Sonnet 4.6
// ============================================================

const CACHE_NAME = 'schoolvak-v1.0.0';
const OFFLINE_PAGE = './index.html';

// Bestanden die gecached worden voor offline gebruik
const CACHE_FILES = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './favicon-32.png',
  './favicon-16.png',
];

// ── INSTALL ──────────────────────────────────────────────────
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[SW] Caching app shell');
      return cache.addAll(CACHE_FILES);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// ── ACTIVATE ─────────────────────────────────────────────────
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) {
          return key !== CACHE_NAME;
        }).map(function(key) {
          console.log('[SW] Verwijder oude cache:', key);
          return caches.delete(key);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// ── FETCH (offline-first) ─────────────────────────────────────
self.addEventListener('fetch', function(event) {
  // Alleen GET requests cachen
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;
      // Niet in cache: probeer netwerk
      return fetch(event.request).then(function(response) {
        // Sla op in cache voor volgende keer
        if (response && response.status === 200) {
          var responseClone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      }).catch(function() {
        // Offline en niet in cache: geef de app zelf terug
        return caches.match(OFFLINE_PAGE);
      });
    })
  );
});

// ── PUSH NOTIFICATIES ─────────────────────────────────────────
self.addEventListener('push', function(event) {
  var data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch(e) {
    data = { title: 'Schoolvakanties', body: event.data ? event.data.text() : '' };
  }

  var title   = data.title  || 'Schoolvakanties België';
  var body    = data.body   || 'Herinnering schoolvakantie';
  var icon    = data.icon   || './icon-192.png';
  var badge   = data.badge  || './favicon-32.png';
  var tag     = data.tag    || 'schoolvak-notif';
  var url     = data.url    || './index.html';

  event.waitUntil(
    self.registration.showNotification(title, {
      body:    body,
      icon:    icon,
      badge:   badge,
      tag:     tag,
      vibrate: [200, 100, 200],
      data:    { url: url },
      actions: [
        { action: 'open',    title: 'Bekijk kalender' },
        { action: 'dismiss', title: 'Sluiten' }
      ]
    })
  );
});

// ── NOTIFICATIE KLIK ─────────────────────────────────────────
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'dismiss') return;

  var targetUrl = (event.notification.data && event.notification.data.url)
    ? event.notification.data.url
    : './index.html';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // Als de app al open is, focus dan op dat venster
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url.includes('schoolvakanties') && 'focus' in client) {
          return client.focus();
        }
      }
      // Anders open een nieuw venster
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// ── BACKGROUND SYNC (vakantieherinneringen) ───────────────────
self.addEventListener('sync', function(event) {
  if (event.tag === 'schoolvak-reminder') {
    event.waitUntil(checkVakantieReminders());
  }
});

function checkVakantieReminders() {
  // Wordt aangeroepen door background sync
  // Leest geplande herinneringen uit IndexedDB (indien aanwezig)
  return Promise.resolve();
}

// ── MESSAGE (van main thread) ─────────────────────────────────
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'PLAN_NOTIF') {
    var d = event.data;
    var delay = d.delay || 0;
    if (delay <= 0) {
      self.registration.showNotification(d.title || 'Schoolvakantie', {
        body:  d.body  || '',
        icon:  './icon-192.png',
        badge: './favicon-32.png',
        tag:   d.tag   || 'schoolvak',
        vibrate: [200, 100, 200]
      });
    }
  }
});
