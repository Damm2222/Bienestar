// Animación de carga Lottie para transición Login -> Home
import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';

const LoadingLottie = () => (
  <View style={styles.container}>
    <LottieView
      source={require('../../assets/loading-health.json')}
      autoPlay
      loop
      style={{ width: 180, height: 180 }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaf6fb',
  },
});

export default LoadingLottie;
