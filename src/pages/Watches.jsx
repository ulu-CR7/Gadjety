import React, { useState, useEffect } from 'react';

const ITEMS_PER_PAGE = 10;
const TOTAL_PAGES = 8; // 8 страниц по 10 товаров

export default function Smartwatches() {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      // В dummyjson нет "smartwatches", берем "watches"
      const res = await fetch('https://dummyjson.com/products/category/watches?limit=20');
      const data = await res.json();

      // Расширяем список до 80 товаров
      let extended = [];
      let timesToRepeat = Math.ceil((ITEMS_PER_PAGE * TOTAL_PAGES) / data.products.length);
      for (let i = 0; i < timesToRepeat; i++) {
        extended = extended.concat(
          data.products.map(p => ({
            ...p,
            id: p.id + i * 1000,
            title: p.title + (i > 0 ? ` ${i}` : ''),
          }))
        );
      }
      extended = extended.slice(0, ITEMS_PER_PAGE * TOTAL_PAGES);

      setAllProducts(extended);
    } catch (e) {
      console.error('Ошибка загрузки данных', e);
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
      <h1 className="text-3xl font-bold mb-6 text-center">Умные часы</h1>

      {loading ? (
        <p className="text-center text-gray-500">Загрузка...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentProducts.map(product => (
              <div key={product.id} className="flex border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-40 h-40 object-cover rounded-lg mr-6"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <div className="text-gray-800 font-semibold text-lg">{product.price} $</div>
                  </div>
                  <button
                    onClick={() => window.open(`https://dummyjson.com/products/${product.id}`, '_blank')}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white rounded py-2 px-4 transition w-full"
                  >
                    Перейти к товару
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Пагинация */}
          <div className="flex justify-center items-center gap-3 mt-8 text-gray-600 flex-wrap">
            <button
              className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
                    page === currentPage ? 'bg-red-500 text-white' : 'hover:bg-gray-200'
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}

            <button
              className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Вперед
            </button>
          </div>
        </>
      )}
    </div>
  );
}
