"use client";

import { useEffect, useState } from 'react'
import { Pelicula } from '../types/pelicula'
import { peliculaService } from '../services/peliculaService'
import PeliculaCard from '../components/PeliculaCard'
import Link from 'next/link'

const ITEMS_PER_PAGE = 6
const MAX_SEARCH_HISTORY = 5

export default function ListarPeliculas() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([])
  const [peliculasFiltradas, setPeliculasFiltradas] = useState<Pelicula[]>([])
  const [error, setError] = useState<string | null>(null)
  const [busqueda, setBusqueda] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  useEffect(() => {
    obtenerPeliculas()
  }, [])

  useEffect(() => {
    filtrarPeliculas()
  }, [busqueda, peliculas])

  const obtenerPeliculas = async () => {
    try {
      const data = await peliculaService.obtenerPeliculas()
      setPeliculas(data)
      setPeliculasFiltradas(data)
    } catch (error) {
      console.error('Error al obtener las películas:', error)
      setError('Error al cargar las películas. Por favor, intenta de nuevo más tarde.')
    }
  }

  const handleDelete = (id: number) => {
    const nuevasPeliculas = peliculas.filter(pelicula => pelicula.id !== id)
    setPeliculas(nuevasPeliculas)
    setPeliculasFiltradas(nuevasPeliculas)
  }

  const filtrarPeliculas = () => {
    const filtradas = peliculas.filter(pelicula =>
      pelicula.nombrePelicula.toLowerCase().includes(busqueda.toLowerCase())
    )
    setPeliculasFiltradas(filtradas)
    setCurrentPage(1)
  }

  const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBusqueda = e.target.value
    setBusqueda(newBusqueda)
    if (newBusqueda.trim() !== '') {
      setSearchHistory(prevHistory => {
        const newHistory = [newBusqueda, ...prevHistory.filter(item => item !== newBusqueda)]
        return newHistory.slice(0, MAX_SEARCH_HISTORY)
      })
    }
  }

  const handleSearchHistoryClick = (searchTerm: string) => {
    setBusqueda(searchTerm)
  }

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = peliculasFiltradas.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(peliculasFiltradas.length / ITEMS_PER_PAGE)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="my-0"><strong>Lista de Películas</strong></h3>
        <Link href="/peliculas/crear" className="btn btn-primary">
          Crear Nueva Película
        </Link>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar películas..."
          value={busqueda}
          onChange={handleBusquedaChange}
        />
        {searchHistory.length > 0 && (
          <div className="mt-2">
            <small>Búsquedas recientes:</small>
            {searchHistory.map((term, index) => (
              <button
                key={index}
                className="btn btn-sm btn-outline-secondary me-1 mb-1"
                onClick={() => handleSearchHistoryClick(term)}
              >
                {term}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {currentItems.map((pelicula) => (
          <div key={pelicula.id} className="col-md-4 mb-4">
            <PeliculaCard pelicula={pelicula} onDelete={handleDelete} />
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
