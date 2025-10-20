import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import smartphone from "../assets/img/smartphone.png";
import laptop from "../assets/img/laptop.png";
import tablet from "../assets/img/tablet.png";
import watch from "../assets/img/watch.png";
import consoleImg from "../assets/img/consoleImg.png";
import headphones from "../assets/img/headphones.png";
import speaker from "../assets/img/speaker.png";
import accessories from "../assets/img/accessories.png";
import { FaHeart, FaRegHeart, FaChartBar } from "react-icons/fa";

const FAVORITES_KEY = "behoof_favorites_v1";

const PRODUCTS = [
  { id: "p1", title: "Apple iPhone 13 Pro Max 256 ГБ серый", category: "Смартфоны", price: 114099, image: smartphone },
  { id: "p2", title: "JBL Charge 5 Портативная колонка", category: "Портативные колонки", price: 12990, image: speaker },
  { id: "p3", title: "Sony WH-1000XM5 Наушники", category: "Наушники", price: 34990, image: headphones },
  { id: "p4", title: "PlayStation 5", category: "Игровые приставки", price: 49990, image: consoleImg },
  { id: "p5", title: "MacBook Pro 14\"", category: "Ноутбуки", price: 159990, image: laptop },
  { id: "p6", title: "Apple iPad Pro 11\"", category: "Планшеты", price: 89990, image: tablet },
  { id: "p7", title: "Apple Watch Series 9", category: "Умные часы", price: 39990, image: watch },
  { id: "p8", title: "Power Bank 20000 mAh", category: "Аксессуары", price: 2490, image: accessories },
  { id: "p9", title: 'Dell 24" Монитор', category: "Мониторы", price: 19990, image: laptop },
  { id: "p10", title: "Xiaomi Redmi Note 12", category: "Смартфоны", price: 21990, image: smartphone }
];

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(list) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
  } catch {}
}

export default function Home() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(() => loadFavorites());
  const [toast, setToast] = useState(null);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const isFav = (id) => favorites.some((p) => p.id === id);

  const toggleFavorite = (product) => {
    if (isFav(product.id)) {
      const next = favorites.filter((p) => p.id !== product.id);
      setFavorites(next);
      setToast("Удалено из избранного");
    } else {
      setFavorites([product, ...favorites]);
      setToast("Добавлено в избранное");
    }
    setTimeout(() => setToast(null), 1800);
  };

  return (
    <div className="flex flex-col items-center bg-white min-h-screen pt-24 pb-28 px-4">
      <div className="max-w-7xl w-full">
        <div className="flex flex-wrap justify-between gap-6 mb-8">
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-md p-6 flex-1 min-w-[300px]">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-red-500">1.8 млн</span> товаров в{" "}
              <span className="text-red-500">2272</span> магазинах
            </h2>
            <p className="text-lg mt-2">найди, сравни, выбирай!</p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => navigate("/categories")}
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
              >
                Перейти к категориям →
              </button>
              <button
                onClick={() => navigate("/favorites")}
                className="bg-white border border-gray-200 py-2 px-4 rounded-lg"
              >
                Избранное ({favorites.length})
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-md p-6 w-[300px]">
            <h3 className="text-xl font-semibold">
              <span className="text-red-500">Топ-10</span> смартфонов
            </h3>
            <p className="text-sm mt-2">2023 года</p>
            <button
              onClick={() => navigate("/top-smartphones")}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
            >
              Смотреть →
            </button>
          </div>
        </div>

        <section className="bg-gray-50 rounded-2xl p-6 mb-10">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Лучший выбор
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 1, name: "Смартфоны", img: smartphone, path: "/smartphones" },
              { id: 2, name: "Ноутбуки", img: laptop, path: "/notebooks" },
              { id: 3, name: "Планшеты", img: tablet, path: "/tablets" },
              { id: 4, name: "Часы", img: watch, path: "/watches" },
              { id: 5, name: "Приставки", img: consoleImg, path: "/consoles" },
              { id: 6, name: "Наушники", img: headphones, path: "/headphones" },
              { id: 7, name: "Колонки", img: speaker, path: "/speakers" },
              { id: 8, name: "Аксессуары", img: accessories, path: "/accessories" }
            ].map((c) => (
              <Link
                key={c.id}
                to={c.path}
                className="w-28 flex flex-col items-center bg-white rounded-xl shadow p-3 hover:scale-105 transition-transform"
              >
                <div className="w-20 h-20 flex items-center justify-center bg-white rounded-lg overflow-hidden">
                  <img src={c.img} alt={c.name} className="object-contain h-full" />
                </div>
                <div className="text-sm mt-2 text-center">{c.name}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Новинки</h2>
            <button
              onClick={() => navigate("/new")}
              className="text-sm text-red-500"
            >
              К новинкам →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col"
              >
                <div className="h-36 flex items-center justify-center bg-gray-50 rounded-md mb-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain h-full"
                  />
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  {product.category}
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="font-semibold mb-3 hover:underline"
                >
                  {product.title}
                </Link>
                <div className="mt-auto flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Цена</div>
                    <div className="font-bold text-base">
                      {product.price.toLocaleString("ru-RU")} ₽
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => toggleFavorite(product)}
                      className="p-2 bg-white rounded-full border shadow-sm"
                    >
                      {isFav(product.id) ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart className="text-gray-400" />
                      )}
                    </button>
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="p-2 bg-white rounded-full border shadow-sm"
                    >
                      <FaChartBar className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === Наша цель === */}
        <section className="bg-white py-12 px-4 rounded-lg mb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-left">
              Наша цель — создать фантастический <br className="hidden md:block" /> сервис для всех потребителей
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-4xl font-bold text-red-500 mb-2">5</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. <br />
                  Rhoncus risus nunc a pharetra viverra enim nunc.
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-red-500 mb-2">30</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Gravida vel convallis id aliquet volutpat <br />
                  nullam dignissim. Amet parturient elementum lectus rhoncus at.
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-red-500 mb-2">300</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Sed varius ut venenatis id amet et consectetur pellentesque. <br />
                  Vitae urna ornare vel suspendisse tincidunt.
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-red-500 mb-2">8</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Id enim ornare lacus duis. Ac fermentum auctor cras adipiscing <br />
                  feugiat quis convallis velit.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-32 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
