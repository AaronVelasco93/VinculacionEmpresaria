# En primer lugar clonamos el repo 
git clone https://github.com/AaronVelasco93/VinculacionEmpresaria.git
cd VinculacionEmpresaria
git checkout registro
# Instalamos la dependencia 
npm install
# Configuramos la bd
npx prisma migrate dev --name init
npx prisma generate

# Ejecutamos la app
npm run dev

# Si todo funciona 
http://localhost:3000


# Estructura del proyecto
VinculacionEmpresaria/
├── src/
│   ├── pages/
│   │   ├── api/
│   │   │   └── incidencias.ts    # API endpoints
│   │   ├── _app.tsx               # Componente principal
│   │   └── index.tsx              # Página principal
│   ├── styles/
│   │   └── globals.css            # Estilos Tailwind
│   └── components/                # Componentes React
├── prisma/
│   ├── schema.prisma              # Esquema de BD
│   └── dev.db                     # Base de datos SQLite
├── public/                        # Archivos estáticos
├── package.json                   # Dependencias
├── tsconfig.json                  # Config TypeScript
├── tailwind.config.js             # Config Tailwind
├── next.config.js                 # Config Next.js
└── README.md                      # Este archivo