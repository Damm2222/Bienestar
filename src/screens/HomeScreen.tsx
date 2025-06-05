// Pantalla principal
import React, { useContext, useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import StepCounter from '../components/StepCounter';
import SyncButton from '../components/SyncButton';
import useAccelerometer from '../hooks/useAccelerometer';
import { simulateBleSync } from '../utils/bleSync';
import { UserContext } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

const PRIMARY = '#0a7ea4';
const SECONDARY = '#4fc3f7';
const BACKGROUND = '#f6fcff';
const CARD = '#e3f6f5';
const TEXT = '#222';

const HomeScreen: React.FC = () => {
  const user = useContext(UserContext);
  const steps = useAccelerometer();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSync = async () => {
    setLoading(true);
    await simulateBleSync();
    setLoading(false);
    Alert.alert('Sincronización exitosa con el dispositivo BLE');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.greeting}>¡Hola, {user?.nombre}!</Text>
        <Text style={styles.subGreeting}>Edad: {user?.edad} años</Text>
      </View>
      <View style={styles.cardBox}>
        <StepCounter steps={steps} />
        <SyncButton onPress={handleSync} loading={loading} />
        <TouchableOpacity style={styles.tipsButton} onPress={() => navigation.navigate('Tips' as never)}>
          <Text style={styles.tipsButtonText}>Ver Consejos de Salud</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.motivationBox}>
        <Text style={styles.motivationTitle}>¡Sigue moviéndote!</Text>
        <Text style={styles.motivationText}>Recuerda que cada paso cuenta para tu bienestar. ¡Tú puedes lograrlo!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: BACKGROUND,
    padding: 24,
    paddingTop: 56, // Aumenta el espacio superior para centrar mejor el contenido
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 18,
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 18,
    width: '100%',
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: PRIMARY,
    marginBottom: 2,
    letterSpacing: 1.1,
  },
  subGreeting: {
    fontSize: 16,
    color: SECONDARY,
    marginBottom: 2,
  },
  cardBox: {
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 18,
    width: '100%',
    alignItems: 'center',
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 18,
  },
  tipsButton: {
    marginTop: 18,
    backgroundColor: PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  tipsButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  motivationBox: {
    marginTop: 18,
    backgroundColor: SECONDARY,
    borderRadius: 16,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  motivationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  motivationText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
  },
});

export default HomeScreen;
