# VinculacionEmpresaria
Descripción del repositorio


Descripción del repositorio

Este repositorio está destinado al desarrollo y seguimiento de proyectos correspondientes a la asignatura de Vinculación Empresarial. Su propósito es servir como espacio de trabajo para que los estudiantes integren conocimientos teóricos y prácticos en el desarrollo de soluciones de software orientadas a la resolución de problemáticas reales dentro de un entorno institucional.

A través de este repositorio, los alumnos documentarán, desarrollarán y gestionarán cada una de las fases del proyecto, incluyendo análisis de requerimientos, diseño, implementación y validación, fomentando el trabajo colaborativo y la organización de equipos de desarrollo.

⸻

Introducción del proyecto

Sistema de Gestión de Incidencias de Mantenimiento

El presente proyecto tiene como objetivo el desarrollo de un sistema de software orientado a la gestión y seguimiento de incidencias relacionadas con el mantenimiento de instalaciones dentro de una institución.

Actualmente, la identificación y atención de fallas en infraestructura suele realizarse de manera informal, lo que genera retrasos en la atención, falta de control en el seguimiento y ausencia de información para la toma de decisiones. Ante esta problemática, se propone el diseño e implementación de un sistema que permita registrar, administrar y dar seguimiento a reportes de incidencias de manera estructurada.

El sistema contemplará funcionalidades como el registro de reportes, asignación de responsables, actualización de estados, seguimiento de atención y generación de información para análisis administrativo. Asimismo, se integrarán reglas de negocio que permitan garantizar el correcto flujo de operación y la trazabilidad de cada incidencia.

Este proyecto será desarrollado en equipos, promoviendo la organización, la comunicación y la aplicación de metodologías de desarrollo de software, permitiendo a los estudiantes experimentar un entorno similar al de un proyecto real en el ámbito profesional.
Integrantes:
Yeni
Damian
Luis
Ale
Abraham
Erick
Carla


⸻
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

