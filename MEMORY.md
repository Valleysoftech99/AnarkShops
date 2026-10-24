# Memoria del proyecto

- AnarkShop es una PWA estática; lógica activa en `app.js`, estilos en `app.css`, shell/cache en `sw.js`.
- El perfil y las listas se guardan localmente; compartir por enlace serializa una copia de la lista en Base64 URL-safe.
- `Agent.md` define prioridades: validación estricta, manejo visible de errores, aislamiento del estado y actualización de esta memoria al cerrar tareas.
- Auditoría estática en `Espec.md`; Fase 1 implementada en `app.js`. No se ejecutaron pruebas.
- Hallazgos iniciales en `Espec.md`: validación (Fase 1), persistencia (Fase 3), PWA (Fase 4) y simplificación (Fase 5) completados; fase 6 parcialmente verificada, falta ejecución dinámica/visual.
- Fase 1 limita perfil/lista/artículo a 40/70/100 caracteres, marcas a 60, máximo 200 listas y 500 artículos por lista; valida cantidades/precios, paste/import payload y reporta recuperación/localStorage inaccesible. Esas magnitudes están documentadas en `Espec.md`.
- `Improvements.md` se integró en `Espec.md` como nueva fase de flujo/navegación tras validar datos; limpieza de ejemplos queda en la fase de simplificación. Preservar borradores accesibles y datos reales de usuarios.
- Fase funcional 2 completada en `index.html`, `app.js` y `app.css`: Inicio tras crear/guardar/importar; drawer con accesos a listas guardadas entre Inicio y Perfil; borradores siguen en Inicio. Al abrir el drawer se actualizan orden y selección activa.
- `Espec.md` refleja fase 2 completada; la antigua fase técnica de persistencia pasó a fase 3. No se ejecutaron pruebas ni validación visual.
- Fase técnica 3 completada: `app.js` escribe solo en `anarkshop-app-v2`; lee/migra la clave antigua `anarkshop-data-v1` cuando falta la canónica. Los campos cantidad/precio persisten al evento `change`; los botones +/- actualizan el contador sin repintar la lista completa. Sin pruebas.
- Fase 4 completada: `sw.js` limita limpieza a `anarkshop-shell-*`, conserva otras cachés del origen, usa `waitUntil`, limita fallback HTML a navegación y muestra actualización disponible con recarga voluntaria. Sin pruebas ni QA visual.
- Fase 5 completada: removidos script legado inerte y CSS inline duplicado; los selectores aún necesarios se consolidaron en `app.css`. Quitado marcador de onboarding muerto, centralizados locale de fechas/importes con ARS fijo y placeholders de rubro neutralizados. `README.md` documenta formato JSON compartido, límites, privacidad, migración y offline.
- Fase 6 revisión estática: HTML con 43 IDs únicos y 53 referencias directas resueltas; CSS balanceado; los seis recursos shell responden HTTP 200; comprobaciones estáticas de límites, escape, importación y caché pasan. No hay Node/navegador; CUA y node_repl fallan por `setup refresh had errors`. Sin pruebas dinámicas, XSS en navegador, offline/caché coexistente ni mediciones de render; ver `Espec.md`.
- El sandbox normal de esta sesión no inicializa (`setup refresh had errors`); ejecución ampliada de lectura sí funciona. Requiere reparación del runtime para restablecer el flujo normal.
- Estado observado antes de crear los documentos: `Create.md` ya estaba eliminado y `Agent.md`/`Improvements.md` sin seguimiento; preservar esos cambios del usuario.
