// Service worker: guarda la plataforma y los juegos para que funcionen sin internet.
// Al cambiar cualquier archivo, subí el número de VERSION para que el celular baje la versión nueva.
const VERSION = 'juegos-v1';

const ARCHIVOS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-192.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './bucle/',
  './terminal-lab/',
  './problema-prototipo/'
];

// Instalación: descarga y guarda todos los archivos.
self.addEventListener('install', evento => {
  evento.waitUntil(
    caches.open(VERSION)
      .then(cache => cache.addAll(ARCHIVOS))
      .then(() => self.skipWaiting())
  );
});

// Activación: borra las copias de versiones anteriores.
self.addEventListener('activate', evento => {
  evento.waitUntil(
    caches.keys()
      .then(claves => Promise.all(claves.filter(c => c !== VERSION).map(c => caches.delete(c))))
      .then(() => self.clients.claim())
  );
});

// Pedidos: las páginas buscan primero en la red (para tener siempre lo último)
// y, si no hay conexión, usan la copia guardada. El resto usa primero la copia.
self.addEventListener('fetch', evento => {
  const pedido = evento.request;
  if (pedido.method !== 'GET') return;

  if (pedido.mode === 'navigate') {
    evento.respondWith(
      fetch(pedido)
        .then(respuesta => {
          const copia = respuesta.clone();
          caches.open(VERSION).then(cache => cache.put(pedido, copia));
          return respuesta;
        })
        .catch(() => caches.match(pedido).then(r => r || caches.match('./')))
    );
    return;
  }

  evento.respondWith(
    caches.match(pedido).then(guardada => {
      if (guardada) return guardada;
      return fetch(pedido).then(respuesta => {
        // Guarda también las tipografías de Google para usarlas sin conexión.
        if (respuesta.ok || respuesta.type === 'opaque') {
          const copia = respuesta.clone();
          caches.open(VERSION).then(cache => cache.put(pedido, copia));
        }
        return respuesta;
      });
    })
  );
});
