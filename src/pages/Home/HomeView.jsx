import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

// Reusable Components
const MovieSkeleton = ({ isDark }) => (
  <div className={`flex-shrink-0 w-[280px] p-4 rounded-xl shadow-lg ${
    isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
  }`}>
    <div className={`relative mb-4 rounded-lg overflow-hidden ${
      isDark ? "bg-gray-700" : "bg-gray-300"
    }`}>
      <div className="w-full h-[320px] animate-pulse"></div>
      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full ${
        isDark ? "bg-gray-600" : "bg-gray-400"
      }`}>
        <div className="w-8 h-4 animate-pulse"></div>
      </div>
    </div>
    <div className="space-y-3">
      <div className={`h-6 rounded ${
        isDark ? "bg-gray-700" : "bg-gray-300"
      } animate-pulse`}></div>
      <div className={`h-4 w-24 rounded ${
        isDark ? "bg-gray-700" : "bg-gray-300"
      } animate-pulse`}></div>
      <div className="space-y-2">
        <div className={`h-3 rounded ${
          isDark ? "bg-gray-700" : "bg-gray-300"
        } animate-pulse`}></div>
        <div className={`h-3 w-4/5 rounded ${
          isDark ? "bg-gray-700" : "bg-gray-300"
        } animate-pulse`}></div>
        <div className={`h-3 w-3/5 rounded ${
          isDark ? "bg-gray-700" : "bg-gray-300"
        } animate-pulse`}></div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-gray-600">
        <div className={`h-6 w-12 rounded ${
          isDark ? "bg-gray-700" : "bg-gray-300"
        } animate-pulse`}></div>
        <div className={`h-4 w-16 rounded ${
          isDark ? "bg-gray-700" : "bg-gray-300"
        } animate-pulse`}></div>
      </div>
    </div>
  </div>
);

const SectionHeaderSkeleton = ({ isDark }) => (
  <div className="flex items-center justify-between mb-5">
    <div className={`h-8 w-48 rounded ${
      isDark ? "bg-gray-700" : "bg-gray-300"
    } animate-pulse`}></div>
    <div className="flex gap-2">
      <div className={`h-10 w-10 rounded-full ${
        isDark ? "bg-gray-700" : "bg-gray-300"
      } animate-pulse`}></div>
      <div className={`h-10 w-10 rounded-full ${
        isDark ? "bg-gray-700" : "bg-gray-300"
      } animate-pulse`}></div>
    </div>
  </div>
);

const MovieCard = ({ 
  item, 
  isTvSeries = false, 
  isDark, 
  onItemClick,
  textContent 
}) => (
  <div
    onClick={() => onItemClick(item.id, isTvSeries)}
    className={`flex-shrink-0 w-[280px] p-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:z-10 cursor-pointer ${
      isDark 
        ? "bg-gray-800 hover:bg-gray-700 border border-gray-700" 
        : "bg-white hover:bg-gray-50 border border-gray-200"
    }`}
  >
    <div className="relative mb-4">
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={isTvSeries ? item.name || item.original_name : item.original_title}
        className="w-full h-[320px] object-cover rounded-lg mb-3"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/500x750/1a1a1a/ffffff?text=No+Image';
        }}
      />
      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${
        isDark ? "bg-black/80 text-white" : "bg-white/90 text-gray-800"
      }`}>
        <div className="flex items-center gap-1">
          <Icon icon="ion:star" className="text-yellow-400 text-xs" />
          {item.vote_average?.toFixed(1) || "N/A"}
        </div>
      </div>
    </div>

    <div className="space-y-3">
      <h3 className={`font-bold text-lg line-clamp-2 leading-tight ${
        isDark ? "text-white" : "text-black"
      }`}>
        {isTvSeries ? item.original_name : item.original_title}
      </h3>
      
      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        {isTvSeries ? item.first_air_date || textContent.comingSoon : item.release_date || textContent.comingSoon}
      </p>
      
      <div className="mt-2">
        <p className={`text-xs leading-relaxed line-clamp-3 ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}>
          {item.overview ? (item.overview.length > 120 ? item.overview.substr(0, 120) + "..." : item.overview) : textContent.noDescription}
        </p>
      </div>
      
      <div className="flex items-center justify-between pt-2 border-t border-gray-600">
        <span className={`text-xs px-2 py-1 rounded ${
          isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
        }`}>
          {isTvSeries ? textContent.tvSeriesBadge : item.original_language?.toUpperCase() || "EN"}
        </span>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Icon icon="ion:eye" className="text-xs" />
          <span>{item.vote_count || 0} {textContent.views}</span>
        </div>
      </div>
    </div>
  </div>
);

const HorizontalScrollSection = ({ 
  title, 
  data, 
  loading, 
  containerRef, 
  canScrollLeft, 
  canScrollRight, 
  onScrollLeft, 
  onScrollRight,
  isTvSeries = false,
  showFilter = false,
  movieFilter,
  onFilterChange,
  isDark,
  textContent,
  onItemClick,
  onScroll // Tambahkan prop onScroll
}) => (
  <div className="mt-16">
    {loading ? (
      <>
        <SectionHeaderSkeleton isDark={isDark} />
        <div className="relative group">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {[...Array(8)].map((_, index) => (
              <MovieSkeleton key={index} isDark={isDark} />
            ))}
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <h2 className={`text-xl lg:text-2xl poppins-semibold ${isDark ? "text-white" : "text-gray-600"}`}>
              {title}
            </h2>
            
            {showFilter && (
              <div className={`flex gap-2 p-1 rounded-lg ${
                isDark ? "bg-gray-700" : "bg-gray-200"
              }`}>
                <button
                  onClick={() => onFilterChange("newest")}
                  className={`px-3 py-1 text-sm rounded-md transition-all ${
                    movieFilter === "newest" 
                      ? isDark ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
                      : isDark ? "text-gray-300 hover:bg-gray-600" : "text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  {textContent.newest}
                </button>
                <button
                  onClick={() => onFilterChange("oldest")}
                  className={`px-3 py-1 text-sm rounded-md transition-all ${
                    movieFilter === "oldest" 
                      ? isDark ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
                      : isDark ? "text-gray-300 hover:bg-gray-600" : "text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  {textContent.oldest}
                </button>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={onScrollLeft}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full transition-all duration-300 ${
                canScrollLeft
                  ? `${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} cursor-pointer`
                  : "bg-gray-400 opacity-50 cursor-not-allowed"
              }`}
            >
              <Icon 
                icon="ion:chevron-back" 
                className={`text-2xl ${isDark ? "text-white" : "text-black"}`} 
              />
            </button>
            <button
              onClick={onScrollRight}
              disabled={!canScrollRight}
              className={`p-2 rounded-full transition-all duration-300 ${
                canScrollRight
                  ? `${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} cursor-pointer`
                  : "bg-gray-400 opacity-50 cursor-not-allowed"
              }`}
            >
              <Icon 
                icon="ion:chevron-forward" 
                className={`text-2xl ${isDark ? "text-white" : "text-black"}`} 
              />
            </button>
          </div>
        </div>

        <div className="relative group">
          <div
            ref={containerRef}
            onScroll={onScroll} // Tambahkan event handler onScroll
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {data.length > 0 ? (
              data.map((item) => (
                <MovieCard 
                  key={item.id} 
                  item={item} 
                  isTvSeries={isTvSeries}
                  isDark={isDark}
                  onItemClick={onItemClick}
                  textContent={textContent}
                />
              ))
            ) : (
              <div className="w-full flex justify-center items-center py-10">
                <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {textContent.noDataAvailable}
                </p>
              </div>
            )}
          </div>
        </div>
      </>
    )}
  </div>
);

