import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20 bg-white text-center px-4 mb-30">
      <h1 className="text-6xl font-bold text-black mb-4">Упс...</h1>
      <p className="text-xl text-gray-700 mb-2">Страница не найдена</p>
      <p className="text-gray-500 mb-8">
        Тут что-то упало и это не страшно! <br />
        Но мы все сохранили ;)
      </p>
      <button
        onClick={handleGoHome}
        className="bg-red-500 hover:bg-red-600 text-white text-lg px-6 py-3 rounded-lg transition"
      >
        Перейти на главную
      </button>
    </div>
  );
};

export default NotFound;
