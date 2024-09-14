import axios from 'axios'
import { Pelicula } from '../types/pelicula'

const API_URL = 'https://mycineavg-diego-guerrero.onrender.com/api/peliculas/'

export const peliculaService = {
  obtenerPeliculas: async (): Promise<Pelicula[]> => {
    const response = await axios.get<Pelicula[]>(`${API_URL}peliculas/`)
    return response.data
  },

  crearPelicula: async (pelicula: Pelicula): Promise<Pelicula> => {
    const response = await axios.post<Pelicula>(`${API_URL}crear-pelicula/`, pelicula)
    return response.data
  },

  detallesPelicula: async (id: number): Promise<Pelicula> => {
    const response = await axios.get<Pelicula>(`${API_URL}pelicula/${id}`)
    return response.data
  },

  editarPelicula: async (pelicula: Pelicula, id: number): Promise<Pelicula> => {
    const response = await axios.put<Pelicula>(`${API_URL}editar-pelicula/${id}/`, pelicula)
    return response.data
  },

  eliminarPelicula: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}eliminar-pelicula/${id}`)
  }
}
