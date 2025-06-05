// Pantalla de consejos de salud
import React from 'react';
import { View, StyleSheet } from 'react-native';
import HealthTipsList from '../components/HealthTipsList';

const TipsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <HealthTipsList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
  },
});

export default TipsScreen;
