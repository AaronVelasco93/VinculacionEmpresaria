# **Módulo 3: Seguimiento de Incidencias** 

## **1\. Descripción del Módulo**

Este módulo permite la gestión activa de las solicitudes de mantenimiento desde que son recibidas hasta su cierre. Facilita la interacción entre el administrador y el personal operativo, permitiendo la asignación de tareas, el registro detallado de las acciones de mantenimiento y la consulta técnica de la base de datos para asegurar la trazabilidad de la información.

---

## **2\. Requerimientos Funcionales Adicionales**

| ID | Requerimiento Funcional |
| :---- | :---- |
| **RF-13** | El sistema deberá mostrar el detalle completo del reporte, incluyendo: nombre del reportero, fecha, ubicación exacta y lista de evaluación. |
| **RF-14** | El sistema deberá permitir la consulta de las notas y comentarios técnicos registrados durante el proceso de atención. |
| **RF-15** | El sistema deberá mostrar el **Contexto de la Base de Datos** (Tabla, ID PK y Tipo de dato) para facilitar el mantenimiento técnico del software. |
| **RF-16** | El sistema deberá permitir la impresión del reporte individual y la opción de compartir la vista mediante un enlace o archivo de texto. |

---

## **3\. Reglas de Negocio Específicas del Módulo (RB)**

* **RB-16:** Todo reporte debe mostrar una **Lista de Evaluación** predefinida (ej. Limpieza, Iluminación, Ventanas, Mobiliario) con estados: *Bueno, Regular o Deficiente*.  
* **RB-17:** La sección de "Estado de Atención" debe bloquearse si el reporte no tiene una tarea asignada previamente.  
* **RB-18:** Los comentarios originales del reportero deben ser inalterables para mantener la integridad del registro inicial.

---

## **4\. Casos de Uso del Módulo**

### **CU-06: Consulta de Detalles Técnicos**

**Actor:** Técnico / Administrador

**Descripción:** Permite acceder a la información específica y técnica de la incidencia para planificar la intervención.

* **Precondición:** El usuario debe tener permisos de lectura en el módulo de reportes.  
* **Flujo Principal:**  
  1. El usuario abre el detalle del reporte.  
  2. El sistema despliega la lista de evaluación y los comentarios de texto.  
  3. El usuario consulta los metadatos del sistema (ID PK).  
* **Postcondición:** El personal cuenta con la información textual necesaria para la atención en sitio.

### **CU-07: Asignación de Tareas y Registro de Atención**

**Actor:** Administrador

**Descripción:** Permite vincular un reporte con una acción técnica específica y registrar el progreso cronológico.

* **Precondición:** El reporte debe estar en estado "Pendiente".  
* **Flujo Principal:**  
  1. El Administrador hace clic en el botón "Asignar Tarea".  
  2. Se selecciona al técnico y se describen las acciones a realizar por escrito.  
  3. El sistema actualiza el "Registro de Atención" con la fecha y las notas proporcionadas.  
* **Postcondición:** El reporte cambia su flujo a "En proceso" y queda documentado el responsable.

---

## **5\. Historias de Usuario (HU)**

* **HU-11:** Como **Técnico de Mantenimiento**, quiero ver la "Lista de Evaluación" y los "Comentarios del Reportero" para identificar qué componentes requieren atención prioritaria sin necesidad de inspección previa.  
* **HU-12:** Como **Administrador**, quiero ver el "Contexto de la Base de Datos" en la interfaz para identificar rápidamente el registro en la tabla reports en caso de requerir una corrección manual.

---

## 

## 

## 

## **6\. Matriz de Trazabilidad (Seguimiento)**

| Caso de Uso | RF Relacionados | HU Relacionadas |
| :---- | :---- | :---- |
| **CU-03 (Actualizar estado)** | RF-09, RF-12 | HU-06 |
| **CU-06 (Consulta Técnica)** | RF-13, RF-15 | HU-11, HU-12 |
| **CU-07 (Asignación)** | RF-08, RF-14 | HU-04 |

