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


Convenciones de nombres y commits

Para mantener orden, claridad y trazabilidad en el desarrollo del proyecto, todos los equipos deberán seguir las siguientes convenciones al crear archivos, carpetas y commits dentro del repositorio.
Perfecto. Te dejo ambos apartados listos para que los pongas en el README.md o se los compartas como lineamientos del curso.

Convenciones de nombres y commits

Para mantener orden, claridad y trazabilidad en el desarrollo del proyecto, todos los equipos deberán seguir las siguientes convenciones al crear archivos, carpetas y commits dentro del repositorio.

1. Convenciones de nombres de archivos y carpetas

Se deberá mantener una estructura clara, uniforme y fácil de identificar.

Reglas generales:

Usar nombres descriptivos.
Evitar espacios en blanco.
Usar guion medio - o guion bajo _ de forma consistente.
No usar caracteres especiales ni acentos.
Los nombres deben permitir identificar rápidamente el contenido.

Ejemplos correctos:

documento-requerimientos.md
casos-de-uso.pdf
diagrama-base-datos.png
modulo-reportes
avance-semana-03

Ejemplos no recomendados:

Documento Final Bueno.pdf
avance 1
trabajo_nuevo_ahora_si
imagen(1).png
2. Convención sugerida por tipo de entrega

Documentación:

requerimientos-equipo-1.pdf
casos-uso-equipo-2.pdf
historias-usuario-equipo-3.pdf

Código:

frontend/
backend/
database/
views/
controllers/
models/

Evidencias:

evidencias-semana-01/
capturas-modulo-reportes/
pruebas-funcionales/
3. Convención de ramas

Si van a trabajar con ramas, se recomienda:

main para la versión estable
develop para integración general
feature/nombre-funcionalidad
fix/nombre-correccion

Ejemplos:

feature/registro-reportes
feature/dashboard-metricas
fix/error-validacion-formulario
4. Convenciones de commits

Los commits deben describir claramente qué cambio se realizó. No deben usar mensajes ambiguos como:

cambios
avance
ya quedo
corregido
update

Formato sugerido:

tipo: descripcion breve del cambio

Tipos recomendados:

feat: nueva funcionalidad
fix: corrección de error
docs: cambios en documentación
style: cambios de formato o estilo visual
refactor: reorganización interna sin cambiar funcionalidad
test: pruebas o casos de prueba
chore: ajustes generales o mantenimiento

Ejemplos:

feat: agregar formulario de registro de reportes
fix: corregir validacion de campos obligatorios
docs: agregar documento de requerimientos del modulo 1
style: mejorar diseno del panel administrativo
refactor: reorganizar estructura del backend
test: agregar casos de prueba para cambio de estado
5. Buenas prácticas al hacer commits
Hacer commits pequeños y frecuentes.
Cada commit debe representar un cambio concreto.
No mezclar documentación, código y pruebas en un solo commit si se pueden separar.
El mensaje debe explicar qué se hizo, no solo que se trabajó.
Antes de hacer commit, revisar que el proyecto siga funcionando.
