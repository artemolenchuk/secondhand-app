import React, { useState, useLayoutEffect, useRef } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Dimensions } from 'react-native';
import { secondhands } from '../data/secondhands';
import SecondhandCard from '../components/SecondhandCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { height: screenHeight } = Dimensions.get('window');

function getTodayName() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const daysOfWeekUa = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота', 'Неділя'];

export default function FirstDayScreen() {
  const navigation = useNavigation();
  const [selectedDay, setSelectedDay] = useState(getTodayName());
  const [tempSelectedDay, setTempSelectedDay] = useState(selectedDay);
  const [modalVisible, setModalVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

  const openModal = () => {
    setModalVisible(true);
    setTempSelectedDay(selectedDay);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const applyFilter = () => {
    setSelectedDay(tempSelectedDay);
    closeModal();
  };

  const resetFilter = () => {
    setSelectedDay(getTodayName());
    closeModal();
  };

  const filteredSecondhands = secondhands.filter(item => item.firstDay === selectedDay);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={openModal} style={{ marginRight: 15 }}>
          <Ionicons name="options-outline" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      ),
      headerTitle: `Перший день: ${daysOfWeekUa[daysOfWeek.indexOf(selectedDay)]}`,
    });
  }, [navigation, selectedDay]);

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
      {filteredSecondhands.length === 0 ? (
        <Text style={styles.emptyText}>
          {selectedDay === getTodayName()
            ? 'Сьогодні немає завозів. Заходьте завтра!'
            : `Немає завозів на ${daysOfWeekUa[daysOfWeek.indexOf(selectedDay)]}.`
          }
        </Text>
      ) : (
        <FlatList
          data={filteredSecondhands}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <SecondhandCard item={item} />}
          contentContainerStyle={styles.listContent}
        />
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closeModal}>
          <Animated.View
            style={[
              styles.bottomSheet,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.filterTitle}>Оберіть день:</Text>
            <View style={styles.daysContainer}>
              {daysOfWeek.map((day, index) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    tempSelectedDay === day && styles.dayButtonSelected,
                  ]}
                  onPress={() => setTempSelectedDay(day)}
                >
                  <Text
                    style={[
                      styles.dayButtonText,
                      tempSelectedDay === day && styles.dayButtonTextSelected,
                    ]}
                  >
                    {daysOfWeekUa[index]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.filterActions}>
              <TouchableOpacity style={styles.resetButton} onPress={resetFilter}>
                <Text style={styles.resetButtonText}>Скинути</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
                <Text style={styles.applyButtonText}>Застосувати</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
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
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    color: '#333333',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  filterTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 20,
    color: '#212121',
    marginBottom: 15,
    textAlign: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    margin: 5,
    backgroundColor: '#FAFAFA',
  },
  dayButtonSelected: {
    backgroundColor: '#FFB300',
    borderColor: '#FFB300',
  },
  dayButtonText: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 14,
    color: '#333333',
  },
  dayButtonTextSelected: {
    color: '#FFFFFF',
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#E53935',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  applyButtonText: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#B0BEC5',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  resetButtonText: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});