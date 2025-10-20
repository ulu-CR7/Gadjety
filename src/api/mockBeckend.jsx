// src/api/mockBackend.js
const DB = {
  categories: [
    { id: "phones", name: "Смартфоны" },
    { id: "laptops", name: "Ноутбуки" },
    { id: "tablets", name: "Планшеты" },
    { id: "watches", name: "Умные часы" },
    { id: "consoles", name: "Игровые приставки" },
  ],
  brands: {
    phones: [
      { id: "apple", name: "Apple" },
      { id: "xiaomi", name: "Xiaomi" },
      { id: "samsung", name: "Samsung" },
      { id: "honor", name: "HONOR" },
      { id: "poco", name: "POCO" }
    ],
    laptops: [
      { id: "dell", name: "Dell" },
      { id: "hp", name: "HP" },
      { id: "lenovo", name: "Lenovo" },
    ],
    tablets: [
      { id: "apple", name: "Apple" },
      { id: "samsung", name: "Samsung" },
    ],
    watches: [
      { id: "xiaomi", name: "Xiaomi" },
      { id: "apple", name: "Apple" },
    ],
    consoles: [
      { id: "sony", name: "Sony" },
      { id: "microsoft", name: "Xbox" },
      { id: "nintendo", name: "Nintendo" },
    ],
  },
  models: {
    phones: {
      apple: [
        { id: "iphone-15", name: "iPhone 15" },
        { id: "iphone-15-pro", name: "iPhone 15 Pro" },
        { id: "iphone-14", name: "iPhone 14" },
        { id: "iphone-13", name: "iPhone 13" }
      ],
      xiaomi: [
        { id: "mi-13", name: "Xiaomi 13" },
        { id: "mi-12", name: "Xiaomi 12" }
      ],
      samsung: [
        { id: "s24", name: "Samsung S24" },
        { id: "s23", name: "Samsung S23" }
      ],
      honor: [
        { id: "honor-90", name: "HONOR 90" }
      ],
      poco: [
        { id: "poco-x6", name: "POCO X6" }
      ]
    },
    laptops: {
      dell: [{ id: "dell-xps-13", name: "Dell XPS 13" }],
      hp: [{ id: "hp-spectre", name: "HP Spectre" }],
      lenovo: [{ id: "lenovo-thinkpad", name: "Lenovo ThinkPad" }]
    },
    tablets: {
      apple: [{ id: "ipad-pro", name: "iPad Pro" }],
      samsung: [{ id: "galaxy-tab", name: "Samsung Galaxy Tab" }]
    },
    watches: {
      xiaomi: [{ id: "mi-band-7", name: "Xiaomi Mi Band 7" }],
      apple: [{ id: "apple-watch-9", name: "Apple Watch Series 9" }]
    },
    consoles: {
      sony: [{ id: "ps5", name: "PlayStation 5" }],
      microsoft: [{ id: "xbox-series-x", name: "Xbox Series X" }],
      nintendo: [{ id: "switch", name: "Nintendo Switch" }]
    }
  }
};

// утилита — имитировать network delay
const wait = (ms = 300) => new Promise(res => setTimeout(res, ms));

export async function getCategories() {
  await wait(150);
  return DB.categories;
}

export async function getBrands(categoryId) {
  await wait(200);
  return DB.brands[categoryId] || [];
}

export async function getModels(categoryId, brandId) {
  await wait(200);
  const cat = DB.models[categoryId] || {};
  return cat[brandId] || [];
}

