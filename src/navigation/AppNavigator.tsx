// Navegación entre pantallas usando React Navigation
import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import TipsScreen from '../screens/TipsScreen';

export const UserContext = createContext<any>(null);

const Tab = createBottomTabNavigator();

const homeIcon = require('../../assets/home.png');
const heartIcon = require('../../assets/Heart.png');

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2e7d32',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Inicio',
          tabBarIcon: () => (
            <Image
              source={homeIcon}
              style={{
                width: 28,
                height: 28,
                marginBottom: -2,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tips"
        component={TipsScreen}
        options={{
          title: 'Consejos de Salud',
          tabBarIcon: () => (
            <Image
              source={heartIcon}
              style={{
                width: 28,
                height: 28,
                marginBottom: -2,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<any>(null);

  if (!isLogged) {
    return (
      <NavigationContainer>
        <LoginScreen
          onLogin={userData => {
            setUser(userData);
            setIsLogged(true);
          }}
        />
      </NavigationContainer>
    );
  }

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default AppNavigator;
