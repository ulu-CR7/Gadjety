import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaBalanceScale } from "react-icons/fa";

const ITEMS_PER_PAGE = 10;
const TOTAL_PAGES = 8;
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

export default function Laptops() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => loadLocal(FAVORITES_KEY));
  const [compareList, setCompareList] = useState(() => loadLocal(COMPARE_KEY));
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    saveLocal(FAVORITES_KEY, favorites);
  }, [favorites]);

  useEffect(() => {
    saveLocal(COMPARE_KEY, compareList);
  }, [compareList]);

  const showToast = (text) => {
    setToast(text);
    setTimeout(() => setToast(null), 1600);
  };

  const isFav = (id) => favorites.some((p) => String(p.id) === String(id));
  const isCompared = (id) => compareList.some((p) => String(p.id) === String(id));

  const toggleFavorite = (product) => {
    const normalized = normalizeProductForSave(product);
    if (isFav(product.id)) {
      setFavorites((prev) => prev.filter((p) => String(p.id) !== String(product.id)));
      showToast("Удалено из избранного");
    } else {
      setFavorites((prev) => [normalized, ...prev]);
      showToast("Добавлено в избранное");
    }
  };

  const toggleCompare = (product) => {
    const normalized = normalizeProductForSave(product);
    if (isCompared(product.id)) {
      setCompareList((prev) => prev.filter((p) => String(p.id) !== String(product.id)));
      showToast("Удалено из сравнения");
      return;
    }
    if (compareList.length >= 4) {
      showToast("Максимум 4 товара для сравнения");
      return;
    }
    setCompareList((prev) => [normalized, ...prev]);
    showToast("Добавлено в сравнение");
  };

  function normalizeProductForSave(p) {
    const img =
      p.image ||
      p.thumbnail ||
      (Array.isArray(p.images) && p.images[0]) ||
      (p.raw && (p.raw.thumbnail || (Array.isArray(p.raw.images) && p.raw.images[0]))) ||
      "";
    return {
      id: String(p.id),
      title: p.title,
      category: p.category || "Ноутбуки",
      price: typeof p.price === "number" ? p.price : Number(p.price) || 0,
      image: img,
      raw: p,
    };
  }

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dummyjson.com/products/category/laptops?limit=20");
      const data = await res.json();
      const modelSuffixes = ["Pro", "Air", "MX", "Ultra", "2023", "S", "Plus", "Lite", "Max", "Neo"];

      let extended = [];
      let timesToRepeat = Math.ceil((ITEMS_PER_PAGE * TOTAL_PAGES) / data.products.length);

      for (let i = 0; i < timesToRepeat; i++) {
        data.products.forEach((p, idx) => {
          const baseNumeric = p.id + i * 1000 + idx; // numeric base
          const idStr = `p${baseNumeric}`; // <-- important: id with 'p' prefix
          const copyIndex = i * data.products.length + idx;
          const suffix = modelSuffixes[copyIndex % modelSuffixes.length];
          const newTitle = `${p.title} ${suffix}`;
          const imgs = Array.isArray(p.images) ? p.images : [];
          const img = imgs.length > 0 ? imgs[copyIndex % imgs.length] : p.thumbnail || "";
          extended.push({
            ...p,
            // keep original numeric id in raw, but set id as string with 'p' prefix
            id: idStr,
            _numericId: baseNumeric, // optional helper
            title: newTitle,
            images: imgs,
            image: img,
          });
        });
      }

      extended = extended.slice(0, ITEMS_PER_PAGE * TOTAL_PAGES);
      setAllProducts(extended);
    } catch (e) {
      console.error("Ошибка загрузки данных", e);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = TOTAL_PAGES;
  const currentProducts = allProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Ноутбуки</h1>

      {loading ? (
        <p className="text-center text-gray-500">Загрузка...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentProducts.map((product) => {
              const src =
                product.image ||
                (Array.isArray(product.images) && product.images[0]) ||
                product.thumbnail ||
                PLACEHOLDER;

              return (
                <div
                  key={product.id}
                  className="flex border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={src}
                    alt={product.title}
                    className="w-40 h-40 object-contain rounded-lg mr-6 bg-white"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = PLACEHOLDER;
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                      <p className="text-gray-700 mb-4 line-clamp-3">
                        {product.description}
                      </p>
                      <div className="text-gray-800 font-semibold text-lg">
                        {product.price} $
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3 items-center">
                      <button
                        onClick={() => toggleFavorite(product)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                          isFav(product.id)
                            ? "bg-red-100 border-red-200 text-red-600"
                            : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        {isFav(product.id) ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart className="text-gray-500" />
                        )}
                        <span className="text-sm">В избранное</span>
                      </button>

                      <button
                        onClick={() => toggleCompare(product)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                          isCompared(product.id)
                            ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                            : "bg-white hover:bg-gray-50"
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

          {/* Пагинация */}
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
                  className={`px-3 py-1 rounded ${
                    page === currentPage ? "bg-red-500 text-white" : "hover:bg-gray-200"
                  }`}
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
