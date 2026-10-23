# Role & Objective
Actúa como un Desarrollador Frontend Senior experto en PWA (Progressive Web Apps) y diseño UI/UX mobile-first. Tu tarea es crear una aplicación web de lista de compras llamada **AnarkShop**, contenida en un único archivo HTML (o estructura limpia modular si prefieres) que sea completamente funcional, ligera, offline-first y optimizada para dispositivos móviles.

---

## Requisitos Técnicos y Arquitectura (PWA)
1. **PWA Ready**: 
   - Incluir un `manifest.json` embebido o enlazado correctamente para permitir la instalación en la pantalla de inicio del celular.
   - Registrar un `Service Worker` básico para permitir el funcionamiento offline (caché de la app shell).
   - Meta tags para iOS y Android (viewport, theme-color, apple-mobile-web-app-capable).
2. **Tecnologías**: HTML5, CSS3 (con Tailwind CSS vía CDN para desarrollo rápido y limpio, o CSS moderno con variables) y JavaScript vainilla (con persistencia en `localStorage`).
3. **Soporte de Múltiples Listas**: Capacidad de almacenar y gestionar muchas listas de compras de forma independiente.

---

## Sistema de Temas (Themes)
Implementar un selector de temas accesible y persistente en el `localStorage`:
- **Tema 1 (Oscuro / Estilo Mercedes-AMG F1)**: Fondo oscuro profundo (negro/carbón), acentos en azul verdoso/petróleo vibrante (`#00A19C` o similar estilo neon/tech) y tipografía de alta legibilidad.
- **Tema 2 (Pasteles)**: Tonos suaves, fondo claro u off-white, rosa pastel, acentos complementarios cálidos y amigables.

---

## Flujo de Pantallas y Navegación

### 1. Pantalla Principal (Home / Selector de Listas)
- Listado de listas guardadas con indicador rápido (nombre, fecha o cantidad de items).
- Botón principal flotante o destacado para **"Crear nueva lista"**.
- Opción para **Abrir una lista** existente o **Eliminarla**.

### 2. Modal / Vista de Creación de Lista
- Campo para el nombre de la lista.
- **Dos métodos de creación**:
  1. *Desde cero*: Iniciar la lista vacía.
  2. *Importar mediante texto (Copiar y Pegar)*: Un cuadro de texto grande donde el usuario pueda pegar múltiples líneas de texto y el sistema las parseé automáticamente para agregarlas a la 

---

## Pantalla de Detalle de Lista (Core Experience)
Diseño extremadamente funcional, táctil, de fácil lectura y pensado para usar con una sola mano en el súper/tienda.

### Distribución por Item (Fila compacta o tarjeta limpia):
1. **Nro de ítem**: Automático y secuencial.
2. **Nombre del ítem**: Claro y prominente.
3. **Cantidad**: Numérica (ej: `2`, `1.5`, etc.).
4. **Marca (Opcional)**: Si se ingresa, se muestra sutilmente; si no, el sistema omite el campo sin romper el diseño.
5. **Precio (Opcional)**: Campo numérico. El usuario lo completa idealmente *en el momento* que agarra el objeto.
6. **Checkbox / Tilde**: Para marcar el ítem como "adquirido/agarrado".

### Resumen de Gastos en Tiempo Real:
- Un panel o barra fija (sticky) visible en la pantalla que muestre:
  - Total gastado parcial (sumando únicamente los precios de los ítems que **tienen la tilde** de comprados).
  - Cantidad de ítems tachados / total de ítems (ej: `4/10 comprados`).

### Acciones Rápidas dentro de la Lista:
- **Botón "+" flotante y claro**: Para agregar un nuevo ítem rápidamente mediante un modal o input rápido (Nombre, Cantidad, Marca opcional, Precio opcional).
- **Botón de Compartir por WhatsApp**: Genera un texto plano formateado de manera limpia (ej: `Item / Cantidad / Marca`) listo para enviar por portapapeles/API de WhatsApp (`https://wa.me/?text=...`).
- **Scroleo fluido**: Optimizado para listas largas con rendimiento nativo en mobile.

---

## Requerimientos de Código y Entrega
- Código limpio, comentado y estructurado.
- Manejo robusto de errores (si falta el precio o la marca, la app no debe fallar ni mostrar `NaN` en los totales, sino calcular solo con los datos disponibles).
- Experiencia de usuario ultra-rápida (feedback visual inmediato al tildar un ítem, transiciones suaves).
- Entrégalo listo para probarse directamente.