const TrailerSection = ({ 
  trailers, 
  currentIndex, 
  isDark, 
  textContent, 
  onTrailerDetailClick,
  isMuted, // Tambahkan prop isMuted
  onToggleMute // Tambahkan prop onToggleMute
}) => {
  if (!trailers || trailers.length === 0) return null;

  return (
    <section className="relative overflow-hidden">
      <div className="relative w-full h-screen bg-center bg-no-repeat">
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            key={trailers[currentIndex].id}
            width="1920"
            height="1080"
            src={`https://www.youtube.com/embed/${trailers[currentIndex].trailerKey}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${trailers[currentIndex].trailerKey}`}
            title={trailers[currentIndex].original_title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full scale-[4.95] md:scale-[1.95] origin-center"
          ></iframe>
        </div>

        {/* Overlay untuk gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>

        <div className="absolute inset-y-0 left-0 flex flex-col justify-center items-start p-10 space-y-4 z-20 mb-28 p-auto">
          <h1 className="text-white text-5xl font-bold poppins-bold text-left">
            {trailers[currentIndex].original_title}
          </h1>
          <p className="text-white text-sm max-w-lg text-left poppins-thin">
            {trailers[currentIndex].release_date || textContent.comingSoon} |{" "}
            <span className="bg-violet-600 p-1 px-2 rounded-[20px]">
              {trailers[currentIndex].vote_average || "N/A"} {textContent.rating}
            </span>{" "}
            | {trailers[currentIndex].overview?.substring(0, 150) + "..." || textContent.noDescription}
          </p>
          <div className="flex space-x-3">
            <button className="flex items-center px-5 py-[10px] bg-white text-black text-sm rounded-[20px] transition duration-300 ease-in-out hover:bg-gray-300 poppins-regular">
              {textContent.watchNow}
              <Icon icon="ion:play" className="ml-1 text-[20px]" />
            </button>
            <button 
              onClick={onTrailerDetailClick}
              className="flex items-center px-5 py-[10px] backdrop-blur-xl bg-gray-500/20 text-white text-sm rounded-[20px] transition duration-300 ease-in-out poppins-regular hover:bg-gray-500/40"
            >
              {textContent.detail}
              <Icon
                icon="solar:map-arrow-right-line-duotone"
                className="ml-2 text-[20px]"
              />
            </button>
            {/* Tombol Sound Control */}
            <button 
              onClick={onToggleMute}
              className="flex items-center px-5 py-[10px] backdrop-blur-xl bg-gray-500/20 text-white text-sm rounded-[20px] transition duration-300 ease-in-out poppins-regular hover:bg-gray-500/40"
              title={isMuted ? textContent.unmute : textContent.mute}
            >
              {isMuted ? (
                <Icon icon="ion:volume-mute" className="text-[20px]" />
              ) : (
                <Icon icon="ion:volume-high" className="text-[20px]" />
              )}
              <span className="ml-2">
                {isMuted ? textContent.unmute : textContent.mute}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Component
const HomeView = ({
  listMovieAxios = [],
  trailers = [],
  listTv = [],
  trendingMovies = [],
  nowPlayingMovies = [],
  loadingMovies = true,
  loadingTv = true,
  loadingTrending = true,
  loadingNowPlaying = true,
  loadingTrailers = true
}) => {
  // Hooks
  const tema = useSelector((state) => state.temaTotal);
  const bahasa = useSelector((state) => state.bahasaTotal);
  const navigate = useNavigate();
  
  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movieFilter, setMovieFilter] = useState("newest");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isMuted, setIsMuted] = useState(true); // State untuk mute/unmute
  
  // Refs
  const scrollContainerRef = useRef(null);
  const scrollContainerTvRef = useRef(null);
  const scrollContainerTrendingRef = useRef(null);
  const scrollContainerNowPlayingRef = useRef(null);
  
  // Scroll states
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeftTv, setCanScrollLeftTv] = useState(false);
  const [canScrollRightTv, setCanScrollRightTv] = useState(true);
  const [canScrollLeftTrending, setCanScrollLeftTrending] = useState(false);
  const [canScrollRightTrending, setCanScrollRightTrending] = useState(true);
  const [canScrollLeftNowPlaying, setCanScrollLeftNowPlaying] = useState(false);
  const [canScrollRightNowPlaying, setCanScrollRightNowPlaying] = useState(true);

  // Constants
  const isDark = tema === "Gelap";

  const isIndonesia = bahasa === "Indonesia";

  // Text content - tambahkan text untuk sound control
  const textContent = {
    popularMovies: isIndonesia ? "🎬 Film Populer" : "🎬 Popular Movies",
    tvSeries: isIndonesia ? "📺 Serial TV" : "📺 TV Series",
    trending: isIndonesia ? "🔥 Trend Minggu Ini" : "🔥 Trending This Week",
    nowPlaying: isIndonesia ? "🎭 Sedang Tayang" : "🎭 Now Playing in Theaters",
    newest: isIndonesia ? "Terbaru" : "Newest",
    oldest: isIndonesia ? "Terlama" : "Oldest",
    noDescription: isIndonesia ? "Tidak ada deskripsi" : "No description available",
    comingSoon: isIndonesia ? "Segera Hadir" : "Coming Soon",
    tvSeriesBadge: isIndonesia ? "Serial TV" : "TV Series",
    loadingMovies: isIndonesia ? "Memuat film..." : "Loading movies...",
    loadingTvSeries: isIndonesia ? "Memuat serial TV..." : "Loading TV series...",
    loadingTrending: isIndonesia ? "Memuat film trend..." : "Loading trending movies...",
    loadingNowPlaying: isIndonesia ? "Memuat film yang sedang tayang..." : "Loading now playing movies...",
    noDataAvailable: isIndonesia ? "Tidak ada data" : "No data available",
    watchNow: isIndonesia ? "Tonton Sekarang" : "Watch Now",
    detail: isIndonesia ? "Detail" : "Detail",
    rating: isIndonesia ? "Rating" : "Rating",
    episodes: isIndonesia ? "Episode" : "Episodes",
    views: isIndonesia ? "dilihat" : "views",
    mute: isIndonesia ? "Suara" : "Sound", // Text untuk unmute state
    unmute: isIndonesia ? "Mute" : "Mute"  // Text untuk mute state
  };

  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (trailers.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % trailers.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [trailers]);

  useEffect(() => {
    if (listMovieAxios.length > 0) {
      const sortedMovies = [...listMovieAxios].sort((a, b) => {
        const dateA = new Date(a.release_date || "1970-01-01");
        const dateB = new Date(b.release_date || "1970-01-01");
        return movieFilter === "newest" ? dateB - dateA : dateA - dateB;
      });
      setFilteredMovies(sortedMovies);
    }
  }, [listMovieAxios, movieFilter]);

  // Scroll handler functions dengan useCallback untuk optimasi
  const checkScrollPosition = useCallback((containerRef, setLeft, setRight) => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setLeft(scrollLeft > 0);
      setRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  // Buat handler scroll untuk setiap section
  const handlePopularMoviesScroll = useCallback(() => {
    checkScrollPosition(scrollContainerRef, setCanScrollLeft, setCanScrollRight);
  }, [checkScrollPosition]);

  const handleTvSeriesScroll = useCallback(() => {
    checkScrollPosition(scrollContainerTvRef, setCanScrollLeftTv, setCanScrollRightTv);
  }, [checkScrollPosition]);

  const handleTrendingScroll = useCallback(() => {
    checkScrollPosition(scrollContainerTrendingRef, setCanScrollLeftTrending, setCanScrollRightTrending);
  }, [checkScrollPosition]);

  const handleNowPlayingScroll = useCallback(() => {
    checkScrollPosition(scrollContainerNowPlayingRef, setCanScrollLeftNowPlaying, setCanScrollRightNowPlaying);
  }, [checkScrollPosition]);

  // Handler untuk toggle mute/unmute
  const handleToggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const scroll = (containerRef, direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Check scroll position setelah scroll selesai
      setTimeout(() => {
        if (containerRef === scrollContainerRef) {
          handlePopularMoviesScroll();
        } else if (containerRef === scrollContainerTvRef) {
          handleTvSeriesScroll();
        } else if (containerRef === scrollContainerTrendingRef) {
          handleTrendingScroll();
        } else if (containerRef === scrollContainerNowPlayingRef) {
          handleNowPlayingScroll();
        }
      }, 300);
    }
  };

  const handleItemClick = (id, isTvSeries = false) => {
    window.scrollTo(0, 0);
    navigate(isTvSeries ? `/series/${id}` : `/detail/${id}`);
  };

  const handleTrailerDetailClick = () => {
    if (trailers[currentIndex]) {
      window.scrollTo(0, 0);
      navigate(`/detail/${trailers[currentIndex].id}`);
    }
  };

  const handleFilterChange = (filter) => {
    setMovieFilter(filter);
    window.scrollTo(0, 0);
  };

  // Initial scroll position checks ketika data berubah
  useEffect(() => {
    handlePopularMoviesScroll();
  }, [filteredMovies, handlePopularMoviesScroll]);

  useEffect(() => {
    handleTvSeriesScroll();
  }, [listTv, handleTvSeriesScroll]);

  useEffect(() => {
    handleTrendingScroll();
  }, [trendingMovies, handleTrendingScroll]);

  useEffect(() => {
    handleNowPlayingScroll();
  }, [nowPlayingMovies, handleNowPlayingScroll]);

  return (
    <div className="min-h-screen">
      {/* Trailer Section */}
      <TrailerSection
        trailers={trailers}
        currentIndex={currentIndex}
        isDark={isDark}
        textContent={textContent}
        onTrailerDetailClick={handleTrailerDetailClick}
        isMuted={isMuted} // Pass state isMuted
        onToggleMute={handleToggleMute} // Pass handler untuk toggle mute
      />

      {/* Main Content */}
      <main className={`transition-colors duration-500 ${isDark ? "bg-[#1A1A1A]" : "bg-white"} p-10`}>
        <div className="container mx-auto my-10 relative -mt-72 z-30">
          
          {/* Popular Movies */}
          <HorizontalScrollSection
            title={textContent.popularMovies}
            data={filteredMovies}
            loading={loadingMovies}
            containerRef={scrollContainerRef}
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
            onScrollLeft={() => scroll(scrollContainerRef, 'left')}
            onScrollRight={() => scroll(scrollContainerRef, 'right')}
            onScroll={handlePopularMoviesScroll} // Tambahkan onScroll handler
            showFilter={true}
            movieFilter={movieFilter}
            onFilterChange={handleFilterChange}
            isDark={isDark}
            textContent={textContent}
            onItemClick={handleItemClick}
          />

          {/* TV Series */}
          <HorizontalScrollSection
            title={textContent.tvSeries}
            data={listTv}
            loading={loadingTv}
            containerRef={scrollContainerTvRef}
            canScrollLeft={canScrollLeftTv}
            canScrollRight={canScrollRightTv}
            onScrollLeft={() => scroll(scrollContainerTvRef, 'left')}
            onScrollRight={() => scroll(scrollContainerTvRef, 'right')}
            onScroll={handleTvSeriesScroll} // Tambahkan onScroll handler
            isTvSeries={true}
            isDark={isDark}
            textContent={textContent}
            onItemClick={handleItemClick}
          />

          {/* Trending Movies */}
          <HorizontalScrollSection
            title={textContent.trending}
            data={trendingMovies}
            loading={loadingTrending}
            containerRef={scrollContainerTrendingRef}
            canScrollLeft={canScrollLeftTrending}
            canScrollRight={canScrollRightTrending}
            onScrollLeft={() => scroll(scrollContainerTrendingRef, 'left')}
            onScrollRight={() => scroll(scrollContainerTrendingRef, 'right')}
            onScroll={handleTrendingScroll} // Tambahkan onScroll handler
            isDark={isDark}
            textContent={textContent}
            onItemClick={handleItemClick}
          />

          {/* Now Playing Movies */}
          <HorizontalScrollSection
            title={textContent.nowPlaying}
            data={nowPlayingMovies}
            loading={loadingNowPlaying}
            containerRef={scrollContainerNowPlayingRef}
            canScrollLeft={canScrollLeftNowPlaying}
            canScrollRight={canScrollRightNowPlaying}
            onScrollLeft={() => scroll(scrollContainerNowPlayingRef, 'left')}
            onScrollRight={() => scroll(scrollContainerNowPlayingRef, 'right')}
            onScroll={handleNowPlayingScroll} // Tambahkan onScroll handler
            isDark={isDark}
            textContent={textContent}
            onItemClick={handleItemClick}
          />

        </div>
      </main>

      {/* CSS untuk hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default HomeView;