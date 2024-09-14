import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Pelicula } from '../types/pelicula'
import { peliculaService } from '../services/peliculaService'

interface PeliculaCardProps {
  pelicula: Pelicula
  onDelete: (id: number) => void
}

export default function PeliculaCard({ pelicula, onDelete }: PeliculaCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter()

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
      setIsDeleting(true)
      try {
        await peliculaService.eliminarPelicula(pelicula.id)
        onDelete(pelicula.id)
      } catch (error) {
        console.error('Error al eliminar la película:', error)
        alert('Hubo un error al eliminar la película')
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{pelicula.nombrePelicula}</h5>
        <div className="image-container flex-grow-1">
          <Image 
            src={pelicula.img} 
            alt={`Imagen de ${pelicula.nombrePelicula}`}
            width={300}
            height={400}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <p className="card-text"><strong>Duración:</strong> {pelicula.duracion}</p>
        <p className="card-text"><strong>Género:</strong> {pelicula.genero}</p>
        <p className="card-text"><strong>Fecha de Estreno:</strong> {pelicula.fechaEstreno}</p>
        <p className="card-text"><strong>País:</strong> {pelicula.pais}</p>
        <div className="mt-auto">
          <Link href={`/peliculas/editar/${pelicula.id}`} className="btn btn-primary mr-2">
            Editar
          </Link>
          <button 
            onClick={handleDelete} 
            className="btn btn-danger" 
            disabled={isDeleting}
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  )
}