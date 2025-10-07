import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CategoryView from "./CategoryView";

const Category = () => {
  const tema = useSelector((state) => state.temaTotal);
  const bahasa = useSelector((state) => state.bahasaTotal);
  const isDark = tema === "Gelap";
  const isIndonesia = bahasa === "Indonesia";

  // State untuk data
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // Text content berdasarkan bahasa
  const textContent = {
    // Header
    movieCategories: isIndonesia ? "Kategori Film" : "Movie Categories",
    discoverMovies: isIndonesia ? "Temukan film berdasarkan genre" : "Discover movies by genre",
    
    // Categories
    selectCategory: isIndonesia ? "Pilih Kategori" : "Select Category",
    allMovies: isIndonesia ? "Semua Film" : "All Movies",
    
    // Movies
    showingMovies: isIndonesia ? "Menampilkan" : "Showing",
    movies: isIndonesia ? "film" : "movies",
    page: isIndonesia ? "Halaman" : "Page",
    of: isIndonesia ? "dari" : "of",
    
    // Loading & Errors
    loadingMoreMovies: isIndonesia ? "Memuat Film Lainnya..." : "Loading More Movies...",
    loadMoreMovies: isIndonesia ? "Muat Lebih Banyak Film" : "Load More Movies",
    noMoviesFound: isIndonesia ? "Tidak ada film ditemukan" : "No movies found",
    tryDifferentCategory: isIndonesia ? "Coba pilih kategori yang berbeda." : "Try selecting a different category.",
    
    // Error Messages
    failedToFetchCategories: isIndonesia ? "Gagal mengambil data kategori" : "Failed to fetch categories",
    failedToFetchMovies: isIndonesia ? "Gagal mengambil data film" : "Failed to fetch movies",
    failedToFetchPopular: isIndonesia ? "Gagal mengambil data film populer" : "Failed to fetch popular movies",
    
    // Badges
    movieBadge: isIndonesia ? "Film" : "Movie",
    rating: isIndonesia ? "rating" : "rating",
    year: isIndonesia ? "Tahun" : "Year",
    na: isIndonesia ? "T/A" : "N/A"
  };

  // Fetch categories dengan bahasa
  const fetchCategories = async () => {
    try {
      const language = isIndonesia ? "id" : "en";
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=${language}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_KEY_TMDB}`,
          },
        }
      );
      
      if (!response.ok) throw new Error(textContent.failedToFetchCategories);
      const data = await response.json();
      setCategories(data.genres);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.message);
    }
  };

  // Fetch movies by category dengan bahasa
  const fetchMoviesByCategory = async (genreId, page = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      
      const language = isIndonesia ? "id" : "en-US";
      const url = new URL('https://api.themoviedb.org/3/discover/movie');
      url.searchParams.append('with_genres', genreId);
      url.searchParams.append('page', page);
      url.searchParams.append('sort_by', 'popularity.desc');
      url.searchParams.append('language', language);
      url.searchParams.append('include_adult', 'false');
      url.searchParams.append('include_video', 'false');
      
      const response = await fetch(url, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_KEY_TMDB}`,
        },
      });
      
      if (!response.ok) throw new Error(textContent.failedToFetchMovies);
      const data = await response.json();
      
      if (isLoadMore) {
        setItems(prev => [...prev, ...(data.results || [])]);
      } else {
        setItems(data.results || []);
      }
      
      setTotalPages(data.total_pages || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError(err.message);
    } finally {
      if (isLoadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  // Fetch popular movies (default) dengan bahasa
  const fetchPopularMovies = async (page = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      
      const language = isIndonesia ? "id" : "en-US";
      const url = new URL('https://api.themoviedb.org/3/movie/popular');
      url.searchParams.append('page', page);
      url.searchParams.append('language', language);
      
      const response = await fetch(url, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_KEY_TMDB}`,
        },
      });
      
      if (!response.ok) throw new Error(textContent.failedToFetchPopular);
      const data = await response.json();
      
      if (isLoadMore) {
        setItems(prev => [...prev, ...(data.results || [])]);
      } else {
        setItems(data.results || []);
      }
      
      setTotalPages(data.total_pages || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching popular movies:", err);
      setError(err.message);
    } finally {
      if (isLoadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    fetchMoviesByCategory(category.id, 1, false);
  };

  // Load more movies
  const loadMoreMovies = () => {
    const nextPage = currentPage + 1;
    
    if (selectedCategory) {
      fetchMoviesByCategory(selectedCategory.id, nextPage, true);
    } else {
      fetchPopularMovies(nextPage, true);
    }
  };


    // Handler untuk klik item
  const onItemClick = (item) => {
    navigate(`/detail/${item.id}`);
  };

  // Reset to all movies
  const handleAllMovies = () => {
    setSelectedCategory(null);
    setCurrentPage(1);
    fetchPopularMovies(1, false);
  };

  // Get item title
  const getItemTitle = (item) => {
    return isIndonesia ? (item.title || item.original_title) : (item.original_title || item.title);
  };

  // Get item date
  const getItemDate = (item) => {
    return item.release_date;
  };

  // Get showing text
  const getShowingText = () => {
    if (currentPage === 1) {
      return `${textContent.showingMovies} ${items.length} ${textContent.movies}`;
    }
    return `${textContent.showingMovies} ${items.length} ${textContent.movies} - ${textContent.page} ${currentPage} ${textContent.of} ${totalPages}`;
  };

  useEffect(() => {
    fetchCategories();
    fetchPopularMovies(1, false);
  }, []);

  // Refresh data ketika bahasa berubah
  useEffect(() => {
    if (categories.length > 0) {
      if (selectedCategory) {
        fetchMoviesByCategory(selectedCategory.id, 1, false);
      } else {
        fetchPopularMovies(1, false);
      }
      fetchCategories();
    }
  }, [isIndonesia]);

  // Props yang akan dikirim ke presentational component
  const categoryProps = {
    isDark,
    categories,
    selectedCategory,
    items,
    loading,
    error,
    currentPage,
    totalPages,
    loadingMore,
    onCategorySelect: handleCategorySelect,
    onLoadMore: loadMoreMovies,
    onAllItems: handleAllMovies,
    getItemTitle,
    getItemDate,
    textContent,
    getShowingText,
    onItemClick
    

  };

  if (error) {
    return (
      <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#1A1A1A]" : "bg-white"} flex items-center justify-center`}>
        <div className={`alert alert-error max-w-md shadow-xl border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className={isDark ? "text-white" : "text-black"}>Error: {error}</span>
        </div>
      </div>
    );
  }

  return <CategoryView {...categoryProps} />;
};

export default Category;