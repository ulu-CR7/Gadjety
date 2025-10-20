// src/pages/Product.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaChartBar, FaStar } from "react-icons/fa";
import smartphone from "../assets/img/smartphone.png";
import laptop from "../assets/img/laptop.png";
import tablet from "../assets/img/tablet.png";
import watch from "../assets/img/watch.png";
import Pl from "../assets/img/PL.png";
import consoleImg from "../assets/img/consoleImg.png";
import headphones from "../assets/img/headphones.png";
import speaker from "../assets/img/speaker.png";
import accessories from "../assets/img/accessories.png";

const FAVORITES_KEY = "behoof_favorites_v1";
const COMPARE_KEY = "behoof_compare_v1";

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  "<svg xmlns='http://www.w3.org/2000/svg' width='480' height='360'>" +
  "<rect width='100%' height='100%' fill='%23f3f4f6'/>" +
  "<text x='50%' y='50%' fill='%23959eaa' font-size='18' text-anchor='middle' dominant-baseline='middle'>No image</text>" +
  "</svg>";

// --- Локальный набор продуктов (можно расширять) ---
const PRODUCTS = [
  { id: "p1", title: "Apple iPhone 13 Pro Max 256 ГБ — серый", category: "Смартфоны", price: 114099, image: smartphone, desc: "Флагманский смартфон: мощный процессор, тройная камера, OLED-дисплей. Поддерживает быструю и беспроводную зарядку.", features: ["5G", "OLED", "MagSafe"], specs: [{ key: "Камера", value: "48 MP (тройная) + LiDAR" }, { key: "Процессор", value: "A15 Bionic" }, { key: "Экран", value: '6.7" OLED, 120 Гц' }, { key: "Аккумулятор", value: "До 28 часов воспроизведения" }] },
  { id: "p2", title: "MacBook Pro 14\" (M1 Pro)", category: "Ноутбуки", price: 159990, image: Pl, desc: "Профессиональный ноутбук с M1 Pro, ярким Liquid Retina дисплеем и отличной автономностью для творческих задач.", features: ["M1 Pro", "Liquid Retina", "Thunderbolt"], specs: [{ key: "Процессор", value: "Apple M1 Pro" }, { key: "ОЗУ", value: "16 ГБ" }, { key: "SSD", value: "512 ГБ" }, { key: "Экран", value: '14" Liquid Retina' }] },
  { id: "p3", title: "Sony WH-1000XM5 — Наушники", category: "Наушники", price: 34990, image: headphones, desc: "Премиальные беспроводные наушники с топовым шумоподавлением, точной передачей звука и комфортной посадкой.", features: ["ANC", "Bluetooth 5.2"], specs: [{ key: "Тип", value: "Накладные" }, { key: "Время работы", value: "До 30 часов" }, { key: "Вес", value: "250 г" }] },
  { id: "p4", title: "JBL Charge 5 — Портативная колонка", category: "Портативные колонки", price: 12990, image: speaker, desc: "Мощная портативная колонка с водозащитой и функцией powerbank.", features: ["IPX7", "Powerbank"], specs: [{ key: "Мощность", value: "40 Вт" }, { key: "Время работы", value: "До 20 часов" }] },
  { id: "p5", title: "Dell 24\" Монитор", category: "Мониторы", price: 19990, image: laptop, desc: "24'' IPS монитор с хорошей цветопередачей для работы и игр.", features: ["IPS", "75Hz"], specs: [{ key: "Разрешение", value: "1920×1080" }, { key: "Частота", value: "75 Гц" }] },
  { id: "p6", title: "iPad Pro 11\"", category: "Планшеты", price: 89990, image: tablet, desc: "Планшет для творчества и работы — поддержка стилуса, отличная производительность.", features: ["Apple Pencil", "ProMotion"], specs: [{ key: "Процессор", value: "Apple M1" }, { key: "Экран", value: '11" Liquid Retina' }] },
  { id: "p7", title: "Apple Watch Series 9", category: "Умные часы", price: 39990, image: watch, desc: "Умные часы с мониторингом здоровья, GPS и улучшенной производительностью.", features: ["ECG", "GPS"], specs: [{ key: "Время работы", value: "До 18 часов" }, { key: "Защита", value: "WR50" }] },
  { id: "p8", title: "Power Bank 20000 mAh", category: "Аксессуары", price: 2490, image: accessories, desc: "Внешний аккумулятор большой ёмкости с быстрой зарядкой.", features: ["PD", "QC"], specs: [{ key: "Емкость", value: "20000 mAh" }, { key: "Выход", value: "PD 65W + USB-A" }] },
  { id: "p9", title: "PlayStation 5", category: "Игровые приставки", price: 49990, image: consoleImg, desc: "Консоль нового поколения с быстрым SSD и поддержкой 4K.", features: ["4K", "SSD"], specs: [{ key: "Хранение", value: "825 ГБ SSD" }, { key: "Контроллер", value: "DualSense" }] },
  { id: "p10", title: "Xiaomi Redmi Note 12", category: "Смартфоны", price: 21990, image: smartphone, desc: "Доступный смартфон с хорошей автономностью и большим экраном.", features: ["Large battery", "AMOLED"], specs: [{ key: "Камера", value: "108 MP" }, { key: "Аккумулятор", value: "5000 mAh" }] },
];

// --- utils localStorage ---
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

// --- rating stars ---
function Rating({ value = 4.2 }) {
  const full = Math.floor(value);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <FaStar key={i} className={i < full ? "text-yellow-400" : "text-gray-300"} />
    );
  }
  return <div className="flex items-center gap-1 text-sm">{stars}</div>;
}

// --- helper: fetch dummyjson product by numeric id ---
async function fetchDummyProductById(numId) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${numId}`);
    if (!res.ok) return null;
    const json = await res.json();
    return {
      id: String(json.id), // numeric id as string
      title: json.title,
      category: json.category || "Категория",
      price: json.price || 0,
      image: (json.images && json.images[0]) || null,
      desc: json.description || "",
      features: [],
      specs: [],
    };
  } catch {
    return null;
  }
}

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [favorites, setFavorites] = useState(() => readLocal(FAVORITES_KEY));
  const [compareList, setCompareList] = useState(() => readLocal(COMPARE_KEY));
  const [selectedColor, setSelectedColor] = useState("#8b5cf6");
  const [selectedMemory, setSelectedMemory] = useState("256 ГБ");
  const [toast, setToast] = useState(null);

  // load product: try local PRODUCTS first, then fallback to dummyjson numeric id
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    (async () => {
      let found = null;

      // 1) exact match (string compare) for local ids like "p2"
      found = PRODUCTS.find((p) => String(p.id) === String(id));

      // 2) if not found and id starts with 'p' — try searching by number after p
      if (!found && String(id).startsWith("p")) {
        const maybeNum = String(id).slice(1);
        // find either pNNN or numeric NNN stored as string
        found = PRODUCTS.find((p) => String(p.id) === `p${maybeNum}` || String(p.id) === String(maybeNum));
        // if still not found, try fetch dummyjson by numeric part
        if (!found && !Number.isNaN(Number(maybeNum))) {
          const fetched = await fetchDummyProductById(Number(maybeNum));
          if (fetched && mounted) {
            // keep numeric id as string — but allow the route pNNN to open it too
            setProduct(fetched);
            setLoading(false);
            return;
          }
        }
      }

      // 3) if not found yet and id is numeric string, fetch from dummyjson
      if (!found && !Number.isNaN(Number(id))) {
        const fetched = await fetchDummyProductById(Number(id));
        if (fetched && mounted) {
          setProduct(fetched);
          setLoading(false);
          return;
        }
      }

      // 4) if found local product
      if (found && mounted) {
        setProduct(found);
        setLoading(false);
        return;
      }

      // 5) nothing found
      if (mounted) {
        setProduct(null);
        setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [id]);

  // persist favorites & compare lists
  useEffect(() => { saveLocal(FAVORITES_KEY, favorites); }, [favorites]);
  useEffect(() => { saveLocal(COMPARE_KEY, compareList); }, [compareList]);

  const normalizedForSave = (p) => ({
    id: String(p.id),
    title: p.title,
    price: p.price || 0,
    category: p.category || "",
    image: p.image || (Array.isArray(p.images) && p.images[0]) || "",
  });

  const isFav = (pid) => favorites.some((f) => String(f.id) === String(pid));
  const isCompared = (pid) => compareList.some((c) => String(c.id) === String(pid));

  const setToastMessage = (text) => {
    setToast(text);
    setTimeout(() => setToast(null), 1400);
  };

  const toggleFav = (prod) => {
    const norm = normalizedForSave(prod);
    if (isFav(prod.id)) {
      setFavorites((prev) => prev.filter((p) => String(p.id) !== String(prod.id)));
      setToastMessage("Удалено из избранного");
    } else {
      setFavorites((prev) => [norm, ...prev]);
      setToastMessage("Добавлено в избранное");
    }
  };

  const toggleCompare = (prod) => {
    const norm = normalizedForSave(prod);
    if (isCompared(prod.id)) {
      setCompareList((prev) => prev.filter((p) => String(p.id) !== String(prod.id)));
      setToastMessage("Удалено из сравнения");
      return;
    }
    if (compareList.length >= 4) {
      setToastMessage("Максимум 4 товара для сравнения");
      return;
    }
    setCompareList((prev) => [norm, ...prev]);
    setToastMessage("Добавлено в сравнение");
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-24 flex items-center justify-center">
        <div className="text-gray-500">Загрузка товара...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-24 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Товар не найден</h2>
          <button onClick={() => navigate(-1)} className="text-red-500 underline">Вернуться назад</button>
        </div>
      </div>
    );
  }

  // offers (макет)
  const offers = [
    { id: "o1", shop: "Эльдорадо", price: Math.max(0, product.price - Math.round(product.price * 0.12)), freeDelivery: true },
    { id: "o2", shop: "Ситилинк", price: Math.max(0, product.price - Math.round(product.price * 0.03)), freeDelivery: false },
    { id: "o3", shop: "DNS", price: product.price, freeDelivery: true },
  ];

  const imgSrc = product.image || PLACEHOLDER;

  return (
    <div className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MAIN */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* IMAGE */}
              <div className="lg:w-1/2">
                <div className="bg-gray-50 rounded-lg h-[420px] flex items-center justify-center overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={product.title}
                    className="object-contain max-h-full"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = PLACEHOLDER;
                    }}
                  />
                </div>
              </div>

              {/* INFO */}
              <div className="lg:w-1/2">
                <div className="text-sm text-gray-500 mb-2">
                  Главная / {product.category} / {product.title}
                </div>

                <h1 className="text-2xl font-semibold mb-3">{product.title}</h1>

                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Оценка экспертов 4.4</span>
                  <Rating value={4.2} />
                  <span className="text-sm text-gray-500"> (447 отзывов)</span>
                </div>

                <p className="text-gray-700 mb-4">{product.desc}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(product.features || []).map((f, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-3 py-1 rounded">{f}</span>
                  ))}
                </div>

                <div className="bg-white border rounded-lg p-4 mb-4">
                  <h3 className="font-semibold mb-2">Характеристики</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                    {(product.specs || []).map((s, idx) => (
                      <div key={idx} className="flex justify-between">
                        <div className="text-gray-500">{s.key}</div>
                        <div className="font-medium">{s.value}</div>
                      </div>
                    ))}
                    {(!product.specs || product.specs.length === 0) && <div className="text-sm text-gray-500 col-span-full">Характеристики отсутствуют</div>}
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-sm text-gray-500">Цена от</div>
                      <div className="text-2xl font-bold">{Number(product.price).toLocaleString("ru-RU")} ₽</div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="text-xs text-gray-500">Цвет</div>
                      <div className="flex gap-2 items-center">
                        <button onClick={() => setSelectedColor("#111827")} className={`w-6 h-6 rounded-full border ${selectedColor === "#111827" ? "ring-2 ring-red-400" : ""}`} style={{ background: "#111827" }} />
                        <button onClick={() => setSelectedColor("#f97316")} className={`w-6 h-6 rounded-full border ${selectedColor === "#f97316" ? "ring-2 ring-red-400" : ""}`} style={{ background: "#f97316" }} />
                        <button onClick={() => setSelectedColor("#8b5cf6")} className={`w-6 h-6 rounded-full border ${selectedColor === "#8b5cf6" ? "ring-2 ring-red-400" : ""}`} style={{ background: "#8b5cf6" }} />
                        <button onClick={() => setSelectedColor("#ffffff")} className={`w-6 h-6 rounded-full border ${selectedColor === "#ffffff" ? "ring-2 ring-red-400" : ""}`} style={{ background: "#ffffff" }} />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-2">Память</div>
                    <div className="flex gap-2">
                      {["128 ГБ", "256 ГБ", "512 ГБ"].map((m) => (
                        <button key={m} onClick={() => setSelectedMemory(m)} className={`px-3 py-2 rounded-md border text-sm ${selectedMemory === m ? "bg-red-50 border-red-400" : "bg-white border-gray-200"}`}>
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => toggleCompare(product)} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md">
                      <FaChartBar /> Сравнить
                    </button>

                    <button onClick={() => toggleFav(product)} className={`flex items-center gap-2 border px-4 py-2 rounded-md ${isFav(product.id) ? "ring-1 ring-red-200" : ""}`}>
                      {isFav(product.id) ? <FaHeart className="text-red-500" /> : <FaRegHeart />} В избранное
                    </button>

                    <Link to={`/product/${product.id}`} className="ml-auto text-sm text-gray-600 underline">Открыть (текущая)</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* можно добавить расширенное описание / дополнительные секции */}
          </div>
        </div>

        {/* RIGHT */}
        <aside className="space-y-4">
          <div className="bg-white rounded-lg p-4 border">
            <h3 className="font-semibold mb-3">Предложения в магазинах</h3>
            <div className="grid grid-cols-1 gap-3">
              {offers.map((o) => (
                <div key={o.id} className="border rounded-lg p-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{o.shop}</div>
                    <div className="text-sm text-gray-500">{o.freeDelivery ? "Доставка: бесплатно" : "Доставка: платная"}</div>
                  </div>
                  <div className="text-xl font-bold">{o.price.toLocaleString("ru-RU")} ₽</div>
                  <div className="flex items-center gap-2">
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-sm text-red-500">Перейти в магазин →</a>
                    <div className="text-xs text-green-600 ml-auto">{o.price < product.price ? `-${Math.round(((product.price - o.price) / product.price) * 100)}%` : "+0%"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border">
            <h3 className="font-semibold mb-2">Отзывы</h3>
            <div className="text-sm text-gray-600">447 отзывов — средний рейтинг 4.2</div>
            <div className="mt-3">
              <Link to="/reviews" className="text-red-500 text-sm">К отзывам →</Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-32 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
