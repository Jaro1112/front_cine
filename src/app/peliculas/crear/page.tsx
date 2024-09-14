"use client";

import { useState } from 'react'
import { useRouter } from 'next/router'
import { peliculaService } from '../../services/peliculaService'
import PeliculaForm from '../../components/PeliculaForm'
import { Pelicula } from '../../types/pelicula'

export default function CrearPelicula() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (pelicula: Pelicula) => {
    try {
      await peliculaService.crearPelicula(pelicula)
      router.push('/peliculas')
    } catch (error) {
      setError('Error al crear la película')
      console.error('Error al crear la película:', error)
    }
  }

  return (
    <div className="container">
      <h2 className="text-center my-4">Crear Película</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <PeliculaForm onSubmit={handleSubmit} />
    </div>
  )
}
