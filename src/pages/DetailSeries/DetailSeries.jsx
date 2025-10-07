import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DetailSeriesView from "./DetailSeriesView";
import { favoritesService } from "../service/FavoritesService";

const DetailSeries = () => {
  // Redux state
  const tema = useSelector((state) => state.temaTotal);
  const bahasa = useSelector((state) => state.bahasaTotal);
  const { id } = useParams();
  
  // State management
  const [series, setSeries] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  
  // Pagination state
  const [currentSeasonPage, setCurrentSeasonPage] = useState(1);
  const [seasonsPerPage] = useState(5);

  // Constants
  const isDark = tema === "Gelap";
  const isIndonesia = bahasa === "Indonesia";

  // Text content
  const textContent = {
    loadingSeries: isIndonesia ? "Memuat Series..." : "Loading Series...",
    error: isIndonesia ? "Error" : "Error",
    failedToLoad: isIndonesia ? "Gagal mengambil data series" : "Failed to load series data",
    playNow: isIndonesia ? "Putar Sekarang" : "Play Now",
    overview: isIndonesia ? "Sinopsis" : "Overview",
    rating: isIndonesia ? "Rating" : "Rating",
    popularity: isIndonesia ? "Popularitas" : "Popularity",
    seasons: isIndonesia ? "Musim" : "Seasons",
    status: isIndonesia ? "Status" : "Status",
    firstAirDate: isIndonesia ? "Tanggal Tayang Pertama" : "First Air Date",
    homepage: isIndonesia ? "Situs Web" : "Homepage",
    spokenLanguages: isIndonesia ? "Bahasa yang Digunakan" : "Spoken Languages",
    rateThisSeries: isIndonesia ? "Beri Rating Series Ini" : "Rate This Series",
    remove: isIndonesia ? "Hapus" : "Remove",
    addToFavorite: isIndonesia ? "Tambahkan ke Favorit" : "Add To Favorite",
    favorited: isIndonesia ? "Difavoritkan" : "Favorited",
    favorite: isIndonesia ? "Favorit" : "Favorite",
    bookmarked: isIndonesia ? "Ditandai" : "Bookmarked",
    bookmark: isIndonesia ? "Tandai" : "Bookmark",
    share: isIndonesia ? "Bagikan" : "Share",
    topCast: isIndonesia ? "Pemeran Utama" : "Top Cast",
    viewAll: isIndonesia ? "Lihat Semua →" : "View All →",
    productionCompanies: isIndonesia ? "Perusahaan Produksi" : "Production Companies",
    similarSeries: isIndonesia ? "Series Serupa" : "Similar Series",
    noSimilarSeries: isIndonesia ? "Tidak ada series serupa" : "No similar series found",
    details: isIndonesia ? "Detail" : "Details",
    seasonsSection: isIndonesia ? "Musim" : "Seasons",
    episodes: isIndonesia ? "Episode" : "Episodes",
    noOverview: isIndonesia ? "Tidak ada sinopsis" : "No overview available",
    language: isIndonesia ? "Bahasa" : "Language",
    page: isIndonesia ? "Halaman" : "Page",
    of: isIndonesia ? "dari" : "of",
    comingSoon: isIndonesia ? "Segera Hadir" : "Coming Soon",
    ratingSaved: isIndonesia ? "Rating disimpan!" : "Rating saved!",
    ratingRemoved: isIndonesia ? "Rating dihapus!" : "Rating removed!"
  };

  // Local Storage functions for ratings
  const getStoredRating = (seriesId) => {
    try {
      const ratings = JSON.parse(localStorage.getItem('seriesRatings')) || {};
      return ratings[seriesId] || 0;
    } catch (error) {
      console.error("Error getting stored rating:", error);
      return 0;
    }
  };

  const saveRatingToStorage = (seriesId, ratingValue) => {
    try {
      const ratings = JSON.parse(localStorage.getItem('seriesRatings')) || {};
      if (ratingValue > 0) {
        ratings[seriesId] = ratingValue;
      } else {
        delete ratings[seriesId];
      }
      localStorage.setItem('seriesRatings', JSON.stringify(ratings));
    } catch (error) {
      console.error("Error saving rating to storage:", error);
    }
  };

  // Fetch series details
  const ambilDetailSeries = async () => {
    try {
      setLoading(true);
      const seriesResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${id}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_KEY_TMDB}`,
          },
        }
      );
      
      if (!seriesResponse.ok) throw new Error(textContent.failedToLoad);
      const seriesData = await seriesResponse.json();
      setSeries(seriesData);

      // Load stored rating
      const storedRating = getStoredRating(seriesData.id);
      setRating(storedRating);

      // Check if series is favorite
      try {
        const favoriteStatus = await favoritesService.checkIsFavorite(seriesData.id);
        setIsFavorite(favoriteStatus);
      } catch (error) {
        console.error("Gagal mengecek status favorit:", error);
      }

      // Fetch additional data in parallel
      await Promise.all([
        ambilSimilarSeries(id),
        ambilCastData(id)
      ]);
    } catch (err) {
      console.error("Gagal mengambil data series:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch similar series
  const ambilSimilarSeries = async (seriesId) => {
    try {
      setSimilarLoading(true);
      const similarResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${seriesId}/similar`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_KEY_TMDB}`,
          },
        }
      );
      
      if (similarResponse.ok) {
        const similarData = await similarResponse.json();
        setSimilar(similarData.results.slice(0, 8));
      }
    } catch (err) {
      console.error("Gagal mengambil series similar:", err);
    } finally {
      setSimilarLoading(false);
    }
  };

  // Fetch cast data
  const ambilCastData = async (seriesId) => {
    try {
      const castResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${seriesId}/credits`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_KEY_TMDB}`,
          },
        }
      );
      
      if (castResponse.ok) {
        const castData = await castResponse.json();
        setCast(castData.cast.slice(0, 12));
      }
    } catch (err) {
      console.error("Gagal mengambil data cast:", err);
    }
  };

  // Handle rating change
  const handleRatingChange = async (newRating) => {
    if (!series) return;
    
    const previousRating = rating;
    setRating(newRating);
    
    try {
      saveRatingToStorage(series.id, newRating);
      
      // Show success message
      if (newRating > 0) {
        console.log(textContent.ratingSaved);
        // You can add a toast notification here
      } else {
        console.log(textContent.ratingRemoved);
        // You can add a toast notification here
      }
    } catch (error) {
      console.error("Gagal menyimpan rating:", error);
      // Revert to previous rating if save fails
      setRating(previousRating);
    }
  };

  // Handle favorite toggle
  const handleFavoriteToggle = async () => {
    if (!series) return;
    
    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        // Remove from favorites
        await favoritesService.removeFromFavorites(series.id);
        setIsFavorite(false);
      } else {
        // Add to favorites
        await favoritesService.addToFavorites(series.id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Gagal mengubah status favorit:", error);
      alert("Gagal mengubah status favorit");
    } finally {
      setFavoriteLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (id) {
      ambilDetailSeries();
    }
  }, [id]);

  // Pagination calculations
  const indexOfLastSeason = currentSeasonPage * seasonsPerPage;
  const indexOfFirstSeason = indexOfLastSeason - seasonsPerPage;
  const currentSeasons = series?.seasons?.slice(indexOfFirstSeason, indexOfLastSeason) || [];
  const totalSeasonPages = Math.ceil((series?.seasons?.length || 0) / seasonsPerPage);

  // Pagination handlers
  const paginateSeasons = (pageNumber) => setCurrentSeasonPage(pageNumber);
  const nextPage = () => {
    if (currentSeasonPage < totalSeasonPages) {
      setCurrentSeasonPage(currentSeasonPage + 1);
    }
  };
  const prevPage = () => {
    if (currentSeasonPage > 1) {
      setCurrentSeasonPage(currentSeasonPage - 1);
    }
  };

  // UI state handlers
  const handleBookmarkToggle = () => setIsBookmarked(!isBookmarked);

  // Props for view component
  const viewProps = {
    // Data
    series,
    similar,
    cast,
    currentSeasons,
    
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
    currentSeasonPage,
    totalSeasonPages,
    
    // Handlers
    onRatingChange: handleRatingChange,
    onFavoriteToggle: handleFavoriteToggle,
    onBookmarkToggle: handleBookmarkToggle,
    onPrevPage: prevPage,
    onNextPage: nextPage,
    onPaginate: paginateSeasons
  };

  return <DetailSeriesView {...viewProps} />;
};

export default DetailSeries;