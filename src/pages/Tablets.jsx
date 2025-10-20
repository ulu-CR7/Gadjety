// src/pages/Tablets.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaBalanceScale } from "react-icons/fa";
import tabletImg from "../assets/img/tablet.png"; // использую ваш tablet.png
import accessoriesImg from "../assets/img/accessories.png";
import smartphoneImg from "../assets/img/smartphone.png";

const ITEMS_PER_PAGE = 10;
const TOTAL_PAGES = 8; // 8 страниц
const FAVORITES_KEY = "behoof_favorites_v1";
const COMPARE_KEY = "behoof_compare_v1";

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  "<svg xmlns='http://www.w3.org/2000/svg' width='480' height='360'>" +
  "<rect width='100%' height='100%' fill='%23f3f4f6'/>" +
  "<text x='50%' y='50%' fill='%23959eaa' font-size='18' text-anchor='middle' dominant-baseline='middle'>No image</text>" +
  "</svg>";

function loadLocal(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
function normalizeProductForSave(p) {
  return {
    id: p.id,
    title: p.title,
    price: typeof p.price === "number" ? p.price : Number(p.price) || 0,
    category: p.category || "Планшеты",
    image:
      p.image ||
      (Array.isArray(p.images) && p.images[0]) ||
      p.thumbnail ||
      "",
    raw: p,
  };
}

/*
  Явный список базовых моделей планшетов — откуда мы генерируем 80 уникальных товаров.
  Можно дописывать/редактировать названия, описания, цены и изображения.
*/
const BASE_TABLETS = [
  {
    slug: "ipad-pro",
    title: "Apple iPad Pro 11",
    price: 899,
    image: tabletImg,
    description: "11\" Liquid Retina, M1, отличный планшет для творчества и работы."
  },
  {
    slug: "ipad-air",
    title: "Apple iPad Air",
    price: 599,
    image: tabletImg,
    description: "Лёгкий и мощный iPad Air с отличным экраном."
  },
  {
    slug: "samsung-tab-s8",
    title: "Samsung Galaxy Tab S8",
    price: 749,
    image: tabletImg,
    description: "Флагманский Android-планшет с ярким дисплеем и мощным железом."
  },
  {
    slug: "lenovo-tab-p11",
    title: "Lenovo Tab P11",
    price: 349,
    image: tabletImg,
    description: "Доступный планшет с хорошим экраном для мультимедиа."
  },
  {
    slug: "huawei-matepad",
    title: "Huawei MatePad 11",
    price: 419,
    image: tabletImg,
    description: "Планшет для работы и развлечений с ярким экраном."
  },
  {
    slug: "xiaomi-pad",
    title: "Xiaomi Pad 5",
    price: 399,
    image: tabletImg,
    description: "Быстрый и недорогой планшет от Xiaomi."
  },
  {
    slug: "amazon-fire",
    title: "Amazon Fire HD 10",
    price: 149,
    image: accessoriesImg,
    description: "Бюджетный планшет для чтения и просмотра видео."
  },
  {
    slug: "microsoft-surface",
    title: "Microsoft Surface Go",
    price: 549,
    image: smartphoneImg,
    description: "Компактный планшет с поддержкой клавиатуры и Windows."
  },
  {
    slug: "acer-tab",
    title: "Acer Tab 10",
    price: 279,
    image: tabletImg,
    description: "Практичный планшет для учебы и работы."
  },
  {
    slug: "asus-zenpad",
    title: "ASUS ZenPad",
    price: 329,
    image: tabletImg,
    description: "Удобный планшет с отличным соотношением цены и качества."
  }
];

export default function Tablets() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => loadLocal(FAVORITES_KEY));
  const [compareList, setCompareList] = useState(() => loadLocal(COMPARE_KEY));
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // генерируем ровно ITEMS_PER_PAGE * TOTAL_PAGES товаров
    const generate = () => {
      const needed = ITEMS_PER_PAGE * TOTAL_PAGES; // 80
      const items = [];
      const suffixes = ["Pro", "Plus", "Max", "2023", "S", "Lite", "SE", "Ultra", "Neo", "Mini"];
      let idx = 0;
      while (items.length < needed) {
        const base = BASE_TABLETS[idx % BASE_TABLETS.length];
        const repeat = Math.floor(idx / BASE_TABLETS.length);
        const id = `t${items.length + 1}`; // t1..t80
        const suffix = suffixes[items.length % suffixes.length];
        const title = `${base.title} ${suffix}`;
        // делаем небольшую вариацию цены
        const priceVariation = base.price + ((items.length % 5) * 10) + repeat * 5;
        const imageChoice = base.image;
        items.push({
          id,
          title,
          baseSlug: base.slug,
          category: "Планшеты",
          price: priceVariation,
          image: imageChoice,
          description: base.description + ` Модель версия ${suffix}.`,
          thumbnail: imageChoice
        });
        idx++;
      }
      return items;
    };

    setLoading(true);
    const products = generate();
    // небольшой таймаут для UX (можно убрать)
    setTimeout(() => {
      setAllProducts(products);
      setLoading(false);
    }, 250);
    // eslint-disable-next-line
  }, []);

  useEffect(() => { saveLocal(FAVORITES_KEY, favorites); }, [favorites]);
  useEffect(() => { saveLocal(COMPARE_KEY, compareList); }, [compareList]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = (text) => setToast(text);

  const isFav = (id) => favorites.some((p) => String(p.id) === String(id));
  const isCompared = (id) => compareList.some((p) => String(p.id) === String(id));

  const toggleFavorite = (product) => {
    const norm = normalizeProductForSave(product);
    if (isFav(product.id)) {
      setFavorites((prev) => prev.filter((p) => String(p.id) !== String(product.id)));
      showToast("Удалено из избранного");
    } else {
      setFavorites((prev) => [norm, ...prev]);
      showToast("Добавлено в избранное");
    }
  };

  const toggleCompare = (product) => {
    const norm = normalizeProductForSave(product);
    if (isCompared(product.id)) {
      setCompareList((prev) => prev.filter((p) => String(p.id) !== String(product.id)));
      showToast("Удалено из сравнения");
      return;
    }
    if (compareList.length >= 4) {
      showToast("Максимум 4 товара для сравнения");
      return;
    }
    setCompareList((prev) => [norm, ...prev]);
    showToast("Добавлено в сравнение");
  };

  const totalPages = TOTAL_PAGES;
  const currentProducts = allProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Планшеты</h1>

      {loading ? (
        <p className="text-center text-gray-500">Загрузка...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentProducts.map((product) => {
              const src = product.image || product.thumbnail || PLACEHOLDER;
              return (
                <div key={product.id} className="flex border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                  <img
                    src={src}
                    alt={product.title}
                    className="w-40 h-40 object-contain rounded-lg mr-6 flex-shrink-0 bg-white"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = PLACEHOLDER;
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                      <p className="text-gray-700 mb-4 line-clamp-3">{product.description}</p>
                      <div className="text-gray-800 font-semibold text-lg">{product.price} $</div>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => toggleFavorite(product)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                          isFav(product.id) ? "bg-red-100 border-red-200 text-red-600" : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        {isFav(product.id) ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-500" />}
                        <span className="text-sm">В избранное</span>
                      </button>

                      <button
                        onClick={() => toggleCompare(product)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                          isCompared(product.id) ? "bg-yellow-50 border-yellow-200 text-yellow-700" : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        <FaBalanceScale className="text-gray-600" />
                        <span className="text-sm">Сравнить</span>
                      </button>

                      <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="ml-auto bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg px-4 py-2 transition"
                      >
                        Перейти к товару
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Пагинация: рендерим страницы 1..8 */}
          <div className="flex justify-center items-center gap-3 mt-8 text-gray-600 flex-wrap">
            <button
              className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Назад
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  className={`px-3 py-1 rounded ${page === currentPage ? "bg-red-500 text-white" : "hover:bg-gray-200"}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}

            <button
              className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Вперед
            </button>
          </div>
        </>
      )}

      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-24 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
