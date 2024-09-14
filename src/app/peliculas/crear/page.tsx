"use client";

import { useState } from 'react'
import { peliculaService } from '../../services/peliculaService'
import PeliculaForm from '../../components/PeliculaForm'
import { Pelicula } from '../../types/pelicula'
import Link from 'next/link'

export default function CrearPelicula() {
  const [error, setError] = useState<string | null>(null)
  const [peliculaCreada, setPeliculaCreada] = useState(false)

  const handleSubmit = async (pelicula: Pelicula) => {
    try {
      await peliculaService.crearPelicula(pelicula)
      setPeliculaCreada(true)
    } catch (error) {
      setError('Error al crear la película')
      console.error('Error al crear la película:', error)
    }
  }

  if (peliculaCreada) {
    return (
      <div className="container">
        <h2 className="text-center my-4">Película creada con éxito</h2>
        <Link href="/peliculas" className="btn btn-primary">
          Volver a la lista de películas
        </Link>
      </div>
    )
  }

  return (
    <div className="container">
      <h2 className="text-center my-4">Crear Película</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <PeliculaForm onSubmit={handleSubmit} />
    </div>
  )
}