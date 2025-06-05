// Componente para mostrar una lista de consejos de salud
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const tips = [
  'Mantén una hidratación adecuada todos los días.',
  'Realiza actividad física regularmente.',
  'Duerme al menos 7-8 horas cada noche.',
  'Lleva una alimentación balanceada.',
  'Evita el estrés y practica técnicas de relajación.',
];

const HealthTipsList: React.FC = () => (
  <FlatList
    data={tips}
    keyExtractor={(item, idx) => idx.toString()}
    renderItem={({ item }) => (
      <View style={styles.tipContainer}>
        <Text style={styles.tipText}>• {item}</Text>
      </View>
    )}
    contentContainerStyle={styles.list}
  />
);

const styles = StyleSheet.create({
  list: {
    padding: 24,
  },
  tipContainer: {
    marginBottom: 16,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 16,
  },
  tipText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HealthTipsList;
