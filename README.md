# AnarkShop

Aplicación web progresiva para crear listas de artículos y usarlas desde el celular.

## Ejecutar en local

Abre `index.html` con un servidor local, por ejemplo Live Server en Visual Studio Code. La instalación PWA y el modo sin conexión requieren `localhost` o un sitio publicado con HTTPS.

## Publicar

Publica el contenido del repositorio en un hosting estático con HTTPS. `manifest.json` describe la instalación y `sw.js` conserva la shell para el uso sin conexión. La interfaz está en `index.html`, los estilos en `app.css` y la lógica en `app.js`.

## Datos e importación

El perfil y las listas se guardan en `localStorage` del navegador; no se sincronizan automáticamente entre dispositivos. Si falta la clave canónica `anarkshop-app-v2`, la app lee las listas del formato anterior `anarkshop-data-v1` y las migra al iniciar al formato actual.

Puedes pegar texto con un artículo por renglón. También se reconocen cantidades como `2 x Artículo` y `Artículo - 2`. La app no precarga listas ni artículos de ejemplo.

El contenido JSON de un enlace usa esta forma:

```json
{
  "name": "Nombre de la lista",
  "items": [
    { "name": "Artículo", "quantity": "2", "brand": "", "price": null, "checked": false }
  ]
}
```

La importación valida campos y límites, crea IDs locales nuevos y deja los artículos sin marcar. Los importes se muestran en ARS; el idioma cambia el formato regional de fecha y número.

## Compartir

**Compartir por WhatsApp** genera texto legible. **Compartir enlace de la app** codifica una copia de la lista como JSON en Base64 URL-safe. El enlace no cifra su contenido: puede incluir nombre de lista, artículos, cantidades, marcas y precios. Compártelo solo con personas autorizadas. Al abrirlo, se importa una nueva lista local; su título se guarda en el campo de nombre y no como artículo.

## Actualizaciones y uso sin conexión

El service worker almacena los archivos de la aplicación en cachés propias de AnarkShop. Cuando hay una versión nueva lista, la interfaz ofrece actualizar y recargar. Las cachés de otras aplicaciones del mismo origen se conservan. La actualización requiere conexión; después de instalar una versión, abre la app en línea para descargar sus recursos nuevos.

## Funciones

- Listas independientes con importación de texto.
- Edición de cantidades, marcas y precios.
- Modo de preparación y modo de uso con seguimiento de gastos.
- Temas oscuro y pastel.
- Perfil local con avatar e interfaz en español o inglés.
- Instalación PWA y acceso sin conexión a la shell de la aplicación.