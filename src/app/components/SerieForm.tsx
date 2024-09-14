import { useState, useEffect } from 'react'
import { Serie } from '../types/serie'

interface SerieFormProps {
  serie?: Serie
  onSubmit: (serie: Serie) => void
}

export default function SerieForm({ serie, onSubmit }: SerieFormProps) {
  const [formData, setFormData] = useState<Serie>({
    id: 0,
    nombreSerie: '',
    duracion: '',
    genero: '',
    fechaEstreno: '',
    pais: '',
    img: ''
  })

  useEffect(() => {
    if (serie) {
      setFormData(serie)
    }
  }, [serie])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nombreSerie" className="form-label">Nombre de la Serie</label>
        <input
          type="text"
          className="form-control"
          id="nombreSerie"
          name="nombreSerie"
          value={formData.nombreSerie}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="duracion" className="form-label">Duración</label>
        <input
          type="text"
          className="form-control"
          id="duracion"
          name="duracion"
          value={formData.duracion}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="genero" className="form-label">Género</label>
        <input
          type="text"
          className="form-control"
          id="genero"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="fechaEstreno" className="form-label">Fecha de Estreno</label>
        <input
          type="date"
          className="form-control"
          id="fechaEstreno"
          name="fechaEstreno"
          value={formData.fechaEstreno}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="pais" className="form-label">País</label>
        <input
          type="text"
          className="form-control"
          id="pais"
          name="pais"
          value={formData.pais}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="img" className="form-label">URL de la Imagen</label>
        <input
          type="url"
          className="form-control"
          id="img"
          name="img"
          value={formData.img}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  )
}
