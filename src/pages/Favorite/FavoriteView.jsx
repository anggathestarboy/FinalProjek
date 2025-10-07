import React from "react";
import { Star, Calendar, Play, Heart, Eye, Trash2 } from "lucide-react";

const FavoritesView = ({
  favorites,
  loading,
  error,
  isDark,
  textContent,
  handleRemoveFavorite,
  handleViewDetails,
  handleCardClick,
  handlePlayClick
}) => {
  // Loading component
  if (loading) {
    return (
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
            {textContent.loadingFavorites}
          </p>
        </div>
      </div>
    );
  }

  // Error component
  if (error) {
    return (
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
          <span className={isDark ? "text-white" : "text-black"}>
            {textContent.error}: {error}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-[#1A1A1A]" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1
            className={`text-4xl font-bold mb-2 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {textContent.myFavorites}
          </h1>
          <p
            className={`text-lg ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {favorites.length} {textContent.favoriteMovies}
          </p>
        </div>

        {/* Movies Grid */}
        {favorites.length === 0 ? (
          <div
            className={`text-center py-20 rounded-lg ${
              isDark ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <Heart
              size={64}
              className={`mx-auto mb-4 ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            />
            <p
              className={`text-xl mb-2 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {textContent.noFavorites}
            </p>
            <p
              className={`${
                isDark ? "text-gray-500" : "text-gray-500"
              }`}
            >
              {textContent.addSomeFavorites}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((movie) => (
              <div
                key={movie.id}
                className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  isDark 
                    ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700" 
                    : "bg-gradient-to-br from-white to-gray-50 border border-gray-200"
                } rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl`}
                onClick={() => handleCardClick(movie.id)}
              >
                {/* Movie Poster */}
                <div className="relative aspect-[2/3] overflow-hidden">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div
                      className={`w-full h-full flex items-center justify-center ${
                        isDark
                          ? "bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900"
                          : "bg-gradient-to-br from-purple-200 via-blue-200 to-gray-300"
                      }`}
                    >
                      <span className="text-6xl">🎬</span>
                    </div>
                  )}
                  
                  {/* Enhanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Enhanced Rating Badge */}
                  <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md text-white px-3 py-2 rounded-2xl flex items-center gap-2 text-sm font-bold shadow-lg">
                    <Star size={16} fill="currentColor" className="text-yellow-400" />
                    <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
                  </div>

                  {/* Enhanced Hover Actions */}
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <button
                        onClick={(e) => handleViewDetails(movie.id, e)}
                        className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 hover:scale-110 transition-all duration-300 shadow-2xl"
                        title={textContent.viewDetails}
                      >
                        <Eye size={24} />
                      </button>
                      <button
                        onClick={(e) => handleRemoveFavorite(movie.id, e)}
                        className="bg-red-600 text-white p-4 rounded-2xl hover:bg-red-700 hover:scale-110 transition-all duration-300 shadow-2xl"
                        title={textContent.removeFromFavorites}
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Release Year */}
                  <div className="absolute bottom-4 right-4">
                    <div className="flex items-center gap-2 bg-black/90 backdrop-blur-md px-3 py-2 rounded-2xl">
                      <Calendar size={14} className="text-gray-300" />
                      <span className="text-white text-sm font-semibold">
                        {movie.release_date ? movie.release_date.split("-")[0] : "TBA"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Movie Info */}
                <div className="p-5">
                  <h3
                    className={`font-bold text-lg mb-3 line-clamp-2 group-hover:text-yellow-500 transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {movie.original_title}
                  </h3>

                  {/* Overview dengan styling yang lebih baik */}
                  {movie.overview && (
                    <p
                      className={`text-sm mb-4 line-clamp-3 ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {movie.overview}
                    </p>
                  )}

          {/* Movie Details Section */}
<div className="grid grid-cols-1 gap-3 mb-4">
  {/* Rating */}
  <div
    className={`flex items-center gap-2 p-3 rounded-lg ${
      isDark ? "bg-gray-700/50" : "bg-gray-100"
    }`}
  >
    <Star size={18} className="text-yellow-500" />
    <div>
      <p
        className={`text-xs ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {textContent.rating}
      </p>
      <p
        className={`text-sm font-semibold ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
      </p>
    </div>
  </div>

  {/* Release Date */}
  <div
    className={`flex items-center gap-2 p-3 rounded-lg ${
      isDark ? "bg-gray-700/50" : "bg-gray-100"
    }`}
  >
    <Calendar
      size={18}
      className={isDark ? "text-blue-400" : "text-blue-500"}
    />
    <div>
      <p
        className={`text-xs ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {textContent.releaseDate}
      </p>
      <p
        className={`text-sm font-semibold ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {movie.release_date || "TBA"}
      </p>
    </div>
  </div>
</div>



                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleViewDetails(movie.id, e)}
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        isDark
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                    >
                      <Eye size={16} />
                      {textContent.viewDetails}
                    </button>
                    <button
                      onClick={(e) => handleRemoveFavorite(movie.id, e)}
                      className={`py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                        isDark
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}
                      title={textContent.removeFromFavorites}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesView;