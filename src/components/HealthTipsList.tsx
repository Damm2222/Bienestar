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

const PRIMARY = '#0a7ea4';
const BACKGROUND = '#f6fcff';
const CARD = '#e3f6f5';
const TEXT = '#222';

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
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    paddingTop: 24,
  },
  list: {
    padding: 24,
  },
  tipContainer: {
    marginBottom: 16,
    backgroundColor: CARD,
    borderRadius: 12,
    padding: 18,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  tipText: {
    fontSize: 17,
    color: TEXT,
  },
});

export default HealthTipsList;
