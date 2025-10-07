import { Search as SearchIcon, Film, Star, Calendar, Play } from 'lucide-react';

const SearchView = ({
    query,
    results,
    loading,
    error,
    isInputExpanded,
    currentQuery,
    isDark,
    onQueryChange,
    onSearch,
    onKeyPress,
    onClearSearch,
    onNavigateToDetail,
    content,
    searchInputRef,
    formatDate
}) => {
    return (
        <div className={`min-h-screen pt-20 transition-colors duration-300 ${
            isDark 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-50 text-gray-900'
        }`}>
            <div className="container mx-auto px-4 py-8">
                {/* Search Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <SearchIcon className={`w-12 h-12 transition-all duration-500 ${
                            isDark ? 'text-blue-400' : 'text-blue-600'
                        } ${isInputExpanded ? 'opacity-100' : 'opacity-0'}`} />
                        <h1 className={`text-4xl md:text-5xl font-bold transition-all duration-500 ${
                            isInputExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}>
                            {currentQuery ? content.searchResults : content.title}
                        </h1>
                    </div>
                    
                    {!isInputExpanded && (
                        <div className="animate-pulse">
                            <p className={`text-2xl font-light italic ${
                                isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                                {content.placeholderText}
                            </p>
                        </div>
                    )}

                    <p className={`transition-all duration-500 delay-300 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                    } ${isInputExpanded ? 'opacity-100 mt-4' : 'opacity-0 h-0'}`}>
                        {currentQuery 
                            ? `${content.foundCollections} "${currentQuery}"` 
                            : content.searchDescription
                        }
                    </p>
                </div>

                {/* Search Form */}
                <div className={`max-w-2xl mx-auto mb-8 transition-all duration-700 ${
                    isInputExpanded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}>
                    <form onSubmit={onSearch} className="flex gap-2 mb-4">
                        <div className="flex-1 relative">
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={query}
                                onChange={(e) => onQueryChange(e.target.value)}
                                onKeyDown={onKeyPress}
                                placeholder={content.searchPlaceholder}
                                className={`w-full px-4 py-4 pl-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-500 ${
                                    isDark 
                                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                } ${isInputExpanded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
                            />
                            <SearchIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-500 ${
                                isDark ? 'text-gray-400' : 'text-gray-500'
                            } ${isInputExpanded ? 'opacity-100' : 'opacity-0'}`} />
                            {query && (
                                <button
                                    type="button"
                                    onClick={onClearSearch}
                                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-200 ${
                                        isDark 
                                            ? 'text-gray-400 hover:text-gray-300' 
                                            : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Error Message */}
                {error && (
                    <div className={`max-w-2xl mx-auto mb-6 p-4 rounded-lg text-center border transition-all duration-500 ${
                        isDark
                            ? 'bg-red-500/20 border-red-500/50 text-red-200'
                            : 'bg-red-100 border-red-300 text-red-800'
                    } ${isInputExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <p className="font-semibold mb-2">Error:</p>
                        <p>{error}</p>
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className={`text-center py-12 transition-all duration-500 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                    } ${isInputExpanded ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                        <p className="text-xl">
                            {currentQuery ? content.loadingCollections : content.loadingPopular}
                        </p>
                    </div>
                )}

                {/* Results - TAMPILAN SERAGAM UNTUK SEMUA */}
                {!loading && !error && results.length > 0 && (
                    <div className={`transition-all duration-500 delay-200 ${
                        isInputExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">
                                {currentQuery ? content.searchResults : content.popularMovies} 
                                ({results.length} {content.results})
                            </h2>
                            {currentQuery ? (
                                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                    {content.for}: <span className="font-semibold">"{currentQuery}"</span>
                                </p>
                            ) : (
                                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                    {content.trending}
                                </p>
                            )}
                        </div>
                        
                        {/* Grid yang sama persis untuk semua kondisi */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {results.map((movie) => (
                                <div
                                    key={movie.id}
                                    onClick={() => onNavigateToDetail(movie)}
                                    className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group ${
                                        isDark 
                                            ? 'bg-gray-800 hover:bg-gray-700' 
                                            : 'bg-white hover:bg-gray-50'
                                    }`}
                                >
                                    {/* Poster */}
                                    <div className="relative h-80 bg-gradient-to-br from-gray-900 to-gray-700 overflow-hidden">
                                        {movie.poster_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div 
                                            className={`w-full h-full flex items-center justify-center ${
                                                movie.poster_path ? 'hidden' : 'flex'
                                            }`}
                                        >
                                            <Film className="w-16 h-16 text-gray-400" />
                                        </div>
                                        
                                        {/* Rating Badge */}
                                        {movie.vote_average > 0 && (
                                            <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                                {movie.vote_average.toFixed(1)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content - SAMA PERSIS untuk semua kondisi */}
                                    <div className="p-4">
                                        <h3 className="font-bold text-lg mb-2 line-clamp-2">
                                            {movie.title}
                                        </h3>

                                        {/* Original Title */}
                                        {movie.original_title && movie.original_title !== movie.title && (
                                            <p className={`text-sm mb-2 italic line-clamp-1 ${
                                                isDark ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                                {movie.original_title}
                                            </p>
                                        )}

                                        {/* Rating & Date */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                <span className={`text-sm font-medium ${
                                                    isDark ? 'text-gray-300' : 'text-gray-700'
                                                }`}>
                                                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className={`w-4 h-4 ${
                                                    isDark ? 'text-gray-500' : 'text-gray-400'
                                                }`} />
                                                <span className={`text-sm ${
                                                    isDark ? 'text-gray-400' : 'text-gray-600'
                                                }`}>
                                                    {formatDate(movie.release_date)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Overview */}
                                        <p className={`text-sm line-clamp-3 ${
                                            isDark ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                            {movie.overview || content.noDescription}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* No Results */}
                {!loading && !error && currentQuery && results.length === 0 && (
                    <div className={`text-center py-12 transition-all duration-500 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                    } ${isInputExpanded ? 'opacity-100' : 'opacity-0'}`}>
                        <SearchIcon className="w-24 h-24 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-2xl font-bold mb-2">{content.noResults}</h3>
                        <p className="mb-4">{content.noCollections} "{currentQuery}"</p>
                        <button
                            onClick={onClearSearch}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                isDark
                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {content.viewPopular}
                        </button>
                    </div>
                )}

                {/* Initial State - Loading Popular Movies */}
                {!loading && !error && !currentQuery && results.length === 0 && (
                    <div className={`text-center py-12 transition-all duration-500 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                    } ${isInputExpanded ? 'opacity-100' : 'opacity-0'}`}>
                        <Play className="w-24 h-24 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-2xl font-bold mb-2">{content.popularMovies}</h3>
                        <p className="mb-4">{content.loadingPopular}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchView;