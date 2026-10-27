// Service worker du site EMBT.
// Il sert à deux choses : rendre le site installable en application
// (donc en plein écran), et le garder consultable sans réseau.
//
// Stratégie : le réseau d'abord, le cache en secours.
// Tant qu'il y a du réseau, le visiteur voit toujours la version en ligne —
// une mise à jour du dépôt est donc visible tout de suite.
// Sans réseau, c'est la dernière version consultée qui s'affiche.

const CACHE = 'embt-v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(noms => Promise.all(noms.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const demande = e.request;
  if (demande.method !== 'GET') return;
  if (new URL(demande.url).origin !== location.origin) return;   // on laisse passer Google Fonts

  e.respondWith(
    fetch(demande)
      .then(reponse => {
        const copie = reponse.clone();
        caches.open(CACHE).then(c => c.put(demande, copie)).catch(() => {});
        return reponse;
      })
      .catch(() => caches.match(demande))
  );
});
