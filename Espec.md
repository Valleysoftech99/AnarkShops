# Auditoría técnica y plan de mejora — AnarkShop

## Alcance

Revisión estática de `index.html`, `app.js`, `app.css`, `sw.js`, `manifest.json` y `README.md`, siguiendo `Agent.md`. Después se implementó la Fase 1 únicamente en `app.js`. No se ejecutaron pruebas. El estado Git ya incluía `Create.md` eliminado y `Agent.md` e `Improvements.md` sin seguimiento; se dejaron intactos.

## Evaluación

La aplicación es una PWA pequeña, sin dependencias externas y con estado local. La separación de la lógica activa en `app.js` y el escape de texto de usuario en los puntos principales que se interpolan a HTML son buenas bases. Los problemas principales son de validación en los límites, almacenamiento síncrono redundante, actualización/offline del service worker y duplicación de código y estilos.

### Hallazgos priorizados de la revisión inicial

| Prioridad | Área | Hallazgo y efecto | Referencia |
|---|---|---|---|
| Alta | Validación / seguridad | `normalizeItem` y `normalizeList` normalizan tipos, pero no aplican límites de longitud, cantidad de elementos ni esquema completo. La importación compartida acepta JSON arbitrariamente grande; también admite precios negativos. Un enlace manipulado puede consumir memoria, generar renders pesados o contaminar datos. | `app.js:26-47`, `app.js:302-305`, `app.js:320-331` |
| Alta | Privacidad | El enlace compartido codifica la lista completa en Base64 dentro de la URL. Base64 no cifra el contenido y la URL puede quedar en historial o registros de servicios intermedios. No se comparte el perfil, pero sí nombres, marcas, cantidades y precios de artículos. | `app.js:297-318` |
| Alta | PWA / caché | `sw.js` responde cache-first a recursos estáticos. Si solo se actualiza `app.js` o `app.css` y no se publica una revisión de `sw.js`, el usuario puede continuar recibiendo la copia anterior. Además, la activación borra todas las cachés del origen excepto la propia, aunque CacheStorage se comparte entre apps del mismo origen. | `sw.js:1-7`, `sw.js:18-22` |
| Media | Persistencia / rendimiento | Cada guardado serializa todas las listas dos veces: una en `anarkshop-app-v2` y otra en `anarkshop-data-v1`. La edición de cantidad y precio persiste desde eventos `input`, es decir, potencialmente en cada tecla. `localStorage` es síncrono y el trabajo crece con todos los datos. | `app.js:77-80`, `app.js:377-387` |
| Media | Manejo de errores | `defaultTheme()` lee `localStorage` sin `try/catch`; en navegadores con almacenamiento bloqueado puede detener el arranque. Los errores de carga de datos, registro del service worker y algunos procesos de caché se descartan sin diagnóstico ni estado alternativo visible. | `app.js:25`, `app.js:38-47`, `app.js:442`; `sw.js:13-22` |
| Media | Service worker | Las escrituras de caché en `fetch` no se agregan a `event.waitUntil`, así que el worker puede terminar antes de que concluya el guardado. El fallback devuelve `index.html` también para solicitudes de recursos que fallan, ocultando errores de archivos con una respuesta HTML. | `sw.js:9-22` |
| Media | Código muerto / mantenimiento | `index.html` conserva la aplicación anterior dentro de `<script type="text/plain" id="legacy-app-script">`; no se ejecuta y duplica lógica ya activa en `app.js`. También conserva un bloque `<style>` antiguo junto a `app.css`, con reglas y variables repetidas que complican saber qué estilos prevalecen. | `index.html:14-24`, `index.html:56-122` |
| Baja | Código muerto | Se escribe `anarkshop-profile-onboarded` pero no se consulta; la existencia de `state.profile` es la condición real del onboarding. En `formatMoney`, `currency` se define según idioma pero no se usa: el formato siempre fuerza ARS. | `app.js:117-120`, `app.js:234` |
| Baja | Lógica / localización | Se permite seleccionar inglés, pero el formato monetario siempre usa locale español y ARS. El importe puede ser correcto para Argentina, pero locale/moneda no siguen la selección y la variable `currency` aparenta prometer otra conducta. | `app.js:116-120` |
| Baja | Diagnóstico | No hay señales visibles de errores de registro o caché. Los `catch` vacíos dificultan distinguir un fallo transitorio de una instalación desactualizada. | `app.js:38-47`, `app.js:442` |

### Observaciones de seguridad

- No hay servidor ni autenticación: los datos viven en `localStorage` del dispositivo. La sincronización real entre dispositivos ocurre solo al importar una copia compartida; no hay sincronización continua.
- Los valores visibles de usuario se escapan al construir HTML en los listados y artículos (`escapeHtml`), lo cual reduce el riesgo de inyección desde esos campos. Mantener esta regla para cualquier plantilla nueva.
- El importador debe tratar el URL/JSON como entrada no confiable. Hace falta validar la forma completa, limitar el tamaño antes de decodificar y limitar la cantidad de listas/artículos y las longitudes de cada campo.
- El worker opera a nivel del origen para CacheStorage. Borrar cachés ajenas puede afectar a otras apps alojadas bajo el mismo origen.

