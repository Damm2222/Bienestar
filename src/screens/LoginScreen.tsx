import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

interface LoginScreenProps {
  onLogin: (user: { nombre: string; edad: string; altura: string; peso: string; enfermedad?: string }) => void;
}

const PRIMARY = '#0a7ea4';
const BACKGROUND = '#f6fcff';
const CARD = '#e3f6f5';
const INPUT_BG = '#f9f9f9';
const TEXT = '#222';

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [enfermedad, setEnfermedad] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleContinue = () => {
    if (nombre && edad && altura && peso) {
      onLogin({ nombre, edad, altura, peso, enfermedad });
      // Navegar a Home después del login
      // Si se usa tabs, cambiar la tab activa a Home
      // Usar navigation si está disponible
      if (typeof window !== 'undefined' && window.location) {
        // No hace nada en web
      } else {
        // En React Navigation, cambiar la tab activa
        // Esto se maneja en AppNavigator al cambiar isLogged
      }
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2500);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (cm)"
        value={altura}
        onChangeText={setAltura}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        value={peso}
        onChangeText={setPeso}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="¿Enfermedad? (opcional)"
        value={enfermedad}
        onChangeText={setEnfermedad}
      />
      {showAlert && (
        <Text style={styles.alert}>Por favor, completa todos los datos obligatorios.</Text>
      )}
      <View style={styles.button}>
        <Button title="Continuar" onPress={handleContinue} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: BACKGROUND,
    paddingTop: 56, // Unifica el padding superior con el resto de pantallas
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    color: PRIMARY,
    letterSpacing: 1.2,
  },
  input: {
    width: '100%',
    maxWidth: 350,
    borderWidth: 0,
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    fontSize: 17,
    backgroundColor: INPUT_BG,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
    color: TEXT,
  },
  button: {
    marginTop: 12,
    backgroundColor: 'transparent', // Fondo transparente para el botón
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 350,
  },
  alert: {
    color: '#d32f2f',
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
