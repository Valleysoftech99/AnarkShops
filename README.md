# AnarkShop

Aplicación web progresiva para crear listas de compras y usarlas desde el celular.

## Ejecutar en local

Abre `index.html` con una extensión de servidor local, como Live Server en Visual Studio Code. El modo offline y la instalación PWA requieren `localhost` o un sitio publicado con HTTPS.

## Publicar

Publica el contenido de este repositorio en un hosting estático con HTTPS. La app usa `manifest.json` para la instalación y `sw.js` para guardar la shell y habilitar el uso sin conexión. La interfaz está en `index.html`, los estilos en `app.css` y el comportamiento en `app.js`.

Las listas, el perfil y las preferencias se guardan localmente en el navegador. Para compartir una lista con otro dispositivo, usa **Compartir → Compartir enlace de la app**; al abrir el enlace, la lista se importa en esa instalación.

## Funciones

- Listas independientes con importación de artículos desde texto.
- Edición de cantidades, marcas y precios.
- Modo de preparación y modo de compra con seguimiento de gastos.
- Temas oscuro y pastel, con elección inicial.
- Perfil local con avatar e idioma español o inglés.
- Instalación PWA y caché offline.
