// Componente para mostrar el número de pasos
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StepCounterProps {
  steps: number;
}

const StepCounter: React.FC<StepCounterProps> = ({ steps }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Pasos de hoy</Text>
    <Text style={styles.steps}>{steps} pasos</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
  steps: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
});

export default StepCounter;
