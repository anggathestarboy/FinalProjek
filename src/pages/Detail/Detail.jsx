import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DetailView from "./DetailView";
import { FavoritesService } from "../Service/FavoritesService";

// Service untuk mengelola rating di localStorage
const ratingService = {
  // Key untuk localStorage
  STORAGE_KEY: 'movie_ratings',
  
  // Mendapatkan semua rating
  getAllRatings() {
    try {
      const ratings = localStorage.getItem(this.STORAGE_KEY);
      return ratings ? JSON.parse(ratings) : {};
    } catch (error) {
      console.error('Error getting ratings:', error);
      return {};
    }
  },
  
  // Mendapatkan rating untuk movie tertentu
  getUserRating(movieId) {
    const ratings = this.getAllRatings();
    return ratings[movieId] || 0;
  },
  
  // Menyimpan rating
  addRating(movieId, rating) {
    try {
      const ratings = this.getAllRatings();
      ratings[movieId] = rating;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ratings));
      return true;
    } catch (error) {
      console.error('Error saving rating:', error);
      throw error;
    }
  },
  
  // Menghapus rating
  removeRating(movieId) {
    try {
      const ratings = this.getAllRatings();
      delete ratings[movieId];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ratings));
      return true;
    } catch (error) {
      console.error('Error removing rating:', error);
      throw error;
    }
  }
};

