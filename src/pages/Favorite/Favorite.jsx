import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FavoritesService } from "../Service/FavoritesService";
import FavoritesView from "./FavoriteView";






const Favorite = () => {
  // Redux state
  const tema = useSelector((state) => state.temaTotal);
  const bahasa = useSelector((state) => state.bahasaTotal);
  
  // State management
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Constants
  const isDark = tema === "Gelap";
  const isIndonesia = bahasa === "Indonesia";
  const navigate = useNavigate();

  // Text content
  const textContent = {
    myFavorites: isIndonesia ? "Film Favorit Saya" : "My Favorite Movies",
    loadingFavorites: isIndonesia ? "Memuat favorit..." : "Loading favorites...",
    noFavorites: isIndonesia ? "Belum ada film favorit" : "No favorite movies yet",
    addSomeFavorites: isIndonesia ? "Tambahkan beberapa film ke favorit!" : "Add some movies to favorites!",
    error: isIndonesia ? "Error" : "Error",
    rating: isIndonesia ? "Rating" : "Rating",
    releaseDate: isIndonesia ? "Tanggal Rilis" : "Release Date",
    removeFromFavorites: isIndonesia ? "Hapus dari Favorit" : "Remove from Favorites",
    playNow: isIndonesia ? "Putar Sekarang" : "Play Now",
    viewDetails: isIndonesia ? "Lihat Detail" : "View Details",
    favoriteMovies: isIndonesia ? "film favorit" : "favorite movies"
  };

  // Fetch favorites
  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await FavoritesService.getFavorites();
      setFavorites(data.results || []);
    } catch (err) {
      console.error("Gagal mengambil favorit:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Remove from favorites
  const handleRemoveFavorite = async (movieId, e) => {
    e.stopPropagation(); // Prevent triggering the card click
    try {
      await FavoritesService.removeFromFavorites(movieId);
      // Refresh favorites list
      await fetchFavorites();
    } catch (error) {
      console.error("Gagal menghapus favorit:", error);
      alert("Gagal menghapus dari favorit");
    }
  };

  // Navigate to detail
  const handleViewDetails = (movieId, e) => {
    e.stopPropagation(); // Prevent triggering the card click
    navigate(`/detail/${movieId}`);
  };

  // Handle card click
  const handleCardClick = (movieId) => {
    navigate(`/detail/${movieId}`);
  };

  // Handle play button click
  const handlePlayClick = (e) => {
    e.stopPropagation(); // Prevent triggering the card click
    // Add play functionality here
    console.log("Play movie");
  };

  // Initial fetch
  useEffect(() => {
    fetchFavorites();
  }, []);

  // Props untuk di-pass ke View component
  const viewProps = {
    favorites,
    loading,
    error,
    isDark,
    textContent,
    handleRemoveFavorite,
    handleViewDetails,
    handleCardClick,
    handlePlayClick
  };

  return <FavoritesView {...viewProps} />;
};

export default Favorite;