import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { serieService } from '../../../services/serieService'
import SerieForm from '../../../components/SerieForm'
import { Serie } from '../../../types/serie'

export default function EditarSerie() {
  const router = useRouter()
  const { id } = router.query
  const [serie, setSerie] = useState<Serie | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      obtenerSerie(Number(id))
    }
  }, [id])

  const obtenerSerie = async (serieId: number) => {
    try {
      const data = await serieService.detallesSerie(serieId)
      setSerie(data)
    } catch (error) {
      setError('Error al obtener la serie')
      console.error('Error al obtener la serie:', error)
    }
  }

  const handleSubmit = async (serieActualizada: Serie) => {
    try {
      await serieService.editarSerie(serieActualizada, Number(id))
      router.push('/series')
    } catch (error) {
      setError('Error al actualizar la serie')
      console.error('Error al actualizar la serie:', error)
    }
  }

  if (!serie) {
    return <div>Cargando...</div>
  }

  return (
    <div className="container">
      <h2 className="text-center my-4">Editar Serie</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <SerieForm serie={serie} onSubmit={handleSubmit} />
    </div>
  )
}
