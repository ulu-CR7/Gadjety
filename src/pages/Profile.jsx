import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const COUNTRIES = {
  Россия: ["Москва", "Санкт-Петербург", "Казань", "Екатеринбург"],
  Казахстан: ["Астана", "Алматы", "Шымкент"],
  Кыргызстан: ["Бишкек", "Ош", "Джалал-Абад"],
  Франция: ["Париж", "Марсель", "Лион"],
};

const Profile = () => {
  const navigate = useNavigate();

  // Загружаем сохранённые данные при запуске
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem("formData")) || { email: "", password: "" }
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [pushEnabled, setPushEnabled] = useState(
    localStorage.getItem("pushEnabled") === "true"
  );
  const [emailNotify, setEmailNotify] = useState(
    localStorage.getItem("emailNotify") === "true"
  );
  const [country, setCountry] = useState(localStorage.getItem("country") || "Россия");
  const [city, setCity] = useState(localStorage.getItem("city") || "Санкт-Петербург");

  // Сохраняем всё в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("userName", userName);
    localStorage.setItem("pushEnabled", pushEnabled);
    localStorage.setItem("emailNotify", emailNotify);
    localStorage.setItem("country", country);
    localStorage.setItem("city", city);
  }, [isLoggedIn, formData, userName, pushEnabled, emailNotify, country, city]);

  const [isLogin, setIsLogin] = useState(true);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      const nameFromEmail = formData.email.split("@")[0];
      setUserName(nameFromEmail);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("formData");
    localStorage.removeItem("userName");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col lg:flex-row">
          {/* Левая часть */}
          <div className="bg-red-500 text-white p-8 lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Вы ещё не с нами?</h2>
            <p className="text-base mb-6 leading-relaxed">
              Создайте аккаунт, чтобы получать уведомления об изменении цен и
              синхронизировать ваши товары на всех устройствах.
            </p>
            <button
              onClick={() => setIsLogin(false)}
              className="bg-white text-gray-900 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition"
            >
              Зарегистрироваться
            </button>
          </div>

          {/* Правая часть — форма */}
          <div className="bg-gray-50 lg:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Вход в аккаунт Behoof
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Электронная почта
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Пароль
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                  Войти
                </button>
                <button
                  type="button"
                  className="text-gray-600 text-sm hover:text-red-500"
                >
                  Восстановить пароль
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // === После входа ===
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {userName || "Пользователь"}
          </h1>
          <button
            onClick={() => {
              const newName = prompt("Введите новое имя:", userName);
              if (newName) setUserName(newName);
            }}
            className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg"
          >
            Изменить имя
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Настройки */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-5">Настройки</h3>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">
                Получать push уведомления
              </span>
              <button
                onClick={() => setPushEnabled(!pushEnabled)}
                className={`w-12 h-6 p-1 rounded-full ${
                  pushEnabled ? "bg-red-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full transform transition ${
                    pushEnabled ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">
                Получать уведомления на почту
              </span>
              <button
                onClick={() => setEmailNotify(!emailNotify)}
                className={`w-12 h-6 p-1 rounded-full ${
                  emailNotify ? "bg-red-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full transform transition ${
                    emailNotify ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>

            <div className="border-t mt-4 pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Страна:</span>
                <select
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setCity(COUNTRIES[e.target.value][0]);
                  }}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {Object.keys(COUNTRIES).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Город:</span>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {(COUNTRIES[country] || []).map((ct) => (
                    <option key={ct}>{ct}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Поддержка */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-5">Поддержка</h3>
            <p className="text-sm text-gray-600 mb-4">
              Есть вопросы? Напишите нам — мы с радостью поможем!
            </p>
            <button
              onClick={() => navigate("/support")}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg w-full md:w-auto"
            >
              Написать в поддержку
            </button>
          </div>

          {/* Аккаунт */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-5">Ваш аккаунт</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="border-b pb-2 cursor-pointer hover:text-red-500">
                Сбросить пароль
              </li>
              <li
                onClick={handleLogout}
                className="border-b pb-2 cursor-pointer hover:text-red-500"
              >
                Выйти
              </li>
              <li
                onClick={() => {
                  if (window.confirm("Удалить аккаунт?")) {
                    localStorage.clear();
                    setIsLoggedIn(false);
                  }
                }}
                className="text-red-500 cursor-pointer"
              >
                Удалить аккаунт
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
