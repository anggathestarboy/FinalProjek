import axios from "axios";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const favoritesService = {
  // Add to favorites
  addToFavorites: async (movieId) => {
    try {
      const response = await api.post(
        `/account/${ACCOUNT_ID}/favorite`,
        {
          media_type: "movie",
          media_id: movieId,
          favorite: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Gagal menambahkan favorite:", error.response?.data || error.message);
      throw error;
    }
  },

  // Remove from favorites
  removeFromFavorites: async (movieId) => {
    try {
      const response = await api.post(
        `/account/${ACCOUNT_ID}/favorite`,
        {
          media_type: "movie",
          media_id: movieId,
          favorite: false,
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Gagal menghapus favorite:", error.response?.data || error.message);
      throw error;
    }
  },

  // Get favorite movies
  getFavorites: async () => {
    try {
      const response = await api.get(
        `/account/${ACCOUNT_ID}/favorite/movies`
      );
      return response.data;
    } catch (error) {
      console.error("❌ Gagal mengambil favorites:", error.response?.data || error.message);
      throw error;
    }
  },

  // Check if movie is favorite
  checkIsFavorite: async (movieId) => {
    try {
      const favorites = await favoritesService.getFavorites();
      return favorites.results.some(movie => movie.id === movieId);
    } catch (error) {
      console.error("❌ Gagal mengecek status favorite:", error);
      return false;
    }
  }
};


console.log(import.meta.env.VITE_TMDB_ACCOUNT_ID);