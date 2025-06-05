// Pantalla principal
import React, { useContext, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import StepCounter from '../components/StepCounter';
import SyncButton from '../components/SyncButton';
import useAccelerometer from '../hooks/useAccelerometer';
import { simulateBleSync } from '../utils/bleSync';
import { UserContext } from '../navigation/AppNavigator';

const HomeScreen: React.FC = () => {
  const user = useContext(UserContext);
  const steps = useAccelerometer();
  const [loading, setLoading] = useState(false);

  const handleSync = async () => {
    setLoading(true);
    await simulateBleSync();
    setLoading(false);
    Alert.alert('Sincronización exitosa con el dispositivo BLE');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{user?.nombre}</Text>
      <Text style={styles.userAge}>{user?.edad} años</Text>
      <StepCounter steps={steps} />
      <SyncButton onPress={handleSync} loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 4,
  },
  userAge: {
    fontSize: 18,
    color: '#333',
    marginBottom: 24,
  },
});

export default HomeScreen;