## Plan de ataque

### Estado de ejecución

- **Fase 1 completada en `app.js`:** normalización de perfiles/listas/artículos al cargar, validación estricta del JSON compartido y entradas de formularios, límites para texto y cantidades, IDs nuevos y únicos al importar, aceptación de `createdAt` numérico o ISO, control de almacenamiento inaccesible y aviso si se recuperan/omiten datos locales inválidos.
- Límites aplicados: perfil 40 caracteres; lista 70; artículo 100; marca 60; máximo 200 listas y 500 artículos por lista; texto pegado 50.000 caracteres; URL compartida 100.000 caracteres y payload decodificado 75.000 bytes; cantidad hasta 1.000.000 y precio unitario hasta 1.000.000.000.000.
- **Fase funcional 2 completada:** crear, guardar e importar una lista persiste primero y vuelve a Inicio; las listas guardadas se muestran en el drawer entre Inicio y Perfil, con apertura directa. Los borradores siguen accesibles desde Inicio. El drawer actualiza la lista y el estado seleccionado al abrirse.
- **Fase técnica 3 completada en `app.js`:** la clave `anarkshop-app-v2` es la única clave de escritura de estado; si falta, la app lee `anarkshop-data-v1` y migra las listas al formato canónico al iniciar. Cantidad y precio ya no persisten en cada evento `input`: se guardan al confirmar (`change`). El control `+/-` actualiza su contador directamente sin volver a dibujar todos los artículos.
- **Fase 4 completada en `sw.js`, `app.js`, `index.html` y `app.css`:** el worker usa cachés `anarkshop-shell-*`, limpia solo versiones de AnarkShop, espera las escrituras de caché y limita el fallback HTML a navegaciones. Las respuestas de recursos no se sustituyen con HTML. Las actualizaciones esperan acción del usuario; el banner permite activarlas y recargar cuando cambia el controlador. Los errores de registro y de caché tienen aviso visible.
- **Fase 5 completada en `index.html`, `app.css`, `app.js` y `README.md`:** retirados el script legado inerte y los estilos inline; movidos a `app.css` los estilos que seguían siendo necesarios. Se retiraron el marcador de onboarding sin uso y el cálculo de moneda muerto; se centralizó locale de fecha/importe (ARS conservado para no reinterpretar montos al cambiar idioma) y se localizaron rótulos del drawer/precio. Los ejemplos y placeholders son neutrales; README documenta esquema, intercambio, privacidad, migración y uso offline.
- **Fase 6 parcialmente verificada:** comprobaciones estáticas de referencias/IDs, límites, importación, escape HTML, privacidad documentada y alcance de caché; todos los recursos de shell respondieron HTTP 200 en servidor local. No se pudo iniciar Node ni los controladores de navegador; los casos dinámicos y la revisión visual siguen pendientes.

### Fase 1 — Estabilidad del estado y límites de entrada (completada)

1. Esquemas de perfil, lista e ítem aplicados a carga local, importación y formularios.
2. Límites documentados y entradas fuera de rango rechazadas con mensajes comprensibles.
3. Valores de `theme`, `language`, `avatar`, `quantity` y `price` normalizados/validados; precios negativos rechazados e IDs regenerados al importar.
4. Lectura de almacenamiento protegida y aviso al recuperar datos corruptos o inaccesibles, sin limpiar datos en silencio.

### Fase 3 — Persistencia y rendimiento (completada)

1. Mantener una sola clave canónica de datos y una migración de lectura para la clave anterior; retirar la escritura duplicada cuando la migración esté cubierta.
2. Guardar campos editables al confirmar o con debounce corto, evitando serialización completa en cada tecla.
3. Renderizar/actualizar la fila modificada cuando sea sencillo; medir antes de introducir virtualización u optimizaciones para listas grandes.

### Fase 4 — PWA y estrategia de caché (completada)

1. Nombrar cachés con prefijo y alcance propios; eliminar solo versiones anteriores de AnarkShop.
2. Hacer que cada escritura de caché participe en `event.waitUntil`; limitar fallback HTML a navegaciones y respetar respuestas/errores de recursos.
3. Elegir y documentar una estrategia coherente de actualización: revisar el worker, descargar shell nueva, activar caché nueva y ofrecer recarga si una vista está abierta.
4. Evitar respuestas HTML bajo solicitudes de JS/CSS y dar diagnóstico recuperable cuando el registro o precache falle.

### Fase 5 — Simplificación y mantenibilidad (completada)

