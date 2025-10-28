import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import TopSmartphones from "./pages/TopSmartphones";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Smartphones from "./pages/Smartphones";
import Notebooks from "./pages/Notebooks";
import Watches from "./pages/Watches";
import Consoles from "./pages/Consoles";
import Headphones from "./pages/Headphones";
import Speakers from "./pages/Speakers";
import Accessories from "./pages/Accessories";
import Tablets from "./pages/Tablets";
import Profile from "./pages/Profile";
import PrivacyPolicy from "./pages/Privacy";
import Favorites from "./pages/Favorites";
import Product from "./pages/Product";
import Compare from "./pages/Compare";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/top-smartphones" element={<TopSmartphones />} />
        <Route path="/smartphones" element={<Smartphones />} />
        <Route path="/notebooks" element={<Notebooks />} />
        <Route path="/tablets" element={<Tablets/>} />
        <Route path="/watches" element={<Watches />} />
        <Route path="/consoles" element={<Consoles />} />
        <Route path="/headphones" element={<Headphones />} />
        <Route path="/speakers" element={<Speakers />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/privacy" element={<PrivacyPolicy/>} />
        <Route path="/favorites" element={<Favorites/>} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
