import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  Clock,
  Calendar,
  DollarSign,
  Play,
  Bookmark,
  Share2,
  Heart,
  TrendingUp,
} from "lucide-react";
import { FavoritesService } from "../service/FavoritesService";

// Reusable Components
const LoadingState = ({ isDark, textContent }) => (
  <div
    className={`min-h-screen transition-colors duration-500 ${
      isDark ? "bg-[#1A1A1A]" : "bg-white"
    } flex items-center justify-center`}
  >
    <div className="text-center">
      <span
        className={`loading loading-spinner loading-lg ${
          isDark ? "text-white" : "text-black"
        }`}
      ></span>
      <p
        className={`mt-4 text-2xl font-bold ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        {textContent.loadingMovie}
      </p>
    </div>
  </div>
);

const ErrorState = ({ isDark, textContent, error }) => (
  <div
    className={`min-h-screen transition-colors duration-500 ${
      isDark ? "bg-[#1A1A1A]" : "bg-white"
    } flex items-center justify-center`}
  >
    <div
      className={`alert alert-error max-w-md shadow-xl border ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className={isDark ? "text-white" : "text-black"}>
        {textContent.error}: {error}
      </span>
    </div>
  </div>
);

const HeroSection = ({ movie, isDark }) => (
  <div className="w-full h-[400px] md:h-[580px] relative">
    <div className="w-full h-full">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        className="h-full w-full object-cover"
        alt="Backdrop"
      />
    </div>

   
    <div
      className={`absolute w-full h-full top-0 bg-gradient-to-t ${
        isDark ? "from-[#1A1A1A]" : "from-white"
      } to-transparent`}
    ></div>
  </div>
);

const PosterSection = ({ movie, isDark, textContent }) => {
  const handlePlayNow = () => {
    console.log("Play movie:", movie.id);
  };

  return (
    <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-40 lg:min-w-60">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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

const MovieInfoSection = ({ 
  movie, 
  isDark, 
  textContent, 
  rating, 
  isFavorite, 
  isBookmarked, 
  formatRuntime,
  formatCurrency,
  onRatingChange, 
  onFavoriteToggle, 
  onBookmarkToggle,
  favoriteLoading,
  ratingLoading 
}) => (
  <div
    className={`lg:-mt-20 z-20 px-5 md:px-0 text-center lg:text-left flex-1 ${
      isDark ? "text-white" : "text-black"
    }`}
  >
    <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-1">
      {movie.title}
    </h2>
    <p
      className={`text-xs md:text-sm font-normal ${
        isDark ? "text-gray-400" : "text-neutral-600"
      }`}
    >
      {movie.tagline}
    </p>

    {/* Stats */}
    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs md:text-sm font-medium justify-center lg:justify-start">
      <p
        className={`flex py-1 px-3 border-[1px] rounded-[20px] ${
          isDark ? "border-gray-600" : "border-gray-300"
        }`}
      >
        <Star size={16} className="my-auto mr-1" fill="currentColor" />{" "}
        {textContent.rating}: {movie.vote_average.toFixed(1)}+
      </p>
      <p
        className={`flex py-1 px-3 border-[1px] rounded-[20px] ${
          isDark ? "border-gray-600" : "border-gray-300"
        }`}
      >
        <TrendingUp size={16} className="my-auto mr-1" />
        {textContent.views}: {movie.vote_count}
      </p>
      <p
        className={`flex py-1 px-3 border-[1px] rounded-[20px] ${
          isDark ? "border-gray-600" : "border-gray-300"
        }`}
      >
        <Clock size={16} className="my-auto mr-1" />
        {textContent.duration}: {formatRuntime(movie.runtime)}
      </p>
    </div>

    <div
      className={`p-[1px] rounded-full my-3 ${
        isDark ? "bg-gray-600" : "bg-gray-300"
      }`}
    ></div>

    {/* Overview */}
    <div className="text-sm">
      <h3 className="text-lg md:text-xl font-semibold mb-1">
        {textContent.overview}
      </h3>
      <p
        className={`font-light text-xs md:text-sm ${
          isDark ? "text-gray-400" : "text-neutral-600"
        }`}
      >
        {movie.overview}
      </p>

      {/* Additional Info */}
      <div className="flex flex-wrap items-center gap-3 my-3 text-xs md:text-sm font-medium justify-center lg:justify-start">
        <p>{textContent.status}: {movie.status}</p>
        <span className={isDark ? "text-gray-500" : "text-gray-400"}>
          |
        </span>
        <p>{textContent.releaseDate}: {movie.release_date}</p>
        <span className={isDark ? "text-gray-500" : "text-gray-400"}>
          |
        </span>
        <p>{textContent.revenue}: {formatCurrency(movie.revenue)}</p>
      </div>

      <div
        className={`p-[1px] rounded-full my-3 ${
          isDark ? "bg-gray-600" : "bg-gray-300"
        }`}
      ></div>

      {/* Genres */}
      <div className="flex flex-wrap gap-2 mb-3">
        {movie.genres.map((genre) => (
          <span
            key={genre.id}
            className={`px-3 py-1 border rounded-full text-xs ${
              isDark ? "border-gray-600" : "border-gray-300"
            }`}
          >
            {genre.name}
          </span>
        ))}
      </div>

      <div
        className={`p-[1px] rounded-full my-3 ${
          isDark ? "bg-gray-600" : "bg-gray-300"
        }`}
      ></div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-5 justify-center lg:justify-start items-center">
        {/* Rating */}
        <div className="mt-3">
          <h3 className="text-lg md:text-xl font-semibold mb-1">
            {textContent.rateThisMovie}
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
                      : isDark
                      ? "text-gray-500 fill-gray-500"
                      : "text-gray-400 fill-gray-400"
                  } ${ratingLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => !ratingLoading && onRatingChange(star)}
                />
              ))}
            </div>
            {rating > 0 && (
              <button
                className={`ml-3 py-2 px-2 rounded-lg bg-red-600 text-white text-sm md:text-lg ${
                  ratingLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => !ratingLoading && onRatingChange(0)}
                disabled={ratingLoading}
              >
                {ratingLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  textContent.remove
                )}
              </button>
            )}
          </div>
        </div>

        <div
          className={`w-px h-12 ${
            isDark ? "bg-gray-600" : "bg-gray-300"
          }`}
        ></div>

        {/* Add to List */}
        <div className="flex justify-between mt-3">
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-1">
              {textContent.addToList}
            </h3>
            <div className="flex gap-2">
              <button
                disabled={favoriteLoading}
                className={`py-2 px-4 text-sm md:text-lg rounded-lg text-white flex items-center gap-2 transition-all ${
                  isFavorite
                    ? "bg-red-600 hover:bg-red-700"
                    : isDark
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-600 hover:bg-gray-700"
                } ${favoriteLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={onFavoriteToggle}
              >
                {favoriteLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <Heart
                    size={20}
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                )}
                {isFavorite ? textContent.favorited : textContent.favorite}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`p-[0.5px] rounded-full my-3 ${
          isDark ? "bg-gray-600" : "bg-gray-300"
        }`}
      ></div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div
          className={`text-center p-3 border rounded-lg ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div
            className={`text-xs uppercase font-bold mb-1 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {textContent.popularity}
          </div>
          <p className="text-lg font-bold">
            {movie.popularity.toFixed(0)}
          </p>
        </div>
        <div
          className={`text-center p-3 border rounded-lg ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div
            className={`text-xs uppercase font-bold mb-1 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {textContent.language}
          </div>
          <p className="text-lg font-bold uppercase">
            {movie.original_language}
          </p>
        </div>
        <div
          className={`text-center p-3 border rounded-lg ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div
            className={`text-xs uppercase font-bold mb-1 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {textContent.budget}
          </div>
          <p className="text-lg font-bold">
            {formatCurrency(movie.budget)}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const CastSection = ({ cast, isDark, textContent }) => (
  <div className="container mx-auto px-5 lg:px-40 py-10">
    <div className="flex items-center justify-between mb-8">
      <h3
        className={`text-lg md:text-xl font-bold ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        {textContent.topCast}
      </h3>
      <button
        className={`text-sm hover:underline ${
          isDark
            ? "text-gray-400 hover:text-white"
            : "text-gray-600 hover:text-black"
        }`}
      >
        {textContent.viewAll}
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
              <div
                className={`w-full h-48 flex items-center justify-center rounded-lg ${
                  isDark
                    ? "bg-gradient-to-br from-gray-700 to-gray-900"
                    : "bg-gradient-to-br from-gray-100 to-gray-300"
                }`}
              >
                <span className="text-4xl">👤</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <p
            className={`text-sm font-medium truncate ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {actor.name}
          </p>
          <p
            className={`text-xs truncate ${
              isDark ? "text-gray-400" : "text-neutral-600"
            }`}
          >
            {actor.character}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const ProductionCompaniesSection = ({ movie, isDark, textContent }) => {
  if (!movie.production_companies || movie.production_companies.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-5 lg:px-40 py-10">
      <h3
        className={`text-lg md:text-xl font-bold mb-6 ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        {textContent.productionCompanies}
      </h3>
      <div className="flex flex-wrap gap-6">
        {movie.production_companies.map((company) => (
          <div
            key={company.id}
            className={`p-4 border rounded-lg hover:shadow-lg transition-shadow ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {company.logo_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                alt={company.name}
                className="h-12 object-contain"
              />
            ) : (
              <p
                className={`font-bold text-lg ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {company.name}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const SimilarMoviesSection = ({ 
  similarMovies, 
  similarLoading, 
  isDark, 
  textContent,
  truncateOverview
}) => {
  const navigate = useNavigate();

  const handleSimilarMovieClick = (movieId) => {
    window.scrollTo(0, 0);
    navigate(`/detail/${movieId}`);
  };

  const handleDetailsClick = (movieId, e) => {
    e.stopPropagation();
    window.scrollTo(0, 0);
    navigate(`/detail/${movieId}`);
  };

  if (!similarMovies || similarMovies.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-5 lg:px-40 py-10">
      <div className="flex items-center justify-between mb-8">
        <h3
          className={`text-lg md:text-xl font-bold ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {textContent.similarMovies}
        </h3>
        <button
          className={`text-sm hover:underline ${
            isDark
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-black"
          }`}
        >
          {textContent.viewAll}
        </button>
      </div>

      {similarLoading ? (
        <div className="flex justify-center items-center py-10">
          <span
            className={`loading loading-spinner loading-lg ${
              isDark ? "text-white" : "text-black"
            }`}
          ></span>
        </div>
      ) : similarMovies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {similarMovies.map((similarMovie) => (
            <div
              key={similarMovie.id}
              onClick={() => handleSimilarMovieClick(similarMovie.id)}
              className={`border rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 ${
                isDark
                  ? "border-gray-700 hover:border-gray-600"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Backdrop Image */}
              <div className="relative h-48 overflow-hidden">
                {similarMovie.backdrop_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w780${similarMovie.backdrop_path}`}
                    alt={similarMovie.original_title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center ${
                      isDark
                        ? "bg-gradient-to-br from-gray-700 to-gray-900"
                        : "bg-gradient-to-br from-gray-100 to-gray-300"
                    }`}
                  >
                    <span className="text-2xl">🎬</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs">
                  <Star size={12} fill="currentColor" />
                  <span className="font-bold">
                    {similarMovie.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Movie Info */}
              <div className="p-3">
                <h4
                  className={`font-bold text-sm mb-2 line-clamp-1 ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {similarMovie.original_title}
                </h4>
                <p
                  className={`text-xs mb-2 line-clamp-2 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {truncateOverview(similarMovie.overview)}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      isDark
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {similarMovie.release_date?.split("-")[0] || textContent.comingSoon}
                  </span>
                  <button
                    onClick={(e) => handleDetailsClick(similarMovie.id, e)}
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
        <div
          className={`text-center py-10 rounded-lg ${
            isDark ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <p
            className={`text-lg ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {textContent.noSimilarMovies}
          </p>
        </div>
      )}
    </div>
  );
};

// Main Component
const DetailView = ({
  movie,
  cast,
  similarMovies,
  isDark,
  textContent,
  loading,
  similarLoading,
  error,
  rating,
  isFavorite,
  isBookmarked,
  formatCurrency,
  formatRuntime,
  truncateOverview,
  onRatingChange,
  onFavoriteToggle,
  onBookmarkToggle,
  favoriteLoading,
  ratingLoading
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
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-[#1A1A1A]" : "bg-white"
      }`}
    >
      <HeroSection movie={movie} isDark={isDark} />

      {/* Main Content */}
      <div className="container mx-auto px-5 lg:px-40 py-10 lg:py-16 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <PosterSection movie={movie} isDark={isDark} textContent={textContent} />
        <MovieInfoSection
          movie={movie}
          isDark={isDark}
          textContent={textContent}
          rating={rating}
          isFavorite={isFavorite}
          isBookmarked={isBookmarked}
          formatRuntime={formatRuntime}
          formatCurrency={formatCurrency}
          onRatingChange={onRatingChange}
          onFavoriteToggle={onFavoriteToggle}
          onBookmarkToggle={onBookmarkToggle}
          favoriteLoading={favoriteLoading}
          ratingLoading={ratingLoading}
        />
      </div>

      <CastSection cast={cast} isDark={isDark} textContent={textContent} />
      <ProductionCompaniesSection movie={movie} isDark={isDark} textContent={textContent} />
      <SimilarMoviesSection
        similarMovies={similarMovies}
        similarLoading={similarLoading}
        isDark={isDark}
        textContent={textContent}
        truncateOverview={truncateOverview}
      />
    </div>
  );
};

export default DetailView;