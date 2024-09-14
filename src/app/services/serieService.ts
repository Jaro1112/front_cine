import axios from 'axios'
import { Serie } from '../types/serie'

const API_URL = 'https://mycineavg-diego-guerrero.onrender.com/api/series/'

export const serieService = {
  obtenerSeries: async (): Promise<Serie[]> => {
    const response = await axios.get<Serie[]>(`${API_URL}series/`)
    return response.data
  },

  crearSerie: async (serie: Serie): Promise<Serie> => {
    const response = await axios.post<Serie>(`${API_URL}crear-serie/`, serie)
    return response.data
  },

  detallesSerie: async (id: number): Promise<Serie> => {
    const response = await axios.get<Serie>(`${API_URL}serie/${id}`)
    return response.data
  },

  editarSerie: async (serie: Serie, id: number): Promise<Serie> => {
    const response = await axios.put<Serie>(`${API_URL}editar-serie/${id}/`, serie)
    return response.data
  },

  eliminarSerie: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}eliminar-serie/${id}`)
  }
}
