import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Serie } from '../types/serie'
import { serieService } from '../services/serieService'

interface SerieCardProps {
  serie: Serie
  onDelete: (id: number) => void
}

export default function SerieCard({ serie, onDelete }: SerieCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de que quieres eliminar esta serie?')) {
      setIsDeleting(true)
      try {
        await serieService.eliminarSerie(serie.id)
        onDelete(serie.id)
      } catch (error) {
        console.error('Error al eliminar la serie:', error)
        alert('Hubo un error al eliminar la serie')
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{serie.nombreSerie}</h5>
        <div className="image-container flex-grow-1">
          <Image 
            src={serie.img} 
            alt={`Imagen de ${serie.nombreSerie}`}
            width={300}
            height={400}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <p className="card-text"><strong>Duración:</strong> {serie.duracion}</p>
        <p className="card-text"><strong>Género:</strong> {serie.genero}</p>
        <p className="card-text"><strong>Fecha de Estreno:</strong> {serie.fechaEstreno}</p>
        <p className="card-text"><strong>País:</strong> {serie.pais}</p>
        <div className="mt-auto">
          <Link href={`/series/editar/${serie.id}`} className="btn btn-primary mr-2">
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
