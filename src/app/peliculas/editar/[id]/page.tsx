"use client";

import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { peliculaService } from '../../../services/peliculaService'
import PeliculaForm from '../../../components/PeliculaForm'
import { Pelicula } from '../../../types/pelicula'

export default function EditarPelicula({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const [pelicula, setPelicula] = useState<Pelicula | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      obtenerPelicula(Number(id))
    }
  }, [id])

  const obtenerPelicula = async (peliculaId: number) => {
    try {
      const data = await peliculaService.detallesPelicula(peliculaId)
      setPelicula(data)
    } catch (error) {
      setError('Error al obtener la película')
      console.error('Error al obtener la película:', error)
    }
  }

  const handleSubmit = async (peliculaActualizada: Pelicula) => {
    try {
      await peliculaService.editarPelicula(peliculaActualizada, Number(id))
      router.push('/peliculas')
    } catch (error) {
      setError('Error al actualizar la película')
      console.error('Error al actualizar la película:', error)
      if (axios.isAxiosError(error) && error.response) {
        console.error('Respuesta del servidor:', error.response.data)
      }
    }
  }

  if (!pelicula) {
    return <div>Cargando...</div>
  }

  return (
    <div className="container">
      <h2 className="text-center my-4">Editar Película</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <PeliculaForm pelicula={pelicula} onSubmit={handleSubmit} />
    </div>
  )
}
