import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Navbar = () => {
  const tema = useSelector((state) => state.temaTotal);
  const bahasa = useSelector((state) => state.bahasaTotal);
  const dispatch = useDispatch();

  const toggleTema = () => {
    dispatch({
      type: "SET_TEMA",
      payload: tema === "Gelap" ? "Terang" : "Gelap",
    });
  };

  const toggleBahasa = () => {
    dispatch({
      type: "SET_BAHASA",
      payload: bahasa === "Indonesia" ? "English" : "Indonesia",
    });
  };

  const isDark = tema === "Gelap";
  const isIndonesia = bahasa === "Indonesia";

  // Text berdasarkan bahasa
  const textContent = {
    home: isIndonesia ? "Beranda" : "Home",
    about: isIndonesia ? "Favorit" : "Favorite",
    contact: isIndonesia ? "Telusuri" : "Search",
    category: isIndonesia ? "Kategori" : "Category",
    movieApp: isIndonesia ? "Aksata Movie" : "Aksata Movie",
    indonesia: "Indonesia",
    english: "English"
  };

  return (
    <nav
      className={`w-full px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-50 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Judul */}
      <div className="text-xl font-bold">{textContent.movieApp}</div>

      {/* Menu */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Menu Items */}
      <Link to={'/'}> <a href="" className="hover:underline hidden sm:block transition duration-200">
          {textContent.home}
        </a></Link> 


        <Link to={'/favorites'}>     <a href="" className="hover:underline hidden sm:block transition duration-200">
          {textContent.about}
        </a></Link>
   

   <Link to={'/search'}> <a href="/search" className="hover:underline hidden sm:block transition duration-200">
          {textContent.contact}
        </a></Link>

        <Link to={'/category'}>   <a href="/category" className="hover:underline hidden sm:block transition duration-200">
          {textContent.category}
        </a></Link>
       
     

        {/* Language Toggle */}
        <button
          onClick={toggleBahasa}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition duration-200 ${
            isDark 
              ? "bg-gray-700 hover:bg-gray-600 text-white" 
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          {isIndonesia ? "ID" : "EN"}
        </button>

        <div
          onClick={toggleTema}
          className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition ${
            isDark ? "bg-gray-700" : "bg-yellow-400"
          }`}
        >
          <div
            className={`w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-md transform transition ${
              isDark ? "translate-x-8" : "translate-x-0"
            }`}
          >
            {isDark ? (
              <MoonIcon className="h-4 w-4 text-gray-800" />
            ) : (
              <SunIcon className="h-4 w-4 text-yellow-500" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;