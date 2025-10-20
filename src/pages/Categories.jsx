import React from "react";

const CategoriesPage = () => {
  const categories = [
    {
      title: "Электроника",
      icon: "💻",
      sections: [
        {
          title: "Смартфоны и гаджеты",
          items: [
            { name: "Все смартфоны" },
            { name: "Apple", badge: "Новое" },
            { name: "Xiaomi" },
            { name: "Samsung" },
            { name: "HONOR" },
          ],
        },
        {
          title: "Ноутбуки и планшеты",
          items: [
            { name: "Все ноутбуки" },
            { name: "Apple MacBook" },
            { name: "ASUS" },
            { name: "Acer" },
            { name: "Lenovo" },
          ],
        },
        {
          title: "Игровые устройства",
          items: [
            { name: "Все консоли" },
            { name: "PlayStation" },
            { name: "Xbox" },
            { name: "Nintendo" },
            { name: "Steam Deck" },
          ],
        },
      ],
    },
    {
      title: "Бытовая техника",
      icon: "🏠",
      sections: [
        {
          title: "Для кухни",
          items: [
            { name: "Холодильники" },
            { name: "Микроволновки" },
            { name: "Плиты" },
            { name: "Блендеры" },
            { name: "Чайники" },
          ],
        },
        {
          title: "Для дома",
          items: [
            { name: "Пылесосы" },
            { name: "Утюги" },
            { name: "Стиральные машины" },
            { name: "Обогреватели" },
            { name: "Увлажнители" },
          ],
        },
        {
          title: "Аксессуары и мелочи",
          items: [
            { name: "Удлинители" },
            { name: "Фильтры" },
            { name: "Батарейки" },
            { name: "Кабели" },
            { name: "Лампочки" },
          ],
        },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Заголовок */}
      <h1 className="text-3xl font-bold text-gray-900 mb-10">Категории</h1>

      {/* Секции */}
      {categories.map((cat, index) => (
        <div key={index} className="mb-12">
          {/* Заголовок категории */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-2xl">{cat.icon}</span>
            <h2 className="text-xl font-semibold text-gray-800">
              {cat.title}
            </h2>
          </div>

          {/* Сетка карточек */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.sections.map((section, sIndex) => (
              <div
                key={sIndex}
                className="bg-gray-50 border border-gray-100 rounded-xl p-6 hover:shadow-md transition"
              >
                <h4 className="text-sm font-medium text-gray-800 mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {section.items.map((item, iIndex) => (
                    <li
                      key={iIndex}
                      className="flex items-center justify-between hover:text-red-500 cursor-pointer"
                    >
                      {item.name}
                      {item.badge && (
                        <span className="text-green-500 text-xs font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesPage;
