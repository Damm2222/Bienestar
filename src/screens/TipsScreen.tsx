// Pantalla de consejos de salud
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import HealthTipsList from '../components/HealthTipsList';

const PRIMARY = '#0a7ea4';
const SECONDARY = '#4fc3f7';
const BACKGROUND = '#f6fcff';
const CARD = '#e3f6f5';
const TITLE = '#0a7ea4';
const BORDER = '#b3e5fc';

const tipsTitle = 'Consejos para tu bienestar';

const TipsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBox}>
        <Text style={styles.title}>{tipsTitle}</Text>
        <Text style={styles.subtitle}>Mejora tu salud con pequeños hábitos diarios</Text>
      </View>
      <View style={styles.cardBox}>
        <HealthTipsList />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
    paddingTop: 56, // Unifica el padding superior con HomeScreen
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 18,
    backgroundColor: CARD,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingTop: 36,
    paddingBottom: 22,
    paddingHorizontal: 24,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderBottomWidth: 2,
    borderColor: BORDER,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: TITLE,
    marginBottom: 6,
    letterSpacing: 1.1,
  },
  subtitle: {
    fontSize: 16,
    color: SECONDARY,
    marginBottom: 2,
    textAlign: 'center',
  },
  cardBox: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 12,
  },
});

export default TipsScreen;
