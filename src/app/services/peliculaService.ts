import axios from 'axios'
import { Pelicula } from '../types/pelicula'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://back-cine-33wa.onrender.com/';

export const peliculaService = {
  obtenerPeliculas: async (): Promise<Pelicula[]> => {
    const response = await axios.get<Pelicula[]>(`${API_URL}api/peliculas`)
    return response.data
  },

  crearPelicula: async (pelicula: Pelicula): Promise<Pelicula> => {
    const response = await axios.post<Pelicula>(`${API_URL}api/peliculas/crear-pelicula`, pelicula)
    return response.data
  },

  detallesPelicula: async (id: number): Promise<Pelicula> => {
    const response = await axios.get<Pelicula>(`${API_URL}api/peliculas/${id}`)
    return response.data
  },

  editarPelicula: async (pelicula: Pelicula, id: number): Promise<Pelicula> => {
    const response = await axios.put<Pelicula>(`${API_URL}api/peliculas/editar-serie/${id}/`, pelicula)
    return response.data
  },

  eliminarPelicula: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}api/peliculas/eliminar-pelicula/${id}`)
  }
}
