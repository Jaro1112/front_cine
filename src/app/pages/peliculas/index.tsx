import { useEffect, useState } from 'react'
import { Pelicula } from '../../types/pelicula'
import { peliculaService } from '../../services/peliculaService'
import Link from 'next/link'

export default function ListarPeliculas() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([])

  useEffect(() => {
    obtenerPeliculas()
  }, [])

  const obtenerPeliculas = async () => {
    try {
      const data = await peliculaService.obtenerPeliculas()
      setPeliculas(data)
    } catch (error) {
      console.error('Error al obtener las películas:', error)
    }
  }

  return (
    <div className="container-fluid">
      <h3 className="text-center my-4"><strong>Lista de Películas</strong></h3>
      <div className="row">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{pelicula.nombrePelicula}</h5>
                <div className="image-container flex-grow-1">
                  <img className="card-img-top" src={pelicula.img} alt={`Imagen de ${pelicula.nombrePelicula}`} />
                </div>
                <p className="card-text"><strong>Duración:</strong> {pelicula.duracion}</p>
                <p className="card-text"><strong>Género:</strong> {pelicula.genero}</p>
                <p className="card-text"><strong>Fecha de Estreno:</strong> {pelicula.fechaEstreno}</p>
                <p className="card-text"><strong>País:</strong> {pelicula.pais}</p>
                <Link href={`/peliculas/editar/${pelicula.id}`} className="btn btn-primary align-self-center">
                  Editar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}