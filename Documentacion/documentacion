# Módulo: Registro de Incidencias

## Descripción General
El módulo de **Registro de Incidencias** permite capturar reportes de inspección dentro del sistema de gestión de mantenimiento institucional. Este módulo es el punto de entrada para generar incidencias que posteriormente serán gestionadas por otros roles del sistema.

---

## Roles Involucrados

### Usuario (USER)
- Puede registrar nuevas incidencias.
- Consulta el estado de sus reportes.
- Proporciona información detallada del problema detectado.

### Administrador (ADMIN)
- Supervisa todas las incidencias.
- Puede gestionar prioridades y generar reportes.
- Tiene control total sobre el flujo del sistema.

### Área Responsable (AREA RESPONSABLE)
- Atiende incidencias asignadas.
- Cambia el estado de las incidencias.
- Ejecuta acciones correctivas.

---

## Flujo de Usuario (Registro de Incidencia)

### Paso 1: Acceso al formulario
- El usuario accede al módulo desde el panel:

### Paso 2: Captura de información

#### Información General
- Nombre del reportero
- Fecha de inspección (autoasignada con la fecha actual)

#### Detalles de Ubicación
- Tipo de ubicación (Aulas, Baños, Áreas Comunes)
- Edificio
- Aula / Sección

#### Comentarios
- Descripción detallada del problema o estado observado

---

### Paso 3: Acciones del usuario

- **Guardar Borrador**
- Permite almacenar el reporte sin enviarlo.
- Estado: `BORRADOR`

- **Enviar Reporte**
- Registra la incidencia en el sistema.
- Estado inicial: `REGISTRADO`

---

## Lógica del Sistema

### Validaciones
- Todos los campos obligatorios deben estar completos:
- Nombre
- Fecha
- Ubicación
- Longitud máxima en campos de texto:
- Nombre: 50 caracteres
- Edificio: 30 caracteres
- Aula: 80 caracteres

---

### Estados de la Incidencia

1. **BORRADOR**
 - Reporte guardado pero no enviado.

2. **REGISTRADO**
 - Reporte enviado correctamente.
 - Disponible para asignación.

---

###  Automatizaciones
- La fecha se asigna automáticamente al cargar el formulario.
- El sistema registra el historial del usuario (ej. último reporte).

---

## Relación con el Diagrama UML

El módulo corresponde al caso de uso:
- **Registrar Incidencia**

Y se conecta con:
- Consultar estado de incidencias (USER)
- Asignar y gestionar incidencias (ADMIN)
- Atender incidencia (ÁREA RESPONSABLE)
- Cambiar estado de incidencias

---
