import { useEffect, useState } from "react";
import { getProducts } from "../api/mockBackend"; // путь поправь если нужно

export const useFetchProducts = (limit = 0) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getProducts(limit); // вызывает функцию из mockBackend
        if (mounted) setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Ошибка получения товаров:", err);
        if (mounted) setError(err.message || "error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [limit]);

  return { products, loading, error };
};
