// Navegación entre pantallas usando React Navigation
import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import TipsScreen from '../screens/TipsScreen';
import LoadingLottie from '../components/LoadingLottie';

export const UserContext = createContext<any>(null);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
        // Animación moderna al cambiar de tab (no se usa TransitionPresets en native-stack)
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
  const [loadingTransition, setLoadingTransition] = useState(false);

  // Función para cerrar sesión
  const handleLogout = () => {
    setLoadingTransition(true);
    setTimeout(() => {
      setUser(null);
      setIsLogged(false);
      setLoadingTransition(false);
    }, 1000); // 1 segundo de animación
  };

  // Función para manejar el login con animación de carga
  const handleLogin = (userData: any) => {
    setLoadingTransition(true);
    setTimeout(() => {
      setUser(userData);
      setIsLogged(true);
      setLoadingTransition(false);
    }, 1000); // 1 segundo de animación
  };

  if (loadingTransition) {
    return (
      <LoadingLottie />
    );
  }

  if (!isLogged) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right', // Animación slide moderna
          }}
        >
          <Stack.Screen name="Login">
            {() => (
              <LoginScreen
                onLogin={handleLogin}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right', // Animación slide también al ir a las tabs
          }}
        >
          <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
            {() => <MainTabs setUser={setUser} setIsLogged={setIsLogged} />}
          </Stack.Screen>
        </Stack.Navigator>
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
