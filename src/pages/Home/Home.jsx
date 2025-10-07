import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeView from "./HomeView";

const Home = () => {
  // State management
  const [listMovieAxios, setListMovieAxios] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [listTv, setListTv] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  
  // Loading states
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingTv, setLoadingTv] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [loadingNowPlaying, setLoadingNowPlaying] = useState(true);
  const [loadingTrailers, setLoadingTrailers] = useState(true);

  // Fetch trending movies
  const ambilTrending = async () => {
    try {
      setLoadingTrending(true);
      const responseTrending = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/week",
        {
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + import.meta.env.VITE_KEY_TMDB,
          },
        }
      );
      setTrendingMovies(responseTrending.data.results);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    } finally {
      setLoadingTrending(false);
    }
  };

  // Fetch TV series
  const ambilTv = async () => {
    try {
      setLoadingTv(true);
      const responseTv = await axios.get(
        "https://api.themoviedb.org/3/discover/tv",
        {
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + import.meta.env.VITE_KEY_TMDB,
          },
        }
      );
      setListTv(responseTv.data.results);
    } catch (error) {
      console.error("Error fetching TV series:", error);
    } finally {
      setLoadingTv(false);
    }
  };

  // Fetch now playing movies
  const ambilNowPlaying = async () => {
    try {
      setLoadingNowPlaying(true);
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing",
        {
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + import.meta.env.VITE_KEY_TMDB,
          },
        }
      );
      setNowPlayingMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    } finally {
      setLoadingNowPlaying(false);
    }
  };

  // Fetch movies and trailers
  const ambilMovieAxios = async () => {
    try {
      setLoadingMovies(true);
      setLoadingTrailers(true);
      
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + import.meta.env.VITE_KEY_TMDB,
          },
        }
      );

      setListMovieAxios(response.data.results);

      // Get trailers for random movies
      const randomMovies = response.data.results
        .sort(() => 0.5 - Math.random())
        .slice(0, 15);

      const trailersData = await Promise.all(
        randomMovies.map(async (movie) => {
          try {
            const res = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
              {
                headers: {
                  accept: "application/json",
                  Authorization: "Bearer " + import.meta.env.VITE_KEY_TMDB,
                },
              }
            );

            const trailer = res.data.results.find(
              (vid) => vid.type === "Trailer" && vid.site === "YouTube"
            );
            return trailer
              ? { ...movie, trailerKey: trailer.key }
              : { ...movie, trailerKey: null };
          } catch (error) {
            console.error(`Error fetching trailer for movie ${movie.id}:`, error);
            return { ...movie, trailerKey: null };
          }
        })
      );

      setTrailers(trailersData.filter((t) => t.trailerKey !== null));
    } catch (error) {
      console.error("Gagal fetch data axios:", error);
    } finally {
      setLoadingMovies(false);
      setLoadingTrailers(false);
    }
  };

  // Initial data fetching
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        ambilMovieAxios(),
        ambilTv(),
        ambilTrending(),
        ambilNowPlaying()
      ]);
    };

    fetchData();
  }, []);

  // Props untuk HomeView
  const viewProps = {
    // Data
    listMovieAxios,
    trailers,
    listTv,
    trendingMovies,
    nowPlayingMovies,
    
    // Loading states
    loadingMovies,
    loadingTv,
    loadingTrending,
    loadingNowPlaying,
    loadingTrailers
  };

  return <HomeView {...viewProps} />;
};

export default Home;