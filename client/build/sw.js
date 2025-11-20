// sw.js - Service Worker optimizado y corregido
const CACHE_NAME = 'agence-voyage-v2.1'; // Cambia la versión para forzar actualización
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/icon-web-01.png'
];

// Instalación
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Cache abierto');
        // Usamos addAll pero con manejo de errores para cada recurso
        return Promise.all(
          urlsToCache.map((url) => {
            return cache.add(url).catch((error) => {
              console.log(`❌ Error cacheando ${url}:`, error);
            });
          })
        );
      })
      .then(() => {
        console.log('✅ Todos los recursos cacheados');
        return self.skipWaiting();
      })
  );
});

// Activación
self.addEventListener('activate', (event) => {
  console.log('🎯 Service Worker activado');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Eliminando cache antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Reclamar clientes inmediatamente
      return self.clients.claim();
    })
  );
});

// Fetch - Estrategia mejorada
self.addEventListener('fetch', (event) => {
  // Skip para requests que no son GET
  if (event.request.method !== 'GET') return;

  // Para rutas de la API, usar Network First y no cachear
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // Solo devolver cache para API si hay un error de red
          return caches.match(event.request);
        })
    );
    return;
  }

  // Para navegación (HTML), usar Network First
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Verificar si la respuesta es válida
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // Si falla la red, devolver la página de inicio del cache
          return caches.match('/')
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Si no hay nada en cache, devolver una página offline básica
              return new Response('Offline', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({ 'Content-Type': 'text/html' })
              });
            });
        })
    );
    return;
  }

  // Para recursos estáticos (JS, CSS, imágenes), usar Cache First
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Si existe en cache, devolverlo
        if (cachedResponse) {
          return cachedResponse;
        }

        // Si no está en cache, buscar en la red
        return fetch(event.request)
          .then((response) => {
            // Verificar que la respuesta sea válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clonar la respuesta para guardarla en cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Fallback para diferentes tipos de recursos
            if (event.request.destination === 'image') {
              // Puedes devolver una imagen placeholder aquí
              return new Response('', {
                status: 404,
                statusText: 'Image Not Found'
              });
            }
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});