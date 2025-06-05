// Componente para el botón de sincronización
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface SyncButtonProps {
  onPress: () => void;
  loading: boolean;
}

const SyncButton: React.FC<SyncButtonProps> = ({ onPress, loading }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} disabled={loading}>
    {loading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text style={styles.text}>Sincronizar dispositivo</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1976d2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SyncButton;
