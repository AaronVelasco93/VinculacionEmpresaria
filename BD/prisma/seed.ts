import { PrismaClient } from "@prisma/client"; // Ajusta según tu generación
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1. Seed de Tipos de Espacio
  const tiposData = [
    { id: 1, nombre: "Aulas" },
    { id: 2, nombre: "Baños" },
    { id: 3, nombre: "Laboratorios" },
    { id: 4, nombre: "Áreas Comunes" },
    { id: 5, nombre: "Oficinas" },
  ];

  for (const t of tiposData) {
    await prisma.tipoEspacio.upsert({
      where: { id: t.id },
      update: { nombre: t.nombre },
      create: t,
    });
  }

  // 2. Seed de Grupos
  const gruposData = [
    { id: 1, nombre: "Edificio A" },
    { id: 2, nombre: "Edificio B" },
    { id: 3, nombre: "Edificio C" },
    { id: 4, nombre: "Pabellón Principal" },
  ];

  for (const g of gruposData) {
    await prisma.grupo.upsert({
      where: { id: g.id },
      update: { nombre: g.nombre },
      create: g,
    });
  }

  // 3. Seed de Espacios
  const espaciosData = [
    { id: 1, espacio: "Aula 101", idGrupo: 1, idTipoEspacio: 1 },
    { id: 2, espacio: "Aula 102", idGrupo: 1, idTipoEspacio: 1 },
    { id: 3, espacio: "Aula 201", idGrupo: 2, idTipoEspacio: 1 },
    { id: 4, espacio: "Baño Planta Baja", idGrupo: 1, idTipoEspacio: 2 },
    { id: 5, espacio: "Baño Segundo Piso", idGrupo: 2, idTipoEspacio: 2 },
    { id: 6, espacio: "Lab. Cómputo", idGrupo: 3, idTipoEspacio: 3 },
    { id: 7, espacio: "Lab. Ciencias", idGrupo: 3, idTipoEspacio: 3 },
    { id: 8, espacio: "Patio Central", idGrupo: 4, idTipoEspacio: 4 },
    { id: 9, espacio: "Dirección", idGrupo: 4, idTipoEspacio: 5 },
  ];

  for (const e of espaciosData) {
    await prisma.espacio.upsert({
      where: { id: e.id },
      update: { 
        espacio: e.espacio,
        idGrupo: e.idGrupo,
        idTipoEspacio: e.idTipoEspacio 
      },
      create: e,
    });
  }

  // 4. Seed de Usuarios (Password hashing)
  const users = [
    { email: "admin@faciltrack.local", name: "Administrador", role: "ADMIN", pass: "admin123" },
    { email: "staff@faciltrack.local", name: "Personal Staff", role: "STAFF", pass: "staff123" },
    { email: "tecnico@faciltrack.local", name: "Técnico Mantenimiento", role: "TECNICO", pass: "tecnico123" },
  ];

  for (const u of users) {
    const hashedPassword = await bcrypt.hash(u.pass, 10);
    await prisma.user.upsert({
      where: { email: u.email },
      update: { role: u.role as any }, // Casteo simple para Enums
      create: {
        email: u.email,
        name: u.name,
        password: hashedPassword,
        role: u.role as any,
      },
    });
  }

  console.log("✅ Seed completado con éxito");
}

main()
  .catch((e) => {
    console.error("❌ Error en el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });