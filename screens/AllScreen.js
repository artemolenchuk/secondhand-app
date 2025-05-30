import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { secondhands } from '../data/secondhands';
import SecondhandCard from '../components/SecondhandCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AllScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
      <FlatList
        data={secondhands}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <SecondhandCard item={item} />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContent: {
    paddingVertical: 10,
    paddingBottom: 20,
  },
});