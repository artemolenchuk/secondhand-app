import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import SecondhandCard from '../components/SecondhandCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Додайте улюблені секонди, щоб бачити їх тут!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <SecondhandCard item={item} />}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    color: '#333333',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  listContent: {
    paddingVertical: 10,
    paddingBottom: 20,
  },
});