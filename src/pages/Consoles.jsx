import React, { useState, useEffect } from 'react';

const ITEMS_PER_PAGE = 10;
const TOTAL_PAGES = 8;

export default function GamingConsoles() {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    generateMockProducts();
  }, []);

  const generateMockProducts = () => {
    const consoles = [
      {
        title: 'PlayStation 5',
        image: 'https://cdn.vox-cdn.com/thumbor/zVuEaflztp14YTsfzPukB5gfIYo=/0x0:2040x1360/1200x800/filters:focal(857x518:1183x844)/cdn.vox-cdn.com/uploads/chorus_image/image/69175264/akrales_201027_4262_0142.0.jpg',
      },
      {
        title: 'Xbox Series X',
        image: 'https://cdn.mos.cms.futurecdn.net/kJQ3DxGUncoVoIYHYvGS3a.jpg',
      },
      {
        title: 'Nintendo Switch OLED',
        image: 'https://www.nintendo.com/eu/media/images/10_share_images/systems_11/nintendo_switch_oled_model_1/H2x1_NSwitch_OLED_hardware_image1600w.jpg',
      },
      {
        title: 'PlayStation 4 Pro',
        image: 'https://static.bhphoto.com/images/images500x500/1573056967_1519280.jpg',
      },
      {
        title: 'Xbox Series S',
        image: 'https://m.media-amazon.com/images/I/61chL1zZP0L.jpg',
      },
      {
        title: 'Nintendo Switch Lite',
        image: 'https://m.media-amazon.com/images/I/71qis7f1HgL.jpg',
      }
    ];

    const products = Array.from({ length: ITEMS_PER_PAGE * TOTAL_PAGES }, (_, i) => {
      const console = consoles[i % consoles.length];
      return {
        id: i + 1,
        title: `${console.title} #${i + 1}`,
        description: 'Консоль нового поколения с высокой производительностью.',
        price: 399 + (i % 5) * 50,
        images: [console.image],
      };
    });

    setAllProducts(products);
  };

  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);

  const currentProducts = allProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Игровые приставки</h1>

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
                onClick={() => alert(`Переход к товару ${product.title}`)}
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
    </div>
  );
}