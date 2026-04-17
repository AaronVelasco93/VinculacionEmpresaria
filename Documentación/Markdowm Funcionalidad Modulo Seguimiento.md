## **Flujo Operativo: El Administrador en el Módulo de Seguimiento**

### **Paso 1: Recepción y Clasificación**

Al entrar al panel, el administrador visualiza la lista de incidencias. Al seleccionar un reporte específico (ej. **\#R-10245**), el sistema debe:

* **Validar Metadatos:** Mostrar el ID único (PK) y el origen de la tabla (reports).  
* **Auditar la Ubicación:** Confirmar que el reporte pertenece a un edificio válido (ej. "Ala Norte, Aula 302").  
* **Analizar Evaluación:** Revisar los semáforos de estado (Deficiente, Regular, Bueno) en la lista de verificación para priorizar la urgencia.

### **Paso 2: Evaluación de Diagnóstico y Comentarios**

Antes de actuar, el administrador realiza una revisión de los datos proporcionados por el usuario:

* **Análisis de Requerimientos:** Analiza el campo "Comentarios del Reportero". El administrador identifica los insumos o herramientas necesarias basándose en la descripción detallada (ej. si mencionan "escritorios flojos", se requiere herramienta de carpintería).  
* **Validación de Prioridad:** Contrasta la "Lista de Evaluación" con los comentarios para asegurar que el nivel de urgencia asignado por el sistema es correcto.

### **Paso 3: Asignación de Tareas (Trigger de Workflow)**

El administrador interactúa con el componente **"Estado de Atención"**:

1. Presiona el botón **"Asignar Tarea"**.  
2. El sistema despliega un modal con la lista de técnicos disponibles (filtrados por especialidad: Limpieza o Mantenimiento).  
3. Al confirmar, el sistema ejecuta un UPDATE en la DB para cambiar el estado de **Acción Pendiente** a **En Curso**.

### **Paso 4: Monitoreo y Actualización de Notas**

Una vez asignado, el administrador supervisa el avance de manera textual:

* El cuadro de **"Registros de Atención"** se actualiza automáticamente con el nombre del técnico y la fecha de inicio.  
* El administrador puede añadir notas administrativas de seguimiento que son compartidas internamente con el equipo técnico para detallar la solución.

### **Paso 5: Validación y Cierre Normativo**

Cuando el técnico reporta la conclusión del trabajo a través de su propia interfaz:

1. El administrador revisa que se haya registrado la descripción de la solución en el historial.  
2. Presiona el botón **"Marcar como Atendido"**.  
3. **Post-condición Automática:** El sistema detiene el cronómetro para el cálculo del **MTTR** (Tiempo promedio de atención) y el reporte pasa al histórico para el Módulo de Métricas.

### **Paso 6: Generación de Salida (Reporting)**

Finalmente, el administrador gestiona la salida de la información:

* **Imprimir Reporte:** Genera un PDF técnico con el log de atención para el archivo físico de la **FES Aragón**.  
* **Compartir Vista:** Genera un enlace de consulta rápida para informar a los jefes de área sobre la resolución de la incidencia.

---

### **📝 Resumen para tu Documentación (Tabla de Acciones)**

| Acción del Admin | Interfaz Involucrada | Impacto en Datos |
| :---- | :---- | :---- |
| **Revisión** | Lista de Evaluación | Lectura de atributos de la entidad. |
| **Asignación** | Botón "Asignar Tarea" | Cambio de estado y relación con tabla users\_tecnicos. |
| **Supervisión** | Registro de Atención | Registro en log de auditoría (RB-10). |
| **Cierre** | Botón "Marcar como Atendido" | Flag is\_closed \= true y cálculo de métricas (MTTR). |

