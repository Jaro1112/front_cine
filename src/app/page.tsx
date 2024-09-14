"use client";

import { useState, useEffect } from 'react'
import { Pelicula } from './types/pelicula'
import { Serie } from './types/serie'
import { peliculaService } from './services/peliculaService'
import { serieService } from './services/serieService'
import PeliculaCard from './components/PeliculaCard'
import SerieCard from './components/SerieCard'

export default function Home() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([])
  const [series, setSeries] = useState<Serie[]>([])
  //
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    obtenerPeliculas()
    obtenerSeries()
  }, [])

  const obtenerPeliculas = async () => {
    try {
      const data = await peliculaService.obtenerPeliculas()
      setPeliculas(data)
      setError(null)
    } catch (error) {
      console.error('Error al obtener las películas:', error)
      setError('Error al cargar las películas. Por favor, intenta de nuevo más tarde.')
      setPeliculas([])
    }
  }

  const obtenerSeries = async () => {
    try {
      const data = await serieService.obtenerSeries()
      setSeries(data)
    } catch (error) {
      console.error('Error al obtener las series:', error)
    }
  }

  const handleDeletePelicula = (id: number) => {
    setPeliculas(peliculas.filter(pelicula => pelicula.id !== id))
  }

  const handleDeleteSerie = (id: number) => {
    setSeries(series.filter(serie => serie.id !== id))
  }

  return (
    <div className="container-fluid">
      <h3 className="text-center my-4"><strong>Home - Películas y Series</strong></h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="section-title">Películas</div>
      <div className="row">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="col-md-4 mb-4">
            <PeliculaCard pelicula={pelicula} onDelete={handleDeletePelicula} />
          </div>
        ))}
      </div>

      <div className="section-title">Series</div>
      <div className="row">
        {series.map((serie) => (
          <div key={serie.id} className="col-md-4 mb-4">
            <SerieCard serie={serie} onDelete={handleDeleteSerie} />
          </div>
        ))}
      </div>
    </div>
  )
}
