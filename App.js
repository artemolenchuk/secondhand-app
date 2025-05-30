import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FavoritesProvider } from './context/FavoritesContext';
import AllScreen from './screens/AllScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import FirstDayScreen from './screens/FirstDayScreen';
import LastDayScreen from './screens/LastDayScreen';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Перший день') {
                  iconName = focused ? 'calendar' : 'calendar-outline';
                } else if (route.name === 'Останній день') {
                  iconName = focused ? 'alert-circle' : 'alert-circle-outline';
                } else if (route.name === 'Усі') {
                  iconName = focused ? 'list' : 'list-outline';
                } else if (route.name === 'Обрані') {
                  iconName = focused ? 'heart' : 'heart-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#FFB300',
              tabBarInactiveTintColor: '#212121',
              tabBarStyle: {
                backgroundColor: '#F5F5F5',
                borderTopWidth: 0,
                elevation: 15,
                shadowColor: '#333',
                shadowOffset: { width: 0, height: -5 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                height: Platform.OS === 'ios' ? 90 : 70,
                paddingBottom: Platform.OS === 'ios' ? 30 : 10,
              },
              tabBarLabelStyle: {
                fontFamily: 'Roboto_500Medium',
                fontSize: 12,
                color: '#212121',
              },
              headerStyle: {
                backgroundColor: '#E53935',
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontFamily: 'Roboto_700Bold',
                fontSize: 22,
              },
            })}
          >
            <Tab.Screen name="Перший день" component={FirstDayScreen} />
            <Tab.Screen name="Останній день" component={LastDayScreen} />
            <Tab.Screen name="Усі" component={AllScreen} />
            <Tab.Screen name="Обрані" component={FavoritesScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}