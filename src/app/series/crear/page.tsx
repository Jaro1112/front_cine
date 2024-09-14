"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { serieService } from '../../services/serieService'
import SerieForm from '../../components/SerieForm'
import { Serie } from '../../types/serie'

export default function CrearSerie() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (serie: Serie) => {
    try {
      await serieService.crearSerie(serie)
      router.push('/series')
    } catch (error) {
      setError('Error al crear la serie')
      console.error('Error al crear la serie:', error)
    }
  }

  return (
    <div className="container">
      <h2 className="text-center my-4">Crear Serie</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <SerieForm onSubmit={handleSubmit} />
    </div>
  )
}
