import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import FavoriteButton from './FavoriteButton';
import { LinearGradient } from 'expo-linear-gradient';

// Функція для перекладу англійських назв днів на українські
const translateDayToUkrainian = (englishDay) => {
  switch (englishDay) {
    case 'Sunday': return 'Неділя';
    case 'Monday': return 'Понеділок';
    case 'Tuesday': return 'Вівторок';
    case 'Wednesday': return 'Середа';
    case 'Thursday': return 'Четвер';
    case 'Friday': return 'П\'ятниця';
    case 'Saturday': return 'Субота';
    default: return englishDay; // Залишити як є, якщо не знайдено
  }
};

export default function SecondhandCard({ item }) {
  return (
    <LinearGradient
      colors={['#FAFAFA', '#F0F0F0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Image source={item.photo} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.detailText}>Тип: {item.type}</Text>
        <Text style={styles.detailText}>Розклад: {item.schedule}</Text>
        {/* Застосовуємо функцію перекладу тут */}
        <Text style={styles.detailText}>Перший день: <Text style={styles.highlightText}>{translateDayToUkrainian(item.firstDay)}</Text></Text>
        <Text style={styles.detailText}>Останній день: <Text style={styles.highlightText}>{translateDayToUkrainian(item.lastDay)}</Text></Text>
      </View>
      <View style={styles.favoriteButtonContainer}>
        <FavoriteButton item={item} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 18,
    borderRadius: 18,
    borderWidth: 0,
    backgroundColor: '#FFFFFF',
    elevation: 10,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 20,
    color: '#212121',
    marginBottom: 8,
  },
  detailText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  highlightText: {
    fontFamily: 'Roboto_500Medium',
    color: '#E53935',
  },
  favoriteButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  }
});