'use server'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function crearReporte(formData: FormData) {
  const nombre = formData.get('nombre') as string
  const ubicacion = formData.get('ubicacion') as string
  const aula = formData.get('aula') as string
  const descripcion = formData.get('descripcion') as string
  
  // Nuevos campos de la Regla de Negocio RB-16
  const limpieza = formData.get('limpieza') as string
  const iluminacion = formData.get('iluminacion') as string
  const mobiliario = formData.get('mobiliario') as string

  await prisma.reporte.create({
    data: {
      reporteroNombre: nombre,
      ubicacion: ubicacion,
      aula: aula,
      descripcion: descripcion,
      limpieza: limpieza,
      iluminacion: iluminacion,
      mobiliario: mobiliario,
      estado: "Pendiente" // Estado inicial por defecto
    }
  })

  revalidatePath('/')
}