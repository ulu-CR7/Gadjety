import React, { useState } from "react";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("definitions");

  const sections = [
    { id: "definitions", title: "Определение понятий" },
    { id: "scope", title: "Отношения, на которые распространяется политика" },
    { id: "dataCollection", title: "Перечень собираемых персональных данных" },
    { id: "rights", title: "Права пользователя" },
    { id: "security", title: "Меры по защите данных" },
    { id: "contact", title: "Контактная информация" },
  ];

  const content = {
    definitions: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Определение понятий</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          В рамках настоящей Политики под «Мобильным приложением» и «Веб-сайтом» понимаются программные продукты, принадлежащие компании <strong>Behoof</strong>, обеспечивающие доступ к услугам и товарам через интернет.
        </p>
        <p className="text-gray-700 leading-relaxed">
          «Пользователь» — физическое лицо, использующее сайт или приложение для получения информации, оформления заказов или взаимодействия с сервисами компании.
        </p>
      </div>
    ),
    scope: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Отношения, на которые распространяется политика</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Данная Политика применяется ко всем процессам обработки персональных данных, осуществляемым при использовании сайта, мобильного приложения и связанных сервисов компании.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Настоящая Политика действует в отношении всех Пользователей, независимо от того, прошли ли они регистрацию на платформе или нет.
        </p>
      </div>
    ),
    dataCollection: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Перечень собираемых персональных данных</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Мы собираем только те данные, которые необходимы для предоставления качественного сервиса и исполнения наших обязательств перед пользователями.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Имя, фамилия и отчество пользователя;</li>
          <li>Контактные данные (номер телефона, адрес электронной почты);</li>
          <li>Адрес доставки товаров;</li>
          <li>История заказов и взаимодействий с платформой;</li>
          <li>IP-адрес, данные об устройстве и браузере;</li>
          <li>Файлы cookie, данные аналитики и геолокации (при согласии пользователя);</li>
        </ul>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Вся информация используется исключительно для обработки заказов, улучшения пользовательского опыта и соблюдения требований законодательства.
        </p>
      </div>
    ),
    rights: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Права пользователя</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Пользователь имеет право:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Запрашивать доступ к своим персональным данным;</li>
          <li>Требовать исправления, обновления или удаления данных;</li>
          <li>Отозвать согласие на обработку данных;</li>
          <li>Подать жалобу в уполномоченные органы по защите персональных данных.</li>
        </ul>
      </div>
    ),
    security: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Меры по защите данных</h2>
        <p className="text-gray-700 leading-relaxed">
          Мы применяем современные технические и организационные меры безопасности для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.  
          К таким мерам относятся шифрование данных, ограничение доступа сотрудников и регулярный аудит систем безопасности.
        </p>
      </div>
    ),
    contact: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Контактная информация</h2>
        <p className="text-gray-700 leading-relaxed">
          Если у вас возникли вопросы по поводу настоящей Политики конфиденциальности или обработки данных, вы можете связаться с нами:
        </p>
        <p className="text-gray-700 mt-3">
          Электронная почта: <a href="mailto:support@behoof.kg" className="text-blue-600 hover:underline">support@behoof.kg</a><br/>
          Телефон: +996 (700) 123-456<br/>
          Адрес: г. Бишкек, ул. Абдрахманова, 123
        </p>
      </div>
    ),
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
      {/* Левое меню */}
      <aside className="md:w-1/3 lg:w-1/4 bg-gray-50 border border-gray-100 rounded-xl p-4 h-fit">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Оглавление</h3>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li
              key={section.id}
              className={`cursor-pointer px-3 py-2 rounded-md text-sm transition ${
                activeSection === section.id
                  ? "bg-red-100 text-red-600 font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Контент */}
      <main className="flex-1">{content[activeSection]}</main>
    </div>
  );
};

export default PrivacyPolicy;
