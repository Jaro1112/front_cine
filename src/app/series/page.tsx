"use client";

import { useEffect, useState, useCallback } from 'react'
import { Serie } from '../types/serie'
import SerieCard from '../components/SerieCard'
import Link from 'next/link'
import { serieService } from '../services/serieService'

const ITEMS_PER_PAGE = 6

export default function ListarSeries() {
  const [series, setSeries] = useState<Serie[]>([])
  const [seriesFiltradas, setSeriesFiltradas] = useState<Serie[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerSeries()
  }, [])

  const filtrarSeries = useCallback(() => {
    const filtradas = series.filter(serie =>
      serie.nombreSerie.toLowerCase().includes(busqueda.toLowerCase())
    )
    setSeriesFiltradas(filtradas)
    setCurrentPage(1)
  }, [busqueda, series])

  useEffect(() => {
    filtrarSeries()
  }, [busqueda, series, filtrarSeries])

  const handleDelete = (id: number) => {
    const nuevasSeries = series.filter(serie => serie.id !== id)
    setSeries(nuevasSeries)
    setSeriesFiltradas(nuevasSeries)
  }

  const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value)
  }

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = seriesFiltradas.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(seriesFiltradas.length / ITEMS_PER_PAGE)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const obtenerSeries = async () => {
    try {
      const data = await serieService.obtenerSeries()
      setSeries(data)
      setSeriesFiltradas(data)
      setError(null)
    } catch (error) {
      console.error('Error al obtener las series:', error)
      setError('Hubo un error al cargar las series. Por favor, intenta de nuevo.')
    }
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="my-0"><strong>Lista de Series</strong></h3>
        <Link href="/series/crear" className="btn btn-primary">
          Crear Nueva Serie
        </Link>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar series..."
          value={busqueda}
          onChange={handleBusquedaChange}
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {currentItems.map((serie) => (
          <div key={serie.id} className="col-md-4 mb-4">
            <SerieCard serie={serie} onDelete={handleDelete} />
          </div>
        ))}
      </div>
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
