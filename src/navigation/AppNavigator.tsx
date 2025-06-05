// Navegación entre pantallas usando React Navigation
import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import TipsScreen from '../screens/TipsScreen';

export const UserContext = createContext<any>(null);

const Tab = createBottomTabNavigator();

const homeIcon = require('../../assets/home.png');
const heartIcon = require('../../assets/Heart.png');
const PRIMARY = '#0a7ea4';

function MainTabs({ setUser, setIsLogged }: { setUser: any, setIsLogged: any }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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

  // Función para cerrar sesión
  const handleLogout = () => {
    setUser(null);
    setIsLogged(false);
  };

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
        <MainTabs setUser={setUser} setIsLogged={setIsLogged} />
        {/* Botón flotante de logout con icono */}
        <View style={{ position: 'absolute', top: 56, right: 24, zIndex: 10 }}>
          <Ionicons
            name="log-out-outline"
            size={32}
            color={PRIMARY}
            onPress={handleLogout}
            style={{ backgroundColor: 'transparent', borderRadius: 20, padding: 6 }}
            accessibilityLabel="Cerrar sesión"
          />
        </View>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default AppNavigator;
