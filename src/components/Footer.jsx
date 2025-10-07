import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const Footer = () => {
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
    about: isIndonesia ? "Tentang Kami" : "About Us",
    contact: isIndonesia ? "Kontak" : "Contact",
    privacy: isIndonesia ? "Kebijakan Privasi" : "Privacy Policy",
    terms: isIndonesia ? "Syarat & Ketentuan" : "Terms & Conditions",
    rights: isIndonesia ? "Hak Cipta Dilindungi" : "All Rights Reserved",
    movieApp: isIndonesia ? "Aksata Movie" : "Aksata Movie",
    description: isIndonesia 
      ? "Platform streaming film terbaik untuk penggemar cinema" 
      : "The best movie streaming platform for cinema enthusiasts",
    followUs: isIndonesia ? "Ikuti Kami" : "Follow Us",
    quickLinks: isIndonesia ? "Tautan Cepat" : "Quick Links",
    support: isIndonesia ? "Bantuan" : "Support",
    faq: isIndonesia ? "FAQ" : "FAQ",
    blog: isIndonesia ? "Blog" : "Blog"
  };

  return (
    <footer
      className={`w-full px-6 py-8 mt-8 border-t ${
        isDark 
          ? "bg-gray-900 text-white border-gray-700" 
          : "bg-white text-gray-900 border-gray-200"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          
          {/* Brand Section */}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-4">{textContent.movieApp}</h3>
            <p className="text-sm mb-4 max-w-md">
              {textContent.description}
            </p>
            
            {/* Theme and Language Toggles */}
            <div className="flex items-center gap-4 mb-4">
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

              {/* Theme Toggle */}
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
          </div>

          {/* Quick Links - STATIS */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Links Group 1 */}
            <div>
              <h4 className="font-semibold mb-4">{textContent.followUs}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a 
                    href="#" 
                    className={`hover:underline transition duration-200 ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className={`hover:underline transition duration-200 ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className={`hover:underline transition duration-200 ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Links Group 2 */}
            <div>
              <h4 className="font-semibold mb-4">{textContent.quickLinks}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a 
                    href="#" 
                    className={`hover:underline transition duration-200 ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {textContent.about}
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className={`hover:underline transition duration-200 ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {textContent.contact}
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className={`hover:underline transition duration-200 ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {textContent.privacy}
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className={`hover:underline transition duration-200 ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {textContent.terms}
                  </a>
                </li>
              </ul>
            </div>

            {/* Links Group 3 */}
            <div>
              <h4 className="font-semibold mb-4">{textContent.support}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a 
                    href="#" 
                    className={`hover:underline transition duration-200 ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {textContent.faq}
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className={`hover:underline transition duration-200 ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {textContent.blog}
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className={`hover:underline transition duration-200 ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className={`hover:underline transition duration-200 ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {isIndonesia ? "Pusat Bantuan" : "Support Center"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`mt-8 pt-6 border-t ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center md:text-left">
              © {new Date().getFullYear()} {textContent.movieApp}. {textContent.rights}.
            </p>
            
            <div className="flex items-center gap-4 text-sm">
              <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                {isIndonesia ? "Tema:" : "Theme:"} {tema}
              </span>
              <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                {isIndonesia ? "Bahasa:" : "Language:"} {bahasa}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;