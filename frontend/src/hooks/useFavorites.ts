import { useCallback, useEffect, useState } from 'react';
import { getJson, setJson } from '@/utils/storage';

const STORAGE_KEY = 'restaurant-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() =>
    getJson<string[]>(STORAGE_KEY, []),
  );

  useEffect(() => {
    setJson(STORAGE_KEY, favorites);
  }, [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  return { favorites, toggleFavorite, isFavorite };
};

