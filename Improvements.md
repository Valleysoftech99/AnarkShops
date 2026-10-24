### Tarea: Actualización de flujo de listas, navegación en Sidebar y limpieza de datos

Por favor, implementa los siguientes cambios en la aplicación:

1. **Redirección tras guardar una lista:**
   - Al crear o guardar una lista (ya sea creada manualmente desde cero o importada/cargada de otra fuente), la aplicación debe navegar **inmediatamente** de forma automática hacia la pantalla de **inicio**.

2. **Sección de listas guardadas en la Sidebar:**
   - En la barra lateral (`sidebar`), ubica una sección dedicada exclusivamente a las **listas guardadas**, situada justo entre la opción de **Inicio** y la de **Perfil**.
   - Esta sección debe mostrar de forma dinámica una lista compacta o miniatura con los nombres de las listas guardadas actuales (si es que existen). Al hacer clic en cualquiera de ellas, debe abrir la lista correspondiente.

3. **Limpieza total de datos de ejemplo (Hardcoded / Mock data):**
   - Eliminar por completo cualquier registro, ítem, categoría o marca predeterminada de comestibles, supermercado o productos específicos (ej. marcas de alimentos, etc.).
   - La aplicación debe ser completamente agnóstica y genérica, sirviendo por igual para una lista de compras de supermercado, una ferretería, autopartes o cualquier otro rubro.