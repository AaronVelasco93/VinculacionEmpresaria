Autenticación y Autorización
Tecnología
NextAuth.js v5 beta con estrategia JWT y adaptador Prisma.

Configuración — dos archivos
NextAuth v5 requiere dividir la configuración para soportar el Edge Runtime en el middleware:

auth.config.ts (raíz del proyecto)
Config edge-safe, sin imports de Node.js (sin Prisma, sin bcrypt):

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Decide si una ruta requiere auth
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = nextUrl.pathname.startsWith("/dashboard") || ...;
      if (isProtected) return isLoggedIn;
      return true;
    },
    // Agrega role e id al JWT
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    // Expone role e id en la sesión del cliente
    session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
  },
  providers: [],
};
src/lib/auth.ts (solo Node.js)
Configuración completa con Prisma y bcrypt:

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        // Valida email/password contra la BD
        const user = await prisma.user.findUnique({ where: { email } });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return null;
        return { id, email, name, role };
      },
    }),
  ],
});
middleware.ts
Ejecuta en el Edge Runtime, usa solo auth.config.ts:

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
Roles de usuario
Rol	Permisos
STAFF	Crear reportes, ver todos los reportes
ADMIN	Todo lo anterior + cambiar estado, asignar tareas, eliminar reportes
TECNICO	Ver reportes + cambiar estado de reportes asignados
Control de acceso por rol en la UI
El componente EstadoSidebar muestra los botones de acción solo si el usuario tiene rol ADMIN o TECNICO:

const canManage = userRole === "ADMIN" || userRole === "TECNICO";
Control de acceso en API
El endpoint DELETE /api/reportes/[id] verifica el rol explícitamente:

if (!session || session.user?.role !== "ADMIN") {
  return NextResponse.json({ error: "No autorizado" }, { status: 401 });
}
Rutas protegidas
El middleware protege automáticamente las siguientes rutas:

/dashboard y subrutas
/reportes y subrutas
/edificios
/personal
/analiticas
Las rutas no protegidas (accesibles sin sesión):

/login
/api/* (las APIs verifican la sesión internamente)
Archivos estáticos (/_next/, /favicon.ico)
Flujo de autenticación
1. Usuario accede a /dashboard
2. middleware.ts verifica el JWT
3. Si no hay sesión → redirige a /login
4. Usuario introduce email + contraseña
5. next-auth/react signIn("credentials", { email, password })
6. Credentials.authorize() busca el usuario en BD y compara hash bcrypt
7. Si es válido → crea JWT con { id, email, name, role }
8. Cookie de sesión establecida en el navegador
9. Redirige a /dashboard
Acceder a la sesión
En Server Components (páginas del dashboard)
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();
  // session.user.id, session.user.role, session.user.email
}
En API Routes
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  // session.user.id, session.user.role
}
En Client Components
import { useSession } from "next-auth/react";

function Component() {
  const { data: session } = useSession();
  // session?.user?.role
}
Tipos de sesión (TypeScript)
La sesión está augmentada en src/types/next-auth.d.ts para incluir id y role:

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}
Cerrar sesión
En Client Components:

import { signOut } from "next-auth/react";

signOut({ callbackUrl: "/login" });
Esto invalida la cookie de sesión y redirige al login.