1. Eliminar el script legado inerte y consolidar estilos en `app.css`, tras verificar que no se depende de una regla antigua.
2. Retirar estados/variables sin uso (`anarkshop-profile-onboarded`, `currency`) o completar la conducta que se pretendía representar.
3. Centralizar formatos regionales y cadenas para que interfaz y accesibilidad sean coherentes en español e inglés.
4. Documentar el formato de importación/exportación, el comportamiento offline y la migración local.

### Fase 6 — Verificación posterior a la aprobación de cambios (parcial)

1. **Inspección estática hecha:** `loadState` normaliza datos legados y reporta datos omitidos; no se ejecutaron fixtures válidos/corruptos/parciales.
2. **Inspección estática hecha:** se encontraron límites de tamaño, esquema, campos, cantidades y precios, y regeneración de IDs al importar. Importaciones vacías/excesivas/malformadas y extremos aún requieren ejecución real.
3. **Inspección estática hecha:** plantillas escapan los nombres/marcas y README explica que el enlace Base64 no cifra la lista. No se ejecutó una prueba XSS real.
4. **Inspección estática y HTTP hechas:** recursos shell devuelven 200; worker tiene prefijo propio, `waitUntil` y fallback de navegación. Actualización abierta, primer arranque offline y coexistencia de cachés no se validaron en navegador.
5. **Pendiente:** sin motor JS ni navegador no fue posible medir render/tecleo. Recursos servidos: `app.js` 54.372 B y `app.css` 13.597 B; esto no sustituye mediciones de tiempo.

El entorno no dispone de `node` ni de navegador en PATH; `node_repl` y el controlador CUA terminaron con `setup refresh had errors`. La fase 6 permanece parcial hasta poder ejecutar los casos dinámicos.

## Cómo integrar `Improvements.md`

Las mejoras solicitadas encajan en el plan, pero conviene añadir una fase funcional y ampliar la limpieza para cubrir los textos de ejemplo.

| Mejora solicitada | Ubicación recomendada | Motivo y criterio |
|---|---|---|
| Volver a Inicio al crear, guardar o importar una lista | Nueva Fase 2 — Flujo de listas y navegación | Implementar después de la Fase 1, cuando la normalización de listas e importaciones sea estable. Aplicar a la creación, al botón de guardar y a la importación por enlace. La lista debe quedar persistida antes de navegar. |
| Mostrar listas guardadas entre Inicio y Perfil en el drawer | Nueva Fase 2 — Flujo de listas y navegación | Usa la misma colección canónica y el indicador `saved`; mostrar solo listas guardadas, con nombres compactos y apertura directa. Actualizar el drawer después de crear, guardar, renombrar o eliminar. |
| Eliminar datos/ejemplos de supermercado y marcas específicas | Fase 5 — Simplificación y mantenibilidad (completada) | No hay listas precargadas. Se retiró el ejemplo de marca específico, se reemplazaron placeholders de productos por ejemplos neutrales y se conservó el campo genérico “Marca”. No se modifican listas guardadas por usuarios. |

### Secuencia revisada

1. Fase 1 — Estabilidad del estado y límites de entrada.
2. **Nueva Fase 2 — Flujo de listas y navegación (completada):** redirecciones, accesos rápidos a listas guardadas y manejo de borradores.
3. Fase 3 — Persistencia y rendimiento (era Fase 2).
4. Fase 4 — PWA y estrategia de caché (era Fase 3).
5. Fase 5 — Simplificación, eliminación de duplicados y neutralidad de rubro (era Fase 4, completada).
6. Fase 6 — Verificación posterior a los cambios (era Fase 5).

### Decisiones de flujo que debe respetar la implementación

- Al terminar la creación o importación, navegar a Inicio. La lista recién creada debe persistirse primero.
- Un borrador no guardado no aparecerá en la sección de listas guardadas del drawer; seguirá disponible en el listado principal de Inicio para que no quede inaccesible.
- Al guardar un borrador, pasará a la sección compacta del drawer y, luego de persistir, la app volverá a Inicio.
- Una lista importada se guarda como lista nueva y aparece en Inicio y en la sección de listas guardadas; el título permanece en `name`, separado de sus artículos.
- “Eliminar datos de ejemplo” se refiere a datos y textos precargados en el código. No debe limpiar `localStorage` ni eliminar datos creados por usuarios.

## Entorno de trabajo

El ejecutor normal del sandbox falla antes de iniciar PowerShell con `setup refresh had errors`. Una ejecución puntual aprobada con permisos ampliados sí pudo iniciar el proceso en el workspace y leer archivos. Esto apunta al inicializador/puente del sandbox de esta sesión; no a Git, PowerShell ni a una terminal abierta. No hay un ajuste del repositorio que repare ese componente del entorno. La vía ampliada sirvió como diagnóstico y lectura, pero no corrige el arranque normal del sandbox; el arreglo definitivo requiere restablecer el runtime/orquestador de la sesión.
