import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Clock, Calendar, DollarSign, Play, Bookmark, Share2, Heart, TrendingUp, Globe, Tv, ChevronLeft, ChevronRight } from "lucide-react";

// Reusable Components
const LoadingState = ({ isDark, textContent }) => (
  <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#1A1A1A]" : "bg-white"} flex items-center justify-center`}>
    <div className="text-center">
      <span className={`loading loading-spinner loading-lg ${isDark ? "text-white" : "text-black"}`}></span>
      <p className={`mt-4 text-2xl font-bold ${isDark ? "text-white" : "text-black"}`}>
        {textContent.loadingSeries}
      </p>
    </div>
  </div>
);

const ErrorState = ({ isDark, textContent, error }) => (
  <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#1A1A1A]" : "bg-white"} flex items-center justify-center`}>
    <div className={`alert alert-error max-w-md shadow-xl border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className={isDark ? "text-white" : "text-black"}>
        {textContent.error}: {error}
      </span>
    </div>
  </div>
);

const HeroSection = ({ series, isDark }) => (
  <div className="w-full h-[400px] md:h-[580px] relative">
    <div className="w-full h-full">
      <img
        src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
        className="h-full w-full object-cover"
        alt="Backdrop"
      />
    </div>
    <div className={`absolute w-full h-full top-0 bg-gradient-to-r ${isDark ? "from-[#1A1A1A]" : "from-white"} to-transparent`}></div>
    <div className={`absolute w-full h-full top-0 bg-gradient-to-t ${isDark ? "from-[#1A1A1A]" : "from-white"} to-transparent`}></div>
  </div>
);

const PosterSection = ({ series, isDark, textContent }) => {
  const navigate = useNavigate();

  const handlePlayNow = () => {
    // Add play functionality here
    console.log("Play series:", series.id);
  };

  return (
    <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-40 lg:min-w-60">
      <img
        src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
        className="h-60 w-40 md:h-80 md:w-60 object-cover rounded-lg shadow-2xl"
        alt="Poster"
      />
      <button 
        onClick={handlePlayNow}
        className={`mt-3 w-full py-2 px-4 text-center text-base md:text-lg rounded-lg shadow-[0_0_10px_#1a1a1a] transition duration-300 ease-in-out hover:shadow-[0_0_20px_#1a1a1a,0_0_30px_#1a1a1a] font-medium flex items-center justify-center ${
          isDark 
            ? "bg-white text-black hover:bg-gray-300" 
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        <Play size={20} fill="currentColor" className="mr-2" />
        {textContent.playNow}
      </button>
    </div>
  );
};

const SeriesInfoSection = ({ 
  series, 
  isDark, 
  textContent, 
  rating, 
  isFavorite, 
  isBookmarked, 
  onRatingChange, 
  onFavoriteToggle, 
  onBookmarkToggle 
}) => (
  <div className={`lg:-mt-20 z-20 px-5 md:px-0 text-center lg:text-left flex-1 ${
    isDark ? "text-white" : "text-black"
  }`}>
    <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-1">
      {series.original_name}
    </h2>
    <p className={`text-xs md:text-sm font-normal ${
      isDark ? "text-gray-400" : "text-neutral-600"
    }`}>
      {series.tagline || series.name}
    </p>

    {/* Stats */}
    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs md:text-sm font-medium justify-center lg:justify-start">
      <p className={`flex py-1 px-3 border-[1px] rounded-[20px] ${
        isDark ? "border-gray-600" : "border-gray-300"
      }`}>
        <Star size={16} className="my-auto mr-1" fill="currentColor" /> {textContent.rating}: {series.vote_average.toFixed(1)}
      </p>
      <p className={`flex py-1 px-3 border-[1px] rounded-[20px] ${
        isDark ? "border-gray-600" : "border-gray-300"
      }`}>
        <TrendingUp size={16} className="my-auto mr-1" />
        {textContent.popularity}: {series.popularity.toFixed(0)}
      </p>
      <p className={`flex py-1 px-3 border-[1px] rounded-[20px] ${
        isDark ? "border-gray-600" : "border-gray-300"
      }`}>
        <Tv size={16} className="my-auto mr-1" />
        {textContent.seasons}: {series.number_of_seasons}
      </p>
    </div>

    <div className={`p-[1px] rounded-full my-3 ${
      isDark ? "bg-gray-600" : "bg-gray-300"
    }`}></div>

    {/* Overview */}
    <div className="text-sm">
      <h3 className="text-lg md:text-xl font-semibold mb-1">
        {textContent.overview}
      </h3>
      <p className={`font-light text-xs md:text-sm ${
        isDark ? "text-gray-400" : "text-neutral-600"
      }`}>
        {series.overview}
      </p>

      {/* Additional Info */}
      <div className="flex flex-wrap items-center gap-3 my-3 text-xs md:text-sm font-medium justify-center lg:justify-start">
        <p>{textContent.status}: {series.status}</p>
        <span className={isDark ? "text-gray-500" : "text-gray-400"}>|</span>
        <p>{textContent.firstAirDate}: {series.first_air_date}</p>
        {series.homepage && (
          <>
            <span className={isDark ? "text-gray-500" : "text-gray-400"}>|</span>
            <a 
              href={series.homepage} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:underline text-blue-500"
            >
              <Globe size={14} className="mr-1" /> {textContent.homepage}
            </a>
          </>
        )}
      </div>

      <div className={`p-[1px] rounded-full my-3 ${
        isDark ? "bg-gray-600" : "bg-gray-300"
      }`}></div>

      {/* Genres */}
      <div className="flex flex-wrap gap-2 mb-3">
        {series.genres.map((genre) => (
          <span key={genre.id} className={`px-3 py-1 border rounded-full text-xs ${
            isDark ? "border-gray-600" : "border-gray-300"
          }`}>
            {genre.name}
          </span>
        ))}
      </div>

      <div className={`p-[1px] rounded-full my-3 ${
        isDark ? "bg-gray-600" : "bg-gray-300"
      }`}></div>

      {/* Spoken Languages */}
      <div className="mb-3">
        <h3 className="text-lg md:text-xl font-semibold mb-2">{textContent.spokenLanguages}</h3>
        <div className="flex flex-wrap gap-2">
          {series.spoken_languages.map((lang, idx) => (
            <span key={idx} className={`px-3 py-1 border rounded-full text-xs ${
              isDark ? "border-gray-600" : "border-gray-300"
            }`}>
              {lang.english_name}
            </span>
          ))}
        </div>
      </div>

      <div className={`p-[1px] rounded-full my-3 ${
        isDark ? "bg-gray-600" : "bg-gray-300"
      }`}></div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-5 justify-center lg:justify-start items-center">
        {/* Rating */}
        <div className="mt-3">
          <h3 className="text-lg md:text-xl font-semibold mb-1">
            {textContent.rateThisSeries}
          </h3>
          <div className="flex items-center">
            <div className="flex gap-1 my-auto">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={24}
                  className={`cursor-pointer ${
                    rating >= star
                      ? "text-yellow-500 fill-yellow-500"
                      : isDark ? "text-gray-500 fill-gray-500" : "text-gray-400 fill-gray-400"
                  }`}
                  onClick={() => onRatingChange(star)}
                />
              ))}
            </div>
            {rating > 0 && (
              <button
                className="ml-3 py-2 px-2 rounded-lg bg-red-600 text-white text-sm md:text-lg"
                onClick={() => onRatingChange(0)}
              >
                {textContent.remove}
              </button>
            )}
          </div>
        </div>

        <div className={`w-px h-12 ${
          isDark ? "bg-gray-600" : "bg-gray-300"
        }`}></div>

        {/* Add to List */}
        <div className="flex justify-between mt-3">
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-1">
              {textContent.addToFavorite}
            </h3>
            <div className="flex gap-2">
              <button
                className={`py-2 px-4 text-sm md:text-lg rounded-lg text-white flex items-center gap-2 ${
                  isFavorite ? "bg-red-600" : isDark ? "bg-gray-700" : "bg-gray-600"
                }`}
                onClick={onFavoriteToggle}
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                {isFavorite ? textContent.favorited : textContent.favorite}
              </button>
              <button
                className={`py-2 px-4 text-sm md:text-lg rounded-lg text-white flex items-center gap-2 ${
                  isBookmarked ? "bg-blue-600" : isDark ? "bg-gray-700" : "bg-gray-600"
                }`}
                onClick={onBookmarkToggle}
              >
                <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
                {isBookmarked ? textContent.bookmarked : textContent.bookmark}
              </button>
              <button
                className={`py-2 px-4 text-sm md:text-lg rounded-lg text-white flex items-center gap-2 ${
                  isDark ? "bg-gray-700" : "bg-gray-600"
                }`}
              >
                <Share2 size={20} />
                {textContent.share}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`p-[0.5px] rounded-full my-3 ${
        isDark ? "bg-gray-600" : "bg-gray-300"
      }`}></div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className={`text-center p-3 border rounded-lg ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}>
          <div className={`text-xs uppercase font-bold mb-1 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            {textContent.episodes}
          </div>
          <p className="text-lg font-bold">{series.number_of_episodes}</p>
        </div>
        <div className={`text-center p-3 border rounded-lg ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}>
          <div className={`text-xs uppercase font-bold mb-1 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            {textContent.seasons}
          </div>
          <p className="text-lg font-bold">{series.number_of_seasons}</p>
        </div>
        <div className={`text-center p-3 border rounded-lg ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}>
          <div className={`text-xs uppercase font-bold mb-1 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            {textContent.language}
          </div>
          <p className="text-lg font-bold uppercase">{series.original_language}</p>
        </div>
      </div>
    </div>
  </div>
);

const CastSection = ({ cast, isDark, textContent }) => (
  <div className="container mx-auto px-5 lg:px-40 py-10">
    <div className="flex items-center justify-between mb-8">
      <h3 className={`text-lg md:text-xl font-bold ${
        isDark ? "text-white" : "text-black"
      }`}>
        {textContent.topCast}
      </h3>
      <button className={`text-sm hover:underline ${
        isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
      }`}>
        {textContent.viewAll} →
      </button>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {cast.map((actor) => (
        <div key={actor.id} className="text-center group cursor-pointer">
          <div className="relative overflow-hidden rounded-lg mb-2">
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                alt={actor.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className={`w-full h-48 flex items-center justify-center rounded-lg ${
                isDark ? "bg-gradient-to-br from-gray-700 to-gray-900" : "bg-gradient-to-br from-gray-100 to-gray-300"
              }`}>
                <span className="text-4xl">👤</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <p className={`text-sm font-medium truncate ${
            isDark ? "text-white" : "text-black"
          }`}>
            {actor.name}
          </p>
          <p className={`text-xs truncate ${
            isDark ? "text-gray-400" : "text-neutral-600"
          }`}>
            {actor.character}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const SeasonsSection = ({ 
  currentSeasons, 
  isDark, 
  textContent, 
  currentSeasonPage, 
  totalSeasonPages, 
  onPrevPage, 
  onNextPage 
}) => (
  <div className="container mx-auto px-5 lg:px-40 py-10">
    <div className="flex items-center justify-between mb-6">
      <h3 className={`text-lg md:text-xl font-bold ${
        isDark ? "text-white" : "text-black"
      }`}>
        {textContent.seasonsSection} ({currentSeasons.length})
      </h3>
      
      {/* Pagination Controls */}
      {totalSeasonPages > 1 && (
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevPage}
            disabled={currentSeasonPage === 1}
            className={`p-2 rounded-full transition-all duration-300 ${
              currentSeasonPage === 1
                ? "bg-gray-400 opacity-50 cursor-not-allowed"
                : `${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} cursor-pointer`
            }`}
          >
            <ChevronLeft size={20} className={isDark ? "text-white" : "text-black"} />
          </button>
          
          <span className={`text-sm mx-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {textContent.page} {currentSeasonPage} {textContent.of} {totalSeasonPages}
          </span>
          
          <button
            onClick={onNextPage}
            disabled={currentSeasonPage === totalSeasonPages}
            className={`p-2 rounded-full transition-all duration-300 ${
              currentSeasonPage === totalSeasonPages
                ? "bg-gray-400 opacity-50 cursor-not-allowed"
                : `${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} cursor-pointer`
            }`}
          >
            <ChevronRight size={20} className={isDark ? "text-white" : "text-black"} />
          </button>
        </div>
      )}
    </div>

    {/* Seasons Grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {currentSeasons.map((season) => (
        <div key={season.id} className={`border rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow ${
          isDark ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-gray-300"
        }`}>
          {season.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
              alt={season.name}
              className="w-full h-64 object-cover"
            />
          ) : (
            <div className={`w-full h-64 flex items-center justify-center ${
              isDark ? "bg-gradient-to-br from-gray-700 to-gray-900" : "bg-gradient-to-br from-gray-100 to-gray-300"
            }`}>
              <Tv size={48} className={isDark ? "text-gray-500" : "text-gray-400"} />
            </div>
          )}
          <div className="p-3">
            <p className={`font-bold text-sm mb-1 ${
              isDark ? "text-white" : "text-black"
            }`}>
              {season.name}
            </p>
            <p className={`text-xs ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              {season.episode_count} {textContent.episodes}
            </p>
            {season.air_date && (
              <p className={`text-xs ${
                isDark ? "text-gray-500" : "text-gray-500"
              }`}>
                {season.air_date}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProductionCompaniesSection = ({ series, isDark, textContent }) => {
  if (!series.production_companies || series.production_companies.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-5 lg:px-40 py-10">
      <h3 className={`text-lg md:text-xl font-bold mb-6 ${
        isDark ? "text-white" : "text-black"
      }`}>
        {textContent.productionCompanies}
      </h3>
      <div className="flex flex-wrap gap-6">
        {series.production_companies.map((company) => (
          <div key={company.id} className={`p-4 border rounded-lg hover:shadow-lg transition-shadow ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}>
            {company.logo_path ? (
              <img 
                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                alt={company.name}
                className="h-12 object-contain"
              />
            ) : (
              <p className={`font-bold text-lg ${
                isDark ? "text-white" : "text-black"
              }`}>
                {company.name}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const SimilarSeriesSection = ({ 
  similar, 
  similarLoading, 
  isDark, 
  textContent 
}) => {
  const navigate = useNavigate();

  const truncateOverview = (text, maxLength = 150) => {
    if (!text) return textContent.noOverview;
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  const handleSimilarSeriesClick = (seriesId) => {
    window.scrollTo(0, 0);
    navigate(`/series/${seriesId}`);
  };

  const handleDetailsClick = (seriesId, e) => {
    e.stopPropagation();
    window.scrollTo(0, 0);
    navigate(`/series/${seriesId}`);
  };

  if (!similar || similar.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-5 lg:px-40 py-10">
      <div className="flex items-center justify-between mb-8">
        <h3 className={`text-lg md:text-xl font-bold ${
          isDark ? "text-white" : "text-black"
        }`}>
          {textContent.similarSeries}
        </h3>
        <button className={`text-sm hover:underline ${
          isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
        }`}>
          {textContent.viewAll} →
        </button>
      </div>

      {similarLoading ? (
        <div className="flex justify-center items-center py-10">
          <span className={`loading loading-spinner loading-lg ${
            isDark ? "text-white" : "text-black"
          }`}></span>
        </div>
      ) : similar.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {similar.map((show) => (
            <div 
              key={show.id} 
              onClick={() => handleSimilarSeriesClick(show.id)}
              className={`border rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 ${
                isDark ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="relative">
                {show.backdrop_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
                    alt={show.original_name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className={`w-full h-48 flex items-center justify-center ${
                    isDark ? "bg-gradient-to-br from-gray-700 to-gray-900" : "bg-gradient-to-br from-gray-100 to-gray-300"
                  }`}>
                    <Tv size={48} className={isDark ? "text-gray-500" : "text-gray-400"} />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs">
                  <Star size={12} fill="currentColor" />
                  {show.vote_average.toFixed(1)}
                </div>
              </div>
              <div className="p-3">
                <p className={`font-bold text-sm mb-2 line-clamp-1 ${
                  isDark ? "text-white" : "text-black"
                }`}>
                  {show.original_name}
                </p>
                <p className={`text-xs line-clamp-2 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}>
                  {truncateOverview(show.overview)}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                  }`}>
                    {show.first_air_date?.split("-")[0] || textContent.comingSoon}
                  </span>
                  <button
                    onClick={(e) => handleDetailsClick(show.id, e)}
                    className={`text-xs px-3 py-1 rounded transition-colors ${
                      isDark
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    {textContent.details}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`text-center py-10 rounded-lg ${
          isDark ? "bg-gray-800" : "bg-gray-100"
        }`}>
          <p className={`text-lg ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            {textContent.noSimilarSeries}
          </p>
        </div>
      )}
    </div>
  );
};

// Main Component
const DetailSeriesView = ({
  series,
  similar,
  cast,
  currentSeasons,
  isDark,
  textContent,
  loading,
  similarLoading,
  error,
  rating,
  isFavorite,
  isBookmarked,
  currentSeasonPage,
  totalSeasonPages,
  onRatingChange,
  onFavoriteToggle,
  onBookmarkToggle,
  onPrevPage,
  onNextPage,
  onPaginate
}) => {
  // Show loading state
  if (loading) {
    return <LoadingState isDark={isDark} textContent={textContent} />;
  }

  // Show error state
  if (error) {
    return <ErrorState isDark={isDark} textContent={textContent} error={error} />;
  }

  // Show main content when data is loaded
  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#1A1A1A]" : "bg-white"}`}>
      <HeroSection series={series} isDark={isDark} />
      
      {/* Main Content */}
      <div className="container mx-auto px-5 lg:px-40 py-10 lg:py-16 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <PosterSection series={series} isDark={isDark} textContent={textContent} />
        <SeriesInfoSection
          series={series}
          isDark={isDark}
          textContent={textContent}
          rating={rating}
          isFavorite={isFavorite}
          isBookmarked={isBookmarked}
          onRatingChange={onRatingChange}
          onFavoriteToggle={onFavoriteToggle}
          onBookmarkToggle={onBookmarkToggle}
        />
      </div>

      <CastSection cast={cast} isDark={isDark} textContent={textContent} />
      <SeasonsSection
        currentSeasons={currentSeasons}
        isDark={isDark}
        textContent={textContent}
        currentSeasonPage={currentSeasonPage}
        totalSeasonPages={totalSeasonPages}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
      />
      <ProductionCompaniesSection series={series} isDark={isDark} textContent={textContent} />
      <SimilarSeriesSection
        similar={similar}
        similarLoading={similarLoading}
        isDark={isDark}
        textContent={textContent}
      />
    </div>
  );
};

export default DetailSeriesView;