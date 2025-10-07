import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SearchView from './SearchView';

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const searchInputRef = useRef(null);
    
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isInputExpanded, setIsInputExpanded] = useState(false);

    // Ambil tema dan bahasa dari Redux store
    const tema = useSelector((state) => state.temaTotal);
    const bahasa = useSelector((state) => state.bahasaTotal);
    const isDark = tema === "Gelap";
    const isIndonesia = bahasa === "Indonesia";

    const API_KEY = '5bd4c46946b10f62dc73b9f831937c9a';
    const BASE_URL = 'https://api.themoviedb.org/3';

    // Auto focus dan expand input saat pertama kali load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInputExpanded(true);
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    // Load popular movies saat pertama kali buka
    useEffect(() => {
        if (!query) {
            loadPopularMovies();
        }
    }, [isIndonesia]);

    // Handle search ketika searchParams berubah
    useEffect(() => {
        const searchQuery = searchParams.get('q');
        
        if (searchQuery) {
            setQuery(searchQuery);
            performSearch(searchQuery);
        } else {
            loadPopularMovies();
        }
    }, [searchParams, isIndonesia]);

    // Auto search ketika query berubah (dengan debounce)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim()) {
                setSearchParams({ 
                    q: query.trim()
                });
            } else if (query === '') {
                setSearchParams({});
                loadPopularMovies();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    // Discover Movie API - Untuk film populer
    const loadPopularMovies = async () => {
        setLoading(true);
        setError('');

        try {
            const languageCode = isIndonesia ? 'id-ID' : 'en-US';
            const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${languageCode}&sort_by=popularity.desc&page=1&include_adult=false`;
            
            const response = await axios.get(url);

            if (response.data && response.data.results) {
                setResults(response.data.results.slice(0, 12));
            } else {
                setResults([]);
            }
        } catch (err) {
            console.error('API Error:', err);
            setError(getContent().errorPopular);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    // GANTI: Search Movie API - Untuk pencarian film (bukan koleksi)
    const performSearch = async (searchQuery) => {
        if (!searchQuery.trim()) {
            loadPopularMovies();
            return;
        }

        setLoading(true);
        setError('');

        try {
            const languageCode = isIndonesia ? 'id-ID' : 'en-US';
            const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&language=${languageCode}&include_adult=false`;
            
            const response = await axios.get(url);

            if (response.data && response.data.results) {
                setResults(response.data.results);
            } else {
                setResults([]);
            }
        } catch (err) {
            console.error('API Error:', err);
            setError(getContent().errorSearch);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (query.trim()) {
                setSearchParams({ 
                    q: query.trim()
                });
            } else {
                setSearchParams({});
                loadPopularMovies();
            }
        }
    };

    const clearSearch = () => {
        setQuery('');
        setSearchParams({});
        setResults([]);
        setError('');
        loadPopularMovies();
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return getContent().notAvailable;
        try {
            const locale = isIndonesia ? 'id-ID' : 'en-US';
            return new Date(dateString).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return getContent().invalidDate;
        }
    };

    const navigateToDetail = (item) => {
        navigate(`/detail/${item.id}`);
    };

    // Update text content untuk search movie
    const getContent = () => {
        return {
            title: isIndonesia ? 'Cari Film' : 'Search Movies',
            searchResults: isIndonesia ? 'Hasil Pencarian' : 'Search Results',
            placeholderText: isIndonesia ? 'Apa yang anda pikirkan?' : 'What are you thinking?',
            searchPlaceholder: isIndonesia 
                ? 'Cari film... (contoh: Avengers, Spider-Man, Batman)' 
                : 'Search movies... (example: Avengers, Spider-Man, Batman)',
            searchDescription: isIndonesia 
                ? 'Ketik untuk mencari film...' 
                : 'Type to search movies...',
            foundCollections: isIndonesia ? 'Menemukan film untuk' : 'Found movies for',
            collections: isIndonesia ? 'Film' : 'Movies',
            popularMovies: isIndonesia ? 'Film Populer' : 'Popular Movies',
            trending: isIndonesia ? 'Sedang trending' : 'Trending now',
            results: isIndonesia ? 'hasil' : 'results',
            movies: isIndonesia ? 'film' : 'movies',
            for: isIndonesia ? 'Untuk' : 'For',
            collection: isIndonesia ? 'Film' : 'Movie',
            noDescription: isIndonesia ? 'Tidak ada deskripsi tersedia.' : 'No description available.',
            clickForDetails: isIndonesia ? 'Klik untuk melihat detail.' : 'Click to view details.',
            noResults: isIndonesia ? 'Tidak ada hasil ditemukan' : 'No results found',
            noCollections: isIndonesia ? 'Tidak ada film yang cocok dengan' : 'No movies found for',
            viewPopular: isIndonesia ? 'Lihat Film Populer' : 'View Popular Movies',
            loadingCollections: isIndonesia ? 'Mencari film...' : 'Searching movies...',
            loadingPopular: isIndonesia ? 'Memuat film populer...' : 'Loading popular movies...',
            errorPopular: isIndonesia 
                ? 'Terjadi kesalahan saat memuat film populer.' 
                : 'Failed to load popular movies.',
            errorSearch: isIndonesia 
                ? 'Terjadi kesalahan saat mencari film.' 
                : 'Failed to search movies.',
            rating: isIndonesia ? 'Rating' : 'Rating',
            releaseDate: isIndonesia ? 'Tanggal Rilis' : 'Release Date',
            notAvailable: isIndonesia ? 'Tidak tersedia' : 'Not available',
            invalidDate: isIndonesia ? 'Tanggal tidak valid' : 'Invalid date'
        };
    };

    const currentQuery = searchParams.get('q') || '';

    return (
        <SearchView
            query={query}
            results={results}
            loading={loading}
            error={error}
            isInputExpanded={isInputExpanded}
            currentQuery={currentQuery}
            isDark={isDark}
            
            onQueryChange={setQuery}
            onSearch={handleSearch}
            onKeyPress={handleKeyPress}
            onClearSearch={clearSearch}
            onNavigateToDetail={navigateToDetail}
            
            content={getContent()}
            
            searchInputRef={searchInputRef}
            formatDate={formatDate}
        />
    );
};

export default Search;