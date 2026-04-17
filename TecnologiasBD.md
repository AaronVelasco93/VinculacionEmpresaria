# Reporte de Selección de Stack Tecnológico y Arquitectura

## 1. Tecnologías Seleccionadas

| Capa | Tecnología | Versión |
|---|---|---|
| **Framework** | Next.js (App Router) | 16.2.1 |
| **Lenguaje** | TypeScript | 5.x |
| **Base de Datos** | MySQL | 8.x |
| **ORM** | Prisma (Client Generado) | 6.x |
| **Autenticación** | NextAuth.js v5 beta | 5.0.0-beta.30 |
| **Estado Global** | Zustand (con persist) | 5.x |
| **Formularios** | react-hook-form + Zod | 7.x / 4.x |
| **UI/Styling** | shadcn/ui + Tailwind CSS v4 | — / 4.x |
| **Imágenes** | Cloudinary | 2.x |

---

## 2. Justificación Técnica

La arquitectura ha sido diseñada para equilibrar la rapidez de desarrollo con la robustez necesaria en un entorno de ingeniería profesional.

### Alineación y Estándares de Equipo
La adopción de **TypeScript** y **Next.js 16** responde a la necesidad de estandarizar el desarrollo dentro del equipo. TypeScript proporciona un sistema de tipos que actúa como documentación viva, reduciendo errores en tiempo de ejecución y facilitando el *onboarding* de ingenieros Jr. al proporcionar autocompletado y validaciones estrictas en el IDE.

### Gestión de Datos con Prisma 6 y MySQL
Se ha migrado a **MySQL** para integrarse con la infraestructura existente, manteniendo a **Prisma** como ORM por su capacidad de generar un cliente altamente tipado.
* **Decisión de Diseño:** El cliente de Prisma se genera en `@/generated/prisma/client` para evitar colisiones en `node_modules` y garantizar que el esquema sea la "única fuente de verdad".
* **Campos JSON:** Para la evaluación de reportes (limpieza, seguridad, etc.), se utiliza el tipo `Json`. Esto permite evolucionar los criterios de inspección sin realizar migraciones costosas en la base de datos y simplifica las consultas al evitar joins complejos.

### Arquitectura de Autenticación (Edge-Ready)
Se implementa **NextAuth v5** con una estructura de configuración dividida (*Split Config*):
* `auth.config.ts`: Compatible con Edge Runtime para permitir verificaciones rápidas en el `middleware.ts`.
* `src/lib/auth.ts`: Maneja la lógica pesada de Node.js (PrismaAdapter y hashing con bcrypt).
Esta separación garantiza que la protección de rutas sea extremadamente rápida sin sacrificar la funcionalidad completa de la base de datos.

### Interfaz de Usuario y Estado Global
* **Tailwind CSS v4 + shadcn/ui:** Permite construir interfaces consistentes rápidamente usando el sistema de diseño del equipo, con soporte nativo para temas (dark/light) y colores OKLCH.
* **Zustand:** Se prefiere sobre Redux o Context API por su ligereza. Se utiliza `persist` parcialmente para recordar preferencias de la UI (como el estado del sidebar) sin sobrecargar el almacenamiento del navegador con datos temporales de filtros.

---

## 3. Estructura de Directorios (Árbol del Proyecto)

```text
faciltrack/
├── prisma/
│   ├── schema.prisma          # Definición de modelos (MySQL)
│   └── seed.ts                # Población inicial de datos
├── src/
│   ├── app/                   # Next.js App Router (Rutas y APIs)
│   │   ├── (auth)/            # Grupo: Login y Recuperación
│   │   ├── (dashboard)/       # Grupo: Sidebar + Aplicación principal
│   │   └── api/               # Endpoints de servicio
│   ├── components/            # UI, Layout y componentes de negocio
│   ├── lib/                   # Singletons (Prisma, Cloudinary, Auth)
│   ├── store/                 # Gestión de estado con Zustand
│   └── types/                 # Definiciones globales de TypeScript
└── auth.config.ts             # Configuración Edge-safe de NextAuth