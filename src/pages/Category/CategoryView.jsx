import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Star, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryView = ({
  isDark,
  categories,
  selectedCategory,
  items,
  loading,
  currentPage,
  totalPages,
  loadingMore,
  onCategorySelect,
  onLoadMore,
  onAllItems,
  getItemTitle,
  getItemDate,
  textContent,
  getShowingText,
  onItemClick, // Tambahkan prop baru untuk handle klik item
}) => {
  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#1A1A1A]" : "bg-white"} pb-10`}>
      {/* Header Section */}
      <div className={`pt-20 pb-8 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className="container mx-auto px-5 lg:px-40">
          <h1 className={`text-3xl lg:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
            {textContent.movieCategories}
          </h1>
          <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {textContent.discoverMovies}
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-5 lg:px-40 py-8">
        <h2 className={`text-xl lg:text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}>
          {textContent.selectCategory}
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-8">
          {/* All Categories Button */}
          <button
            onClick={onAllItems}
            className={`px-4 py-3 rounded-lg border-2 transition-all duration-300 text-center ${
              selectedCategory === null
                ? "bg-blue-600 border-blue-600 text-white"
                : `${isDark ? "border-gray-600 text-white hover:border-blue-500 hover:bg-gray-700" : "border-gray-300 text-black hover:border-blue-500 hover:bg-gray-100"}`
            }`}
          >
            {textContent.allMovies}
          </button>

          {/* Category Buttons */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category)}
              className={`px-4 py-3 rounded-lg border-2 transition-all duration-300 text-center ${
                selectedCategory?.id === category.id
                  ? "bg-blue-600 border-blue-600 text-white"
                  : `${isDark ? "border-gray-600 text-white hover:border-blue-500 hover:bg-gray-700" : "border-gray-300 text-black hover:border-blue-500 hover:bg-gray-100"}`
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Movies Grid Section */}
      <div className="container mx-auto px-5 lg:px-40 py-8">
        {/* Selected Category Title */}
        {selectedCategory && (
          <div className="mb-8 text-center">
            <h2 className={`text-2xl lg:text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-black"}`}>
              {selectedCategory.name} {textContent.movies}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {getShowingText()}
              </p>
            </div>
          </div>
        )}

        {loading && currentPage === 1 ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>

          
            {/* Movies Grid - Enhanced dengan tampilan yang lebih baik */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
             
              {items.map((item) => (
                
                <div
                  key={`${item.id}-${getItemDate(item)}`}
                  onClick={() => onItemClick(item)} // Tambahkan handler klik
                  className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                    isDark 
                      ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700" 
                      : "bg-gradient-to-br from-white to-gray-50 border border-gray-200"
                  } rounded-xl overflow-hidden shadow-lg hover:shadow-xl`}
                >
                   <Link to={`/detail/${item.id}`}>  
                  {/* Poster Section */}
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                          : "/api/placeholder/300/450"
                      }
                      alt={getItemTitle(item)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/300/450";
                      }}
                    />

                    
                    {/* Rating Badge */}
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold">
                      <Star size={12} fill="currentColor" className="text-yellow-400" />
                      <span>{item.vote_average?.toFixed(1) || textContent.na}</span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 inline-block mb-2">
                          <Icon icon="ion:play" className="text-2xl" />
                        </div>
                        <p className="text-sm font-semibold">View Details</p>
                      </div>
                    </div>

                    {/* Release Year */}
                    {getItemDate(item) && (
                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                        {getItemDate(item)?.split('-')[0] || textContent.na}
                      </div>
                    )}
                  </div>

                   </Link>
                  
                  {/* Content Section */}
                  <div className="p-4">
                    <h3 className={`font-bold text-sm mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      {getItemTitle(item)}
                    </h3>

                    {/* Original Title jika berbeda */}
                    {item.original_title && item.original_title !== getItemTitle(item) && (
                      <p className={`text-xs mb-3 italic line-clamp-1 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}>
                        {item.original_title}
                      </p>
                    )}
                    {/* Movie Details */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-500 fill-current" />
                        <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                          {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} className={isDark ? "text-gray-500" : "text-gray-400"} />
                        <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                          {getItemDate(item)?.split('-')[0] || textContent.na}
                        </span>
                      </div>
                      
                    </div>

                    {/* Overview jika ada */}
                    {item.overview && (
                      <p className={`text-xs mt-2 line-clamp-2 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}>
                        {item.overview}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
        

            {/* No Results Message */}
            {items.length === 0 && !loading && (
              <div className="text-center py-20">
                <Icon 
                  icon="ion:film-outline"
                  className={`text-6xl mx-auto mb-4 ${isDark ? "text-gray-600" : "text-gray-400"}`} 
                />
                <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-black"}`}>
                  {textContent.noMoviesFound}
                </h3>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                  {textContent.tryDifferentCategory}
                </p>
              </div>
            )}

            {/* Load More Button */}
            {currentPage < totalPages && items.length > 0 && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={onLoadMore}
                  disabled={loadingMore}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isDark 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  } ${loadingMore ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {textContent.loadingMoreMovies}
                    </>
                  ) : (
                    <>
                      {textContent.loadMoreMovies} ({currentPage}/{totalPages})
                      <Icon icon="ion:chevron-down" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryView;