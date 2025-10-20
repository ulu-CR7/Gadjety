import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTiktok,
  FaInstagram,
  FaTelegramPlane,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa";
import logo from "../assets/svg/headerIcon.svg";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <>
      {/* Desktop / tablet footer (как у тебя было) */}
      <footer className="hidden md:block bg-gray-100 py-8 md:py-10 mt-12 md:mt-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Логотип и соцсети */}
          <div>
            <h2 className="text-xl md:text-2xl text-gray-800 mb-3 flex font-bold items-center">
              <img src={logo} alt="" className="mr-2 md:mr-3 w-6 h-6 md:w-8 md:h-8" />
              Behoof
            </h2>
            <p className="text-gray-500 mb-3 text-sm md:text-base">Мы в соц сетях</p>
            <div className="flex space-x-3 md:space-x-4 text-gray-600 text-lg md:text-xl">
              <a href="#" className="hover:text-red-500 transition-colors"><FaTiktok /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><FaInstagram /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><FaTelegramPlane /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><FaYoutube /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><FaFacebook /></a>
            </div>
          </div>

          {/* Пользователю */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">Пользователю</h3>
            <ul className="space-y-2 text-gray-500 text-sm md:text-base">
              <li><Link to="/contact" className="hover:text-red-500 transition-colors">Связаться с нами</Link></li>
              <li><Link to="/support" className="hover:text-red-500 transition-colors">Поддержка пользователей</Link></li>
              <li><Link to="/faq" className="hover:text-red-500 transition-colors">FAQ и Руководства</Link></li>
              <li><Link to="/privacy" className="hover:text-red-500 transition-colors">Политика конфиденциальности</Link></li>
              <li><Link to="/terms" className="hover:text-red-500 transition-colors">Пользовательское соглашение</Link></li>
            </ul>
          </div>

          {/* Популярные категории */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">Популярные категории</h3>
            <ul className="space-y-2 text-gray-500 text-sm md:text-base">
              <li><Link to="/category/smartphones" className="hover:text-red-500 transition-colors">Смартфоны</Link></li>
              <li><Link to="/category/laptops" className="hover:text-red-500 transition-colors">Ноутбуки</Link></li>
              <li><Link to="/category/tv" className="hover:text-red-500 transition-colors">Телевизоры</Link></li>
              <li><Link to="/category/watches" className="hover:text-red-500 transition-colors">Умные часы</Link></li>
              <li><Link to="/category/consoles" className="hover:text-red-500 transition-colors">Игровые приставки</Link></li>
            </ul>
          </div>

          {/* Команда */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">Команда Behoof</h3>
            <ul className="space-y-2 text-gray-500 text-sm md:text-base">
              <li><Link to="/about" className="hover:text-red-500 transition-colors">О нас</Link></li>
              <li><Link to="/jobs" className="hover:text-red-500 transition-colors">Работа у нас</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-gray-400 text-xs md:text-sm mt-8 md:mt-10 border-t border-gray-200 pt-4 md:pt-5 px-4">
          Copyright © 2025 Behoof. Все права защищены.
        </div>
      </footer>

      {/* Mobile fixed bottom nav (как на макете) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <button onClick={() => navigate("/")} className="flex flex-col items-center text-sm text-gray-600">
              <svg className="w-6 h-6 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M9 21V9h6v12" />
              </svg>
              <span className="text-xs">Главная</span>
            </button>

            <button onClick={() => navigate("/categories")} className="flex flex-col items-center text-sm text-gray-600">
              <svg className="w-6 h-6 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="text-xs">Каталог</span>
            </button>

            <button onClick={() => navigate("/favorites")} className="flex flex-col items-center text-sm text-gray-600">
              <svg className="w-6 h-6 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 006.364 6.364L12 20.364l1.318-1.682a4.5 4.5 0 006.364-6.364" />
              </svg>
              <span className="text-xs">Избранное</span>
            </button>

            <button onClick={() => navigate("/compare")} className="flex flex-col items-center text-sm text-gray-600">
              <svg className="w-6 h-6 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6" />
              </svg>
              <span className="text-xs">Сравнение</span>
            </button>

            <button onClick={() => navigate("/profile")} className="flex flex-col items-center text-sm text-gray-600">
              <svg className="w-6 h-6 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs">Профиль</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