const Detail = () => {
  // Redux state
  const tema = useSelector((state) => state.temaTotal);
  const bahasa = useSelector((state) => state.bahasaTotal);
  const { id } = useParams();
  
  // State management
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [ratingLoading, setRatingLoading] = useState(false);

  // Constants
  const isDark = tema === "Gelap";
  const isIndonesia = bahasa === "Indonesia";

  // Text content
  const textContent = {
    loadingMovie: isIndonesia ? "Memuat Film..." : "Loading Movie...",
    error: isIndonesia ? "Error" : "Error",
    failedToLoad: isIndonesia ? "Gagal mengambil data film" : "Failed to load movie data",
    playNow: isIndonesia ? "Putar Sekarang" : "Play Now",
    overview: isIndonesia ? "Sinopsis" : "Overview",
    rating: isIndonesia ? "Rating" : "Rating",
    views: isIndonesia ? "Dilihat" : "Views",
    duration: isIndonesia ? "Durasi" : "Duration",
    status: isIndonesia ? "Status" : "Status",
    releaseDate: isIndonesia ? "Tanggal Rilis" : "Release Date",
    revenue: isIndonesia ? "Pendapatan" : "Revenue",
    budget: isIndonesia ? "Anggaran" : "Budget",
    popularity: isIndonesia ? "Popularitas" : "Popularity",
    language: isIndonesia ? "Bahasa" : "Language",
    rateThisMovie: isIndonesia ? "Beri Rating Film Ini" : "Rate This Movie",
    remove: isIndonesia ? "Hapus" : "Remove",
    addToList: isIndonesia ? "Tambahkan ke Daftar" : "Add To List",
    favorited: isIndonesia ? "Difavoritkan" : "Favorited",
    favorite: isIndonesia ? "Favorit" : "Favorite",
    bookmarked: isIndonesia ? "Ditandai" : "Bookmarked",
    bookmark: isIndonesia ? "Tandai" : "Bookmark",
    share: isIndonesia ? "Bagikan" : "Share",
    topCast: isIndonesia ? "Pemeran Utama" : "Top Cast",
    viewAll: isIndonesia ? "Lihat Semua →" : "View All →",
    productionCompanies: isIndonesia ? "Perusahaan Produksi" : "Production Companies",
    similarMovies: isIndonesia ? "Film Serupa" : "Similar Movies",
    noSimilarMovies: isIndonesia ? "Tidak ada film serupa" : "No similar movies found",
    details: isIndonesia ? "Detail" : "Details",
    comingSoon: isIndonesia ? "Segera Hadir" : "Coming Soon",
    noOverview: isIndonesia ? "Tidak ada sinopsis" : "No overview available",
    episodes: isIndonesia ? "Episode" : "Episodes",
    seasons: isIndonesia ? "Musim" : "Seasons"
  };

  // Fetch movie details
  const ambilDetailFilm = async () => {
    try {
      setLoading(true);
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_KEY_TMDB}`,
          },
        }
      );

      if (!movieResponse.ok) throw new Error(textContent.failedToLoad);
      const movieData = await movieResponse.json();
      setMovie(movieData);

      // Check if movie is favorite
      try {
        const favoriteStatus = await favoritesService.checkIsFavorite(movieData.id);
        setIsFavorite(favoriteStatus);
      } catch (error) {
        console.error("Gagal mengecek status favorit:", error);
      }

      // Check user rating from localStorage
      try {
        const userRating = ratingService.getUserRating(movieData.id);
        setRating(userRating);
        console.log("User rating loaded:", userRating);
      } catch (error) {
        console.error("Gagal mengambil rating pengguna:", error);
        setRating(0);
      }

      // Fetch additional data in parallel
      await Promise.all([
        ambilCastData(id),
        ambilSimilarFilm(id)
      ]);
    } catch (err) {
      console.error("Gagal mengambil data film:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cast data
  const ambilCastData = async (movieId) => {
    try {
      const castResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_KEY_TMDB}`,
          },
        }
      );

      if (castResponse.ok) {
        const castData = await castResponse.json();
        setCast(castData.cast.slice(0, 8));
      }
    } catch (err) {
      console.error("Gagal mengambil data cast:", err);
    }
  };

  // Fetch similar movies
  const ambilSimilarFilm = async (movieId) => {
    try {
      setSimilarLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_KEY_TMDB}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSimilarMovies(data.results.slice(0, 8));
      }
    } catch (err) {
      console.error("Gagal mengambil film similar:", err);
    } finally {
      setSimilarLoading(false);
    }
  };

  // Handle favorite toggle
  const handleFavoriteToggle = async () => {
    if (!movie) return;
    
    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        // Remove from favorites
        await favoritesService.removeFromFavorites(movie.id);
        setIsFavorite(false);
      } else {
        // Add to favorites
        await favoritesService.addToFavorites(movie.id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Gagal mengubah status favorit:", error);
      alert("Gagal mengubah status favorit");
    } finally {
      setFavoriteLoading(false);
    }
  };

  // Handle rating change
  const handleRatingChange = async (newRating) => {
    if (!movie) return;
    
    setRatingLoading(true);
    try {
      if (newRating === 0) {
        // Remove rating from localStorage
        await ratingService.removeRating(movie.id);
        setRating(0);
        alert(isIndonesia ? "Rating berhasil dihapus!" : "Rating removed successfully!");
      } else {
        // Add/update rating to localStorage
        await ratingService.addRating(movie.id, newRating);
        setRating(newRating);
        alert(isIndonesia ? `Rating ${newRating}/5 berhasil disimpan!` : `Rating ${newRating}/5 saved successfully!`);
      }
    } catch (error) {
      console.error("Gagal mengubah rating:", error);
      alert(isIndonesia ? "Gagal menyimpan rating: " + error.message : "Failed to save rating: " + error.message);
    } finally {
      setRatingLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (id) {
      ambilDetailFilm();
    }
  }, [id]);

  // Utility functions
  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "-";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}${isIndonesia ? 'j' : 'h'} ${mins}${isIndonesia ? 'm' : 'm'}`;
  };

  const truncateOverview = (text, maxLength = 150) => {
    if (!text) return textContent.noOverview;
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  // UI state handlers
  const handleBookmarkToggle = () => setIsBookmarked(!isBookmarked);

  // Props for view component
  const viewProps = {
    // Data
    movie,
    cast,
    similarMovies,
    
    // UI State
    isDark,
    textContent,
    loading,
    similarLoading,
    error,
    rating,
    isFavorite,
    isBookmarked,
    favoriteLoading,
    ratingLoading,
    
    // Utility functions
    formatCurrency,
    formatRuntime,
    truncateOverview,
    
    // Handlers
    onRatingChange: handleRatingChange,
    onFavoriteToggle: handleFavoriteToggle,
    onBookmarkToggle: handleBookmarkToggle
  };

  return <DetailView {...viewProps} />;
};

export default Detail;