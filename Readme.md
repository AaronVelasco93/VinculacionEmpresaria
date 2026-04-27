# Sistema de Registro de Incidencias

Sistema completo para gestión y seguimiento de incidencias, construido con tecnologías modernas.

## Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|------------|
| **Node.js** | v18+ | Entorno de ejecución JavaScript |
| **Next.js** | v14 | Framework full-stack (API Routes + SSR) |
| **React** | v18 | Biblioteca para UI componente |
| **TypeScript** | v5 | Tipado estático |
| **Tailwind CSS** | v3 | Framework de CSS utilitario |
| **Prisma** | v5 | ORM type-safe |
| **SQLite** | - | Base de datos ligera |

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) (viene con Node.js)
- [Git](https://git-scm.com/)

### Verificar instalaciones
```bash
node --version  # Debe mostrar v18.x o superior
npm --version   # Debe mostrar 9.x o superior


### Se cera la estrucuta de las carpetas 
New-Item -ItemType Directory -Force -Path @(
    "src\components",
    "src\pages\api",
    "src\styles",
    "src\utils",
    "src\prisma",
    "public"
)

### Creamos dentro de la carpeta corremos el siguiente comando
npm init -y
###instalamos las dependencias
# Framework y React
npm install next@14.0.0 react@18.2.0 react-dom@18.2.0

# TypeScript
npm install -D typescript@5.2.2 @types/react@18.2.0 @types/node@20.0.0

# Tailwind CSS
npm install -D tailwindcss@3.4.0 postcss@8.4.31 autoprefixer@10.4.16

# Prisma ORM
npm install -D prisma@5.7.0
npm install @prisma/client@5.7.0

### Creamos el tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
### Después creeamos el tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

### Ahora creamos postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

### Crear src/styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

### Ahora creamos 
Crear next.config.js:

### Inicializar Prisma

npx prisma init

### Configurar prisma/schema.prisma:

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model Incidencia {
  id        Int      @id @default(autoincrement())
  titulo    String
  descripcion String
  estado    String   @default("PENDIENTE")
  prioridad String   @default("MEDIA")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

### Ahora intalamos 
npm install -D prisma
npm install @prisma/client

# Crear migración inicial
npx prisma migrate dev --name init

# Generar cliente Prisma
npx prisma generate
