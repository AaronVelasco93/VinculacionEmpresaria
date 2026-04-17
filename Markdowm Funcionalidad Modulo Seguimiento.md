### **Paso 1: Recepción y Clasificación**

Al entrar al panel, el administrador visualiza la lista de incidencias. Al seleccionar el **Reporte \#R-10245**, el sistema debe:

* **Validar Metadatos:** Mostrar el ID único (PK) y el origen de la tabla (reports).  
* **Auditar la Ubicación:** Confirmar que el reporte pertenece a un edificio válido (ej. "Ala Norte, Aula 302").  
* **Analizar Evaluación:** Revisar los semáforos de estado (Deficiente, Regular, Bueno) para priorizar la atención.

### **Paso 2: Evaluación de Evidencia y Comentarios**

Antes de actuar, el administrador realiza una inspección digital:

* **Lectura Crítica:** Analiza el campo "Comentarios del Reportero". En tu ejemplo, se detectan tres problemas: escritorios flojos, falta de barrido y una mancha en la pizarra.  
* **Inspección Visual:** Revisa las "Imágenes Adjuntas" para confirmar si se requiere material especial (ej. solvente para la pizarra o herramienta de carpintería).

### **Paso 3: Asignación de Tareas (Trigger de Workflow)**

El administrador interactúa con el componente **"Estado de Atención"**:

1. Presiona el botón **"Asignar Tarea"**.  
2. El sistema despliega un modal con la lista de técnicos disponibles (filtrados por especialidad: Limpieza o Mantenimiento).  
3. Al confirmar, el sistema debe ejecutar un UPDATE en la DB para cambiar el estado de **Acción Pendiente** a **En Curso**.

### **Paso 4: Monitoreo y Actualización de Notas**

Una vez asignado, el administrador supervisa el avance:

* El cuadro de **"Registros de Atención"** se actualiza con el nombre del técnico y la fecha.  
* El administrador puede añadir notas administrativas que no son visibles para el reportero original, pero sí para el equipo técnico.

### **Paso 5: Validación y Cierre Normativo**

Cuando el técnico reporta la conclusión del trabajo:

1. El administrador revisa que se haya cumplido con lo marcado como "Deficiente" (en este caso, la limpieza del suelo).  
2. Presiona el botón **"Marcar como Atendido"** (ubicado en el header superior derecho de tu imagen).  
3. **Post-condición Automática:** El sistema detiene el cronómetro para el cálculo del **MTTR** (Tiempo promedio de atención) y el reporte pasa al histórico para el **Módulo de Métricas**.

### **Paso 6: Generación de Salida (Reporting)**

Finalmente, el administrador tiene dos opciones de gestión documental:

* **Imprimir Reporte:** Genera un PDF físico para el archivo de la FES Aragón.  
* **Compartir Vista:** Envía un enlace directo a los jefes de área para informar que el aula 302 ya está operativa.

---

### **📝 Resumen para tu Documentación (Tabla de Acciones)**

| Acción del Admin | Interfaz Involucrada | Impacto en Datos |
| :---- | :---- | :---- |
| **Revisión** | Lista de Evaluación | Lectura de atributos de la entidad. |
| **Asignación** | Botón "Asignar Tarea" | Cambio de estado y relación con tabla users\_tecnicos. |
| **Supervisión** | Registro de Atención | Registro en log de auditoría (RB-10). |
| **Cierre** | Botón "Marcar como Atendido" | Flag is\_closed \= true y cálculo de métricas. |

