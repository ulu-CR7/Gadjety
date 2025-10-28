import React, { useEffect, useState } from "react";
import { FaTrash, FaRegHeart } from "react-icons/fa";

const COMPARE_KEY = "behoof_compare_v1";

function readLocal(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveLocal(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch { }
}

function safe(obj, path, fallback = "-") {
  try {
    if (!obj) return fallback;
    const parts = path.split(".");
    let cur = obj;
    for (const p of parts) {
      cur = cur?.[p];
      if (cur === undefined) return fallback;
    }
    if (cur === null || cur === "") return fallback;
    return cur;
  } catch {
    return fallback;
  }
}

export default function Compare() {
  const [items, setItems] = useState(() => readLocal(COMPARE_KEY));
  const [toast, setToast] = useState(null);

  useEffect(() => {
    saveLocal(COMPARE_KEY, items);
  }, [items]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  const removeOne = (id) => {
    setItems((prev) => prev.filter((p) => String(p.id) !== String(id)));
    setToast("Товар удалён из сравнения");
  };

  const clearAll = () => {
    setItems([]);
    setToast("Сравнение очищено");
  };

  const categories = Array.from(
    items.reduce(
      (m, it) =>
        m.set(it.category || "Без категории", (m.get(it.category || "Без категории") || 0) + 1),
      new Map()
    )
  );

  return (
    <div className="min-h-screen pt-24 pb-24 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold">Сравнение товаров</h1>
          {items.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-red-500 transition"
            >
              <FaTrash /> Удалить все списки
            </button>
          )}
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 justify-center sm:justify-start">
            {categories.map(([cat, count]) => (
              <div
                key={cat}
                className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-medium"
              >
                {cat} {count > 1 ? count : ""}
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-lg p-3 sm:p-4 mb-6 shadow">
          {items.length === 0 ? (
            <div className="py-10 sm:py-12 text-center text-gray-500 text-sm sm:text-base">
              У вас пока нет товаров для сравнения
            </div>
          ) : (
            <div className="flex gap-3 sm:gap-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {items.map((p) => (
                <div
                  key={p.id}
                  className="w-48 sm:w-56 bg-gray-50 rounded-lg p-3 flex-shrink-0 relative hover:shadow-md transition"
                >
                  <button
                    onClick={() => removeOne(p.id)}
                    className="absolute right-2 top-2 text-gray-400 hover:text-red-500 transition"
                    title="Удалить"
                  >
                    <FaTrash />
                  </button>

                  <div className="h-32 sm:h-36 bg-white rounded-md flex items-center justify-center mb-3 overflow-hidden">
                    <img
                      src={
                        p.image ||
                        (p.raw &&
                          (p.raw.thumbnail ||
                            (Array.isArray(p.raw.images) && p.raw.images[0]))) ||
                        ""
                      }
                      alt={p.title}
                      className="object-contain max-h-full w-full"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='180'><rect width='100%' height='100%' fill='%23f3f4f6'/></svg>";
                      }}
                    />
                  </div>

                  <div className="text-xs text-gray-500 line-clamp-1">{p.category}</div>
                  <div className="font-semibold mt-1 text-sm sm:text-base line-clamp-2">{p.title}</div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="font-bold text-sm sm:text-base">
                      {Number(p.price || 0).toLocaleString("ru-RU")} ₽
                    </div>
                    <button className="text-red-500 hover:text-red-600" title="Добавить в избранное">
                      <FaRegHeart />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
              Таблица сравнения
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="border-b">
                    <th className="w-40 sm:w-48 text-left p-3"></th>
                    {items.map((p) => (
                      <th key={p.id} className="p-3 text-left border-l">
                        <div className="font-medium line-clamp-2">{p.title}</div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <tr className="bg-gray-50">
                    <td className="p-3 font-semibold">Рейтинг</td>
                    {items.map((p) => (
                      <td key={p.id + "-rating"} className="p-3 border-l">
                        <div className="flex items-center gap-2">
                          <div className="text-yellow-400 text-xs sm:text-base">★★★★☆</div>
                          <div className="text-gray-500 text-xs sm:text-sm">
                            {safe(p, "raw.rating", "4.2")}
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold">Модель</td>
                    {items.map((p) => (
                      <td key={p.id + "-model"} className="p-3 border-l">
                        {safe(p, "raw.title", p.title)}
                      </td>
                    ))}
                  </tr>

                  <tr className="bg-gray-50">
                    <td className="p-3 font-semibold">Год релиза</td>
                    {items.map((p) => (
                      <td key={p.id + "-year"} className="p-3 border-l">
                        {safe(p, "raw.year", safe(p, "raw.releaseYear", "-"))}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold">Количество ядер</td>
                    {items.map((p) => (
                      <td key={p.id + "-cores"} className="p-3 border-l">
                        {safe(
                          p,
                          "raw.specs.cores",
                          safe(p, "raw.cores", safe(p, "raw.rawCores", "-"))
                        )}
                      </td>
                    ))}
                  </tr>

                  <tr className="bg-gray-50">
                    <td className="p-3 font-semibold">Поддержка 4G (LTE)</td>
                    {items.map((p) => {
                      const v = safe(p, "raw.lte", safe(p, "raw.features", "-"));
                      const yes =
                        String(v).toLowerCase().includes("lte") ||
                        ["true", "yes", "1"].includes(String(v).toLowerCase());
                      return (
                        <td key={p.id + "-lte"} className="p-3 border-l text-center">
                          {yes ? (
                            <span className="text-green-600">✓</span>
                          ) : (
                            <span className="text-red-500">✕</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold">Объём памяти</td>
                    {items.map((p) => (
                      <td key={p.id + "-storage"} className="p-3 border-l">
                        {safe(
                          p,
                          "raw.storage",
                          safe(p, "raw.specs.storage", safe(p, "raw.memory", "-"))
                        )}
                      </td>
                    ))}
                  </tr>

                  <tr className="bg-gray-50">
                    <td className="p-3 font-semibold">Описание</td>
                    {items.map((p) => (
                      <td
                        key={p.id + "-desc"}
                        className="p-3 border-l text-xs sm:text-sm text-gray-700 leading-snug"
                      >
                        {safe(p, "raw.description", p.raw?.description || "-")}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="h-8" />
      </div>

      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-24 bg-black text-white text-sm sm:text-base px-4 py-2 rounded-lg z-50 shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
