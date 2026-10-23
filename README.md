# AnarkShop

Aplicación web progresiva para crear listas de compras y usarlas desde el celular.

## Ejecutar en local

Abre `index.html` con una extensión de servidor local, como Live Server en Visual Studio Code. El modo offline y la instalación PWA requieren `localhost` o un sitio publicado con HTTPS.

## Publicar

Publica el contenido de este repositorio en un hosting estático con HTTPS. La app usa `manifest.json` para la instalación y `sw.js` para guardar la shell y habilitar el uso sin conexión. Las listas y preferencias se guardan en el almacenamiento local del navegador.

## Funciones

- Listas independientes con importación de artículos desde texto.
- Edición de cantidades, marcas y precios.
- Modo de preparación y modo de compra con seguimiento de gastos.
- Temas oscuro y pastel, con elección inicial.
- Instalación PWA y caché offline.
