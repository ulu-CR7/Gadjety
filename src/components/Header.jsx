import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaHeart,
  FaBalanceScale,
  FaUser,
  FaThLarge,
  FaMobileAlt,
  FaLaptop,
  FaTabletAlt,
  FaClock,
  FaHeadphones,
  FaGamepad,
  FaPlug,
  FaDesktop,
  FaVolumeUp,
  FaBoxOpen,
} from "react-icons/fa";
import logo from "../assets/svg/headerIcon.svg"; // проверь путь

const catalogData = {
  smartphones: {
    title: "Смартфоны",
    icon: <FaMobileAlt />,
    color: "text-red-500",
    subcategories: [
      { name: "Все смартфоны", models: [] },
      { name: "Новинки смартфонов", badge: "New", models: ["iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus"] },
      { name: "Недорогие смартфоны", models: [] },
      { name: "Смартфоны на Android", models: [] },
      { name: "Премиум смартфоны", models: [] },
      { name: "Кнопочные телефоны", models: [] },
      { name: "Apple", models: ["iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14", "iPhone 13"] },
      { name: "Xiaomi", models: ["Xiaomi 13 Pro", "Xiaomi 13", "Xiaomi 12T Pro"] },
      { name: "Samsung", models: ["Galaxy S23 Ultra", "Galaxy S23+", "Galaxy S23"] },
      { name: "HONOR", models: ["HONOR 90"] },
      { name: "Realme", models: ["Realme GT 3"] },
      { name: "Tecno", models: [] },
      { name: "INFINIX", models: [] },
      { name: "POCO", models: [] },
    ],
  },

  laptops: {
    title: "Ноутбуки",
    icon: <FaLaptop />,
    color: "text-blue-500",
    subcategories: [
      { name: "Игровые ноутбуки", models: ["ASUS ROG", "MSI Gaming"] },
      { name: "Ультрабуки", models: ["MacBook Air", "MacBook Pro"] },
      { name: "Рабочие ноутбуки", models: ["ThinkPad", "HP ProBook"] },
    ],
  },

  tablets: {
    title: "Планшеты",
    icon: <FaTabletAlt />,
    color: "text-purple-500",
    subcategories: [
      { name: "Apple iPad", models: ["iPad Pro", "iPad Air"] },
      { name: "Samsung", models: ["Galaxy Tab S9"] },
    ],
  },

  watches: {
    title: "Умные часы",
    icon: <FaClock />,
    color: "text-green-500",
    subcategories: [
      { name: "Apple Watch", models: ["Apple Watch Series 9", "Apple Watch SE"] },
      { name: "Samsung", models: ["Galaxy Watch 6"] },
      { name: "Xiaomi", models: ["Mi Watch"] },
    ],
  },

  headphones: {
    title: "Наушники",
    icon: <FaHeadphones />,
    color: "text-orange-500",
    subcategories: [
      { name: "Беспроводные", models: ["AirPods Pro", "Sony WH-1000XM5"] },
      { name: "Проводные", models: ["Audio-Technica", "Sennheiser"] },
    ],
  },

  consoles: {
    title: "Игровые приставки",
    icon: <FaGamepad />,
    color: "text-indigo-500",
    subcategories: [
      { name: "PlayStation", models: ["PS5"] },
      { name: "Xbox", models: ["Xbox Series X"] },
      { name: "Nintendo", models: ["Switch"] },
    ],
  },

  peripherals: {
    title: "Корпуса и блоки питания",
    icon: <FaPlug />,
    color: "text-yellow-600",
    subcategories: [{ name: "Корпуса", models: [] }, { name: "Блоки питания", models: [] }],
  },

  monitors: {
    title: "Мониторы",
    icon: <FaDesktop />,
    color: "text-cyan-500",
    subcategories: [{ name: "Игровые мониторы", models: [] }, { name: "Офисные мониторы", models: [] }],
  },

  speakers: {
    title: "Портативные колонки",
    icon: <FaVolumeUp />,
    color: "text-pink-500",
    subcategories: [{ name: "Bluetooth колонки", models: [] }, { name: "Умные колонки", models: [] }],
  },

  accessories: {
    title: "Аксессуары",
    icon: <FaBoxOpen />,
    color: "text-gray-600",
    subcategories: [{ name: "Чехлы и защита", models: [] }, { name: "Зарядные устройства", models: [] }, { name: "Кабели", models: [] }],
  },
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    const closeHandler = () => {
      setIsOpen(false);
      setActiveCategory(null);
      setActiveSubcategory(null);
    };
    window.addEventListener("openCatalog", openHandler);
    window.addEventListener("closeCatalog", closeHandler);
    return () => {
      window.removeEventListener("openCatalog", openHandler);
      window.removeEventListener("closeCatalog", closeHandler);
    };
  }, []);

  const toggleCatalog = () => {
    setIsOpen((p) => {
      if (p) {
        setActiveCategory(null);
        setActiveSubcategory(null);
      }
      return !p;
    });
  };

  const closeAll = () => {
    setIsOpen(false);
    setActiveCategory(null);
    setActiveSubcategory(null);
  };

  const handleCategoryClick = (key) => {
    if (activeCategory === key) {
      setActiveCategory(null);
      setActiveSubcategory(null);
    } else {
      setActiveCategory(key);
      setActiveSubcategory(null);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    if (!subcategory) return;
    const hasModels = Array.isArray(subcategory.models) && subcategory.models.length > 0;
    if (subcategory.name.toLowerCase().startsWith("все") || !hasModels) {
      if (activeCategory) {
        navigate(`/${activeCategory}`);
        closeAll();
      }
      return;
    }
    setActiveSubcategory(subcategory.name);
  };

  const handleModelClick = (model) => {
    if (!model) return;
    const encoded = encodeURIComponent(model);
    navigate(`/product/${encoded}`);
    closeAll();
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="Behoof" className="w-8 h-8" />
                <span className="hidden sm:inline-block font-bold text-lg">Behoof</span>
              </Link>
            </div>

            {/* Desktop search (visible md+) */}
            <div className="flex-1 mx-4 hidden md:block">
              <div className="max-w-xl">
                <div className="relative">
                  <input type="text" placeholder="Поиск товаров" className="w-full rounded-lg border border-gray-200 py-2 px-4 text-sm focus:outline-none focus:border-red-500" />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><FaSearch /></div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Desktop orange button */}
              <button onClick={toggleCatalog} className="hidden md:flex bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm items-center gap-2">
                <FaThLarge />
                <span>Каталог товаров</span>
              </button>

              {/* Icons (desktop) */}
              <div className="hidden md:flex items-center gap-4">
                <button onClick={() => navigate("/favorites")} className="text-gray-600 hover:text-red-500"><FaHeart size={18} /></button>
                <button onClick={() => navigate("/compare")} className="text-gray-600 hover:text-red-500"><FaBalanceScale size={18} /></button>
                <button onClick={() => navigate("/profile")} className="text-gray-600 hover:text-red-500"><FaUser size={18} /></button>
              </div>

              {/* Mobile search icon */}
              <div className="md:hidden">
                <button onClick={() => navigate("/search")} className="text-gray-600"><FaSearch size={18} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop / tablet dropdown (3 columns) */}
        {isOpen && (
          <div className="hidden md:block border-t border-gray-200 bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex gap-8">
                {/* Categories */}
                <div className="w-64 flex-shrink-0">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Каталог товаров</h3>
                  <div className="space-y-1">
                    {Object.entries(catalogData).map(([key, cat]) => (
                      <button key={key} onClick={() => handleCategoryClick(key)} className={`w-full text-left px-4 py-2.5 rounded-lg flex items-center gap-3 transition-colors text-sm ${activeCategory === key ? "bg-red-50 text-red-600" : "hover:bg-gray-50 text-gray-700"}`}>
                        <span className={cat.color}>{cat.icon}</span>
                        <span className="flex-1">{cat.title}</span>
                        <svg className={`w-4 h-4 transition-transform ${activeCategory === key ? "rotate-90" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subcategories */}
                {activeCategory && (
                  <div className="w-64 flex-shrink-0 border-l border-gray-200 pl-8">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">{catalogData[activeCategory].title}</h3>
                    <div className="space-y-1">
                      {catalogData[activeCategory].subcategories.map((sub, idx) => (
                        <button key={idx} onClick={() => handleSubcategoryClick(sub)} className={`w-full text-left px-4 py-2.5 rounded-lg flex items-center justify-between transition-colors text-sm ${activeSubcategory === sub.name ? "bg-red-50 text-red-600" : "hover:bg-gray-50 text-gray-700"}`}>
                          <span className="flex items-center gap-2">
                            {sub.name}
                            {sub.badge && <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded ml-2">{sub.badge}</span>}
                          </span>
                          {sub.models.length > 0 && <svg className={`w-4 h-4 transition-transform ${activeSubcategory === sub.name ? "rotate-90" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Models */}
                {activeCategory && activeSubcategory && (
                  <div className="flex-1 border-l border-gray-200 pl-8">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">{activeSubcategory}</h3>
                    <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                      {catalogData[activeCategory].subcategories.find((s) => s.name === activeSubcategory)?.models.map((m, i) => (
                        <button key={i} onClick={() => handleModelClick(m)} className="text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm">{m}</button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Promo area (right) */}
                <div className="w-72 flex-shrink-0">
                  <div className="bg-gray-50 rounded-lg p-4 h-full flex items-center justify-center">
                    <div className="text-center text-sm text-gray-600">Рекламный блок</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile drawer (full screen) */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white overflow-auto">
            {/* SEARCH row */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input type="text" placeholder="Поиск товаров" className="w-full rounded-lg border border-gray-200 py-2 px-4 text-sm focus:outline-none focus:border-red-500" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><FaSearch /></div>
              </div>
            </div>

            {/* Step 1: categories */}
            {!activeCategory && (
              <div className="px-4 py-4">
                {Object.entries(catalogData).map(([key, cat]) => (
                  <button key={key} onClick={() => handleCategoryClick(key)} className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 mb-2 hover:bg-gray-50">
                    <span className={cat.color}>{cat.icon}</span>
                    <span className="flex-1">{cat.title}</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: subcategories */}
            {activeCategory && !activeSubcategory && (
              <>
                <div className="p-4 border-b border-gray-200 flex items-center">
                  <button onClick={() => setActiveCategory(null)} className="p-2 mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <h3 className="text-lg font-semibold">{catalogData[activeCategory].title}</h3>
                </div>
                <div className="px-4 py-4">
                  {catalogData[activeCategory].subcategories.map((sub, idx) => (
                    <button key={idx} onClick={() => handleSubcategoryClick(sub)} className="w-full text-left px-4 py-3 rounded-lg flex items-center justify-between mb-2 hover:bg-gray-50">
                      <span>{sub.name}</span>
                      {sub.models.length > 0 && <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Step 3: models */}
            {activeCategory && activeSubcategory && (
              <>
                <div className="p-4 border-b border-gray-200 flex items-center">
                  <button onClick={() => setActiveSubcategory(null)} className="p-2 mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <h3 className="text-lg font-semibold">{activeSubcategory}</h3>
                </div>
                <div className="px-4 py-4 grid gap-2">
                  {catalogData[activeCategory].subcategories.find((s) => s.name === activeSubcategory)?.models.map((m, i) => (
                    <button key={i} onClick={() => handleModelClick(m)} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50">{m}</button>
                  ))}
                  {(!catalogData[activeCategory].subcategories.find((s) => s.name === activeSubcategory)?.models.length) && (
                    <div className="mt-4 px-4">
                      <button onClick={() => { navigate(`/${activeCategory}`); closeAll(); }} className="w-full bg-red-500 text-white py-2 rounded">Просмотреть все в {catalogData[activeCategory].title}</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
}
