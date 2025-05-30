import React from 'react';
import { TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoriteButton({ item }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some(fav => fav.id === item.id);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isFavorite) {
      scaleValue.setValue(0.8);
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    } else {
      scaleValue.setValue(1);
    }
  }, [isFavorite]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.8,
        duration: 50,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start(() => toggleFavorite(item));
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={32}
          color={isFavorite ? '#E53935' : '#757575'}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
});