import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

interface LoginScreenProps {
  onLogin: (user: { nombre: string; edad: string; altura: string; peso: string; enfermedad?: string }) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [enfermedad, setEnfermedad] = useState('');

  const handleContinue = () => {
    if (nombre && edad && altura && peso) {
      onLogin({ nombre, edad, altura, peso, enfermedad });
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
      <Button title="Continuar" onPress={handleContinue} disabled={!nombre || !edad || !altura || !peso} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#2e7d32',
  },
  input: {
    width: '100%',
    maxWidth: 350,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
});

export default LoginScreen;
