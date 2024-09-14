import axios from 'axios'
import { Serie } from '../types/serie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://back-cine-33wa.onrender.com/';

export const serieService = {
  obtenerSeries: async (): Promise<Serie[]> => {
    const response = await axios.get<Serie[]>(`${API_URL}api/series`)
    return response.data
  },

  crearSerie: async (serie: Serie): Promise<Serie> => {
    const response = await axios.post<Serie>(`${API_URL}api/series/crear-serie`, serie)
    return response.data
  },

  detallesSerie: async (id: number): Promise<Serie> => {
    const response = await axios.get<Serie>(`${API_URL}api/series/${id}`)
    return response.data
  },

  editarSerie: async (serie: Serie, id: number): Promise<Serie> => {
    const response = await axios.put<Serie>(`${API_URL}api/series/editar-serie/${id}`, serie)
    return response.data
  },

  eliminarSerie: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}api/series/eliminar-serie/${id}`)
  }
}
