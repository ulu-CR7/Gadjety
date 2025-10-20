// src/pages/Compare.jsx
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
  } catch {}
}

function safe(obj, path, fallback = "-") {
  // path как 'raw.specs.cores' or 'price'
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

  // подсчёт по категориям для табов (как в макете)
  const categories = Array.from(
    items.reduce((m, it) => m.set(it.category || "Без категории", (m.get(it.category || "Без категории") || 0) + 1), new Map())
  );

  return (
    <div className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок + кнопка очистки */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Сравнение товаров</h1>
          <button
            onClick={clearAll}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500"
          >
            <FaTrash /> Удалить все списки
          </button>
        </div>

        {/* Табсы категорий (если есть) */}
        {categories.length > 0 && (
          <div className="flex gap-3 mb-6 flex-wrap">
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

        {/* Список карточек вверху */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow">
          {items.length === 0 ? (
            <div className="py-12 text-center text-gray-500">У вас пока нет товаров для сравнения</div>
          ) : (
            <div className="flex gap-4 overflow-x-auto py-2">
              {items.map((p) => (
                <div key={p.id} className="w-56 bg-gray-50 rounded-lg p-3 flex-shrink-0 relative">
                  <button
                    onClick={() => removeOne(p.id)}
                    className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
                    title="Удалить"
                  >
                    <FaTrash />
                  </button>
                  <div className="h-36 bg-white rounded-md flex items-center justify-center mb-3 overflow-hidden">
                    <img
                      src={p.image || (p.raw && (p.raw.thumbnail || (Array.isArray(p.raw.images) && p.raw.images[0]))) || ""}
                      alt={p.title}
                      className="object-contain max-h-full"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='180'><rect width='100%' height='100%' fill='%23f3f4f6'/></svg>";
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">{p.category}</div>
                  <div className="font-semibold mt-1 line-clamp-2">{p.title}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="font-bold">{Number(p.price || 0).toLocaleString("ru-RU")} ₽</div>
                    <button className="text-red-500" title="Добавить в избранное">
                      <FaRegHeart />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Таблица сравнения */}
        {items.length > 0 && (
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-4">Сравнение товаров</h2>

            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse">
                <thead>
                  <tr>
                    <th className="w-48 text-left p-3"></th>
                    {items.map((p) => (
                      <th key={p.id} className="p-3 text-left border-l">
                        <div className="font-medium">{p.title}</div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {/* Рейтинг */}
                  <tr className="bg-gray-50">
                    <td className="p-3 font-semibold">Рейтинг</td>
                    {items.map((p) => (
                      <td key={p.id + "-rating"} className="p-3 border-l">
                        <div className="flex items-center gap-2">
                          {/* можно рендерить звезды, пока просто значение */}
                          <div className="text-yellow-400">★★★★☆</div>
                          <div className="text-sm text-gray-500"> {safe(p, "raw.rating", "4.2")}</div>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Модель */}
                  <tr>
                    <td className="p-3 font-semibold">Модель</td>
                    {items.map((p) => (
                      <td key={p.id + "-model"} className="p-3 border-l">
                        {safe(p, "raw.title", p.title)}
                      </td>
                    ))}
                  </tr>

                  {/* Год релиза */}
                  <tr className="bg-gray-50">
                    <td className="p-3 font-semibold">Год релиза</td>
                    {items.map((p) => (
                      <td key={p.id + "-year"} className="p-3 border-l">
                        {safe(p, "raw.year", safe(p, "raw.releaseYear", "-"))}
                      </td>
                    ))}
                  </tr>

                  {/* Количество ядер (пример) */}
                  <tr>
                    <td className="p-3 font-semibold">Количество ядер</td>
                    {items.map((p) => (
                      <td key={p.id + "-cores"} className="p-3 border-l">
                        {/* пробуем взять из raw.specs или raw.cpu, иначе "-" */}
                        {safe(p, "raw.specs.cores", safe(p, "raw.cores", safe(p, "raw.rawCores", "-")))}
                      </td>
                    ))}
                  </tr>

                  {/* Поддержка 4G (LTE) */}
                  <tr className="bg-gray-50">
                    <td className="p-3 font-semibold">Поддержка сетей 4G (LTE)</td>
                    {items.map((p) => {
                      const v = safe(p, "raw.lte", safe(p, "raw.features", "-"));
                      const yes = String(v).toLowerCase().includes("lte") || String(v) === "true" || String(v) === "yes" || String(v) === "1";
                      return (
                        <td key={p.id + "-lte"} className="p-3 border-l">
                          {yes ? <span className="text-green-600">✓</span> : <span className="text-red-500">✕</span>}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Объем встроенной памяти */}
                  <tr>
                    <td className="p-3 font-semibold">Объём встроенной памяти</td>
                    {items.map((p) => (
                      <td key={p.id + "-storage"} className="p-3 border-l">
                        {safe(p, "raw.storage", safe(p, "raw.specs.storage", safe(p, "raw.memory", "-")))}
                      </td>
                    ))}
                  </tr>

                  {/* Дополнительно: описание */}
                  <tr className="bg-gray-50">
                    <td className="p-3 font-semibold">Описание</td>
                    {items.map((p) => (
                      <td key={p.id + "-desc"} className="p-3 border-l text-sm text-gray-700">
                        {safe(p, "raw.description", p.raw?.description || "-")}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Пустой отступ */}
        <div className="h-8" />
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-24 bg-black text-white px-4 py-2 rounded-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
