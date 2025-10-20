import React from "react";
import { Star } from "lucide-react";

// Импортируй свои картинки сюда
import img1 from "../assets/img/PoCO.png";
import img2 from "../assets/img/smartphone.png";
import img3 from "../assets/img/smartphone.png";
import img4 from "../assets/img/PoCO.png";
import img5 from "../assets/img/PoCO.png";
import img6 from "../assets/img/smartphone.png";
import img7 from "../assets/img/smartphone.png";
import img8 from "../assets/img/smartphone.png";
import img9 from "../assets/img/smartphone.png";
import img10 from "../assets/img/smartphone.png";

const smartphones = [
  {
    id: 1,
    name: "Infinix HOT 12 Pro",
    rating: 4.6,
    os: "Android 12, оболочка XOS",
    display: "6.8 дюйма, IPS, 1612 × 720, 90 Гц",
    img: img1,
  },
  {
    id: 2,
    name: "POCO C55",
    rating: 4.5,
    os: "Android 12, MIUI",
    display: "6.71 дюйма, IPS, 1650 × 720, 90 Гц",
    img: img2,
  },
  {
    id: 3,
    name: "TECNO Spark 10C",
    rating: 4.4,
    os: "Android 13, HiOS",
    display: "6.6 дюйма, IPS, 1612 × 720, 90 Гц",
    img: img3,
  },
  {
    id: 4,
    name: "Itel S23",
    rating: 4.3,
    os: "Android 12, Itel OS",
    display: "6.6 дюйма, IPS, 1600 × 720, 90 Гц",
    img: img4,
  },
  {
    id: 5,
    name: "Samsung Galaxy A04",
    rating: 4.5,
    os: "Android 12, One UI Core",
    display: "6.5 дюйма, PLS LCD, 1600 × 720",
    img: img5,
  },
  {
    id: 6,
    name: "Realme Narzo 50i",
    rating: 4.4,
    os: "Android 11, Realme UI Go",
    display: "6.5 дюйма, IPS, 1600 × 720",
    img: img6,
  },
  {
    id: 7,
    name: "Redmi A2+",
    rating: 4.6,
    os: "Android 13 Go, MIUI",
    display: "6.52 дюйма, IPS, 1600 × 720",
    img: img7,
  },
  {
    id: 8,
    name: "Blackview A52",
    rating: 4.2,
    os: "Android 12",
    display: "6.5 дюйма, IPS, 1600 × 720",
    img: img8,
  },
  {
    id: 9,
    name: "DOOGEE X97",
    rating: 4.3,
    os: "Android 12",
    display: "6.0 дюйма, IPS, 1440 × 720",
    img: img9,
  },
  {
    id: 10,
    name: "BQ 6631G Surf",
    rating: 4.1,
    os: "Android 11 Go",
    display: "6.5 дюйма, IPS, 1600 × 720",
    img: img10,
  },
];

const Top10Page = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">
      {/* Основной контент */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">
          Топ-10 смартфонов дешевле 10 тысяч рублей
        </h1>

        <img
          src={img1}
          alt="Главный смартфон"
          className="rounded-2xl w-full mb-8 object-cover"
        />

        <p className="text-gray-700 leading-relaxed mb-10">
          Несмотря на то, что смутные времена, начавшиеся чуть больше года
          назад, и не думают заканчиваться, ситуация на российском рынке
          смартфонов как будто даже устаканилась. Прошлая подборка бюджетных
          аппаратов была окружена грустным ореолом «хорошо, хоть какие-то
          смартфоны стоят меньше 10 тысяч», сейчас же выбор есть — и очень
          неплохой.
        </p>

        {/* Сетка карточек */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {smartphones.map((phone) => (
            <div
              key={phone.id}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition"
            >
              <img
                src={phone.img}
                alt={phone.name}
                className="rounded-lg mb-4 w-full h-52 object-cover"
              />
              <h3 className="text-lg font-semibold mb-2">{phone.name}</h3>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium text-gray-800">ОС:</span>{" "}
                {phone.os}
              </p>
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-medium text-gray-800">Дисплей:</span>{" "}
                {phone.display}
              </p>
              <div className="flex items-center text-yellow-500">
                <Star fill="currentColor" className="w-4 h-4 mr-1" />
                <span className="text-gray-800 font-medium">
                  {phone.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Сайдбар */}
      <aside className="lg:w-80 w-full">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sticky top-10">
          <h2 className="text-xl font-semibold mb-4">Топ-10 смартфонов</h2>
          <ul className="space-y-4">
            {smartphones.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <Star fill="currentColor" className="w-3 h-3 mr-1" />
                    {item.rating}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Top10Page;
