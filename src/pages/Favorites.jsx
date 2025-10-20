import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const FAVORITES_KEY = "behoof_favorites_v1";

// простой SVG-fallback (data-uri)
const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  "<svg xmlns='http://www.w3.org/2000/svg' width='480' height='360'>" +
  "<rect width='100%' height='100%' fill='%23f3f4f6'/>" +
  "<text x='50%' y='50%' fill='%23959eaa' font-size='18' text-anchor='middle' dominant-baseline='middle'>No image</text>" +
  "</svg>";

function loadFav() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveFav(list) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
  } catch {}
}

export default function Favorites() {
  const [favorites, setFavorites] = useState(() => loadFav());

  // Сохранение при изменениях
  useEffect(() => {
    saveFav(favorites);
  }, [favorites]);

  // Миграция старых записей: привести объекты к единому формату (выполнится один раз)
  useEffect(() => {
    let changed = false;
    const normalized = favorites.map((p) => {
      // если уже есть image — оставляем
      const img =
        p.image ||
        p.thumbnail ||
        (Array.isArray(p.images) && p.images[0]) ||
        (p.raw && (p.raw.image || p.raw.thumbnail || (p.raw.images && p.raw.images[0]))) ||
        "";
      // price может быть строкой — привести к числу или 0
      const price = typeof p.price === "number" ? p.price : Number(p.price) || 0;

      const norm = {
        id: p.id,
        title: p.title || (p.raw && p.raw.title) || "Товар",
        category: p.category || (p.raw && p.raw.category) || "",
        price,
        image: img,
        raw: p.raw || p, // сохраняем оригинал на всякий случай
      };

      // пометим изменение если что-то отсутствовало
      if (!p.image || typeof p.price !== "number") changed = true;
      return norm;
    });

    if (changed) {
      setFavorites(normalized);
      saveFav(normalized);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  const removeOne = (id) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">У вас пока нет избранных товаров</h2>
          <Link to="/" className="text-red-500 underline">Вернуться на главную</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Избранное</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {favorites.map((p) => {
            // безопасный источник изображения
            const src =
              p.image ||
              (p.raw && (p.raw.thumbnail || (Array.isArray(p.raw.images) && p.raw.images[0]))) ||
              PLACEHOLDER;

            const priceText =
              typeof p.price === "number" ? p.price.toLocaleString("ru-RU") + " ₽" : (p.price || "—");

            return (
              <div key={p.id} className="bg-white rounded-xl shadow p-4">
                <div className="h-36 flex items-center justify-center bg-gray-50 rounded-md mb-3 overflow-hidden">
                  <img
                    src={src}
                    alt={p.title}
                    className="object-contain h-full"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = PLACEHOLDER;
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500 mb-1">{p.category}</div>
                <div className="font-semibold mb-2">{p.title}</div>
                <div className="flex items-center justify-between">
                  <div className="font-bold">{priceText}</div>
                  <button onClick={() => removeOne(p.id)} className="text-red-500 flex items-center gap-2">
                    <FaHeart /> Удалить
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
