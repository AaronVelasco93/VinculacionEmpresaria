# Documentacion y Flujo de Trabajo - Modulo 2: Panel de Control (FaciliTrack)

Este documento define el flujo actualizado, roles, logica del sistema y el nuevo stack tecnologico homologado para el Equipo 2, encargado del Panel de Control administrativo.

## 1. Tecnologias Elegidas y Arquitectura
[cite_start]Se ha migrado a un stack moderno y tipado para mayor robustez y estandarizacion del equipo[cite: 3]:
* [cite_start]Framework: Next.js (App Router) 16.2.1 con TypeScript 5.x[cite: 3].
* [cite_start]Base de Datos y ORM: MySQL 8.x gestionado a traves de Prisma 6.x (Client Generado)[cite: 3].
* [cite_start]Autenticacion: NextAuth.js v5 beta con estructura Edge-Ready[cite: 3].
* [cite_start]Frontend (UI/Estado): shadcn/ui con Tailwind CSS v4 para estilos, react-hook-form + Zod para validacion de formularios, y Zustand para estado global[cite: 3].
* [cite_start]Imagenes: Cloudinary 2.x para el manejo de archivos multimedia[cite: 3].

## 2. Convenciones de Desarrollo
[cite_start]Para mantener el orden, la claridad y la trazabilidad en el repositorio, todos los equipos aplicaran las siguientes convenciones[cite: 1]:
* [cite_start]Nombres de archivos y carpetas: Se usara formato kebab-case o guion bajo de forma consistente (ej. modulo-reportes, diagrama-base-datos.png), usando nombres descriptivos sin espacios ni caracteres especiales[cite: 1].
* [cite_start]Ramas (Git): Uso estricto de main para la version estable, develop para integracion general, feature/nombre-funcionalidad para nuevas caracteristicas y fix/nombre-correccion para errores[cite: 1].
* Commits: Formato tipo: descripcion breve del cambio. [cite_start]Se usaran prefijos como feat: (nueva funcionalidad), fix: (correccion), docs: (cambios en documentacion), style: (estilo visual), refactor:, test: y chore:[cite: 1]. [cite_start]Los commits deben ser pequeños, frecuentes y comprobar que el proyecto compila antes de subirse[cite: 1].

## 3. Roles del Sistema
[cite_start]La logica de accesos ahora esta centralizada mediante el adaptador de NextAuth y la tabla User, con tres roles definidos en el Enum Role[cite: 2]:
* [cite_start]STAFF: Personal que crea los reportes de las incidencias (utilizan principalmente el Modulo 1)[cite: 2].
* ADMIN: Administrador con acceso completo. [cite_start]Este es el usuario principal de nuestro Panel de Control (Modulo 2), capaz de ver y gestionar toda la informacion[cite: 2].
* [cite_start]TECNICO: Tecnico que atiende los reportes que se le han asignado (utilizan el Modulo 3)[cite: 2].

## 4. Logica Actual y Flujo de Trabajo (Modulo 2)
El Panel de Control se construye consumiendo el modelo Reporte directamente mediante las optimizaciones de Prisma y Next.js.

### A. Dashboard y Filtrado
* [cite_start]Al iniciar sesion mediante NextAuth, el dashboard principal del ADMIN consulta la base de datos apoyandose en los indices creados para estado, tipoUbicacion y fechaCreacion[cite: 2, 3].
* [cite_start]Para los criterios especificos del reporte (limpieza, seguridad, iluminacion, equipo), la arquitectura utiliza un campo evaluacion de tipo Json, lo que permite extraer estas metricas sin necesidad de joins complejos en la base de datos[cite: 2, 3].

### B. Transiciones de Estado del Reporte
[cite_start]El flujo principal de trabajo del administrador consiste en monitorear el avance de las incidencias bajo un modelo unidireccional y estricto definido en el Enum EstadoReporte[cite: 2]:
* PENDIENTE: El reporte acaba de ser creado. [cite_start]Es el estado por defecto[cite: 2].
* [cite_start]EN_PROCESO: La atencion ha sido iniciada y se registra automaticamente la propiedad fechaAtencion[cite: 2].
* [cite_start]ATENDIDO: El reporte ha sido resuelto y se registra la fechaResolucion[cite: 2].

### C. Comandos de Sincronizacion
[cite_start]Al trabajar en la rama correspondiente al Modulo 2, los miembros del equipo deberan ejecutar los siguientes comandos para mantener la base de datos sincronizada en desarrollo[cite: 2]:
* [cite_start]npm run db:push para aplicar el esquema sin migraciones[cite: 2].
* [cite_start]npm run db:generate para regenerar el cliente de Prisma[cite: 2].
* [cite_start]npm run db:studio para revisar los datos en la interfaz visual de Prisma[cite: 2].