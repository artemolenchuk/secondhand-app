import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    saveFavorites();
  }, [favorites]);

  const saveFavorites = async () => {
    try {
      const json = JSON.stringify(favorites);
      await AsyncStorage.setItem('@favorites', json);
    } catch (e) {
      console.error('❌ Не вдалося зберегти обрані:', e);
    }
  };

  const loadFavorites = async () => {
    try {
      const json = await AsyncStorage.getItem('@favorites');
      if (json) setFavorites(JSON.parse(json));
    } catch (e) {
      console.error('❌ Не вдалося завантажити обрані:', e);
    }
  };

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id);
      return exists ? prev.filter((f) => f.id !== item.id) : [...prev, item];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);