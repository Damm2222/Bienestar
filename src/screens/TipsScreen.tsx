// Pantalla de consejos de salud
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../navigation/AppNavigator';

const PRIMARY = '#0a7ea4';
const SECONDARY = '#4fc3f7';
const BACKGROUND = '#f6fcff';
const CARD = '#e3f6f5';
const TITLE = '#0a7ea4';
const BORDER = '#b3e5fc';
const TEXT = '#222';

const defaultTips = [
  'Haz al menos 30 minutos de ejercicio al día.',
  'Bebe 2 litros de agua diariamente.',
  'Duerme entre 7 y 8 horas cada noche.',
  'Realiza ejercicios de respiración o meditación.',
  'Evita el exceso de pantallas antes de dormir.',
  'Mantén contacto regular con amigos o familia.',
  'Lleva una dieta equilibrada y rica en frutas y verduras.',
  'Tómate pausas durante el trabajo para estirarte o caminar.',
  'Escribe un diario con tus emociones.',
  'No temas pedir ayuda profesional si sientes ansiedad o tristeza prolongada.'
];

async function getApiKey() {
  // Intenta obtener la API key desde el .env usando process.env
  return process.env.EXPO_PUBLIC_OPENAI_KEY || '';
}

const TipsScreen: React.FC = () => {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [tips, setTips] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getHealthTips = async () => {
      setLoading(true);
      setError('');
      let apiKey = await getApiKey();
      if (!apiKey) {
        setError('No se encontró la API key. Mostrando consejos por defecto.');
        setTips(defaultTips);
        setLoading(false);
        return;
      }
      try {
        const prompt = `Dame 5 consejos de salud física y mental personalizados para una persona llamada ${user?.nombre || 'Usuario'}, de ${user?.edad || '30'} años, con una estatura de ${user?.altura || '170'} cm${user?.enfermedad ? ` y que padece ${user.enfermedad}` : ''}.`;
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
          }),
        });
        const raw = await response.text();
        const data = JSON.parse(raw);
        const content = data.choices?.[0]?.message?.content || '';
        let splitTips: string[] = [];
        if (content.includes('\n')) {
          splitTips = content
            .split(/\n|\d+\.|- /)
            .map((t: string) => t.trim())
            .filter((t: string) => t.length > 2);
        } else {
          splitTips = content
            .split('.')
            .map((t: string) => t.trim())
            .filter((t: string) => t.length > 2);
        }
        setTips(splitTips.length ? splitTips : defaultTips);
      } catch (err: any) {
        setError('No se pudo conectar con el servicio de IA. Mostrando consejos por defecto.');
        setTips(defaultTips);
      } finally {
        setLoading(false);
      }
    };
    getHealthTips();
  }, [user]);

  return (
    <ScrollView contentContainerStyle={styles.safeArea}>
      <View style={styles.headerBox}>
        <Ionicons name="heart-circle" size={48} color={PRIMARY} style={{ marginBottom: 8 }} />
        <Text style={styles.title}>Consejos de Salud</Text>
        <Text style={styles.subtitle}>
          Usuario: <Text style={styles.user}>{user?.nombre || 'Usuario'}</Text> | Edad: <Text style={styles.user}>{user?.edad || 'N/A'}</Text>
        </Text>
      </View>
      <View style={styles.cardBox}>
        {loading ? (
          <ActivityIndicator size="large" color={PRIMARY} style={{ marginTop: 20 }} />
        ) : error ? (
          <>
            <Text style={[styles.text, { color: 'red', marginVertical: 10 }]}>{error}</Text>
            {tips.map((tip, idx) => (
              <View key={idx} style={styles.tipCard}>
                <Ionicons name="leaf" size={20} color={PRIMARY} style={{ marginRight: 8 }} />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </>
        ) : (
          tips.map((tip, idx) => (
            <View key={idx} style={styles.tipCard}>
              <Ionicons name="leaf" size={20} color={PRIMARY} style={{ marginRight: 8 }} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: BACKGROUND,
    alignItems: 'center',
    padding: 24,
    paddingTop: 56,
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 24,
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: PRIMARY,
    marginBottom: 4,
    letterSpacing: 1.2,
  },
  subtitle: {
    fontSize: 16,
    color: '#3a3a3a',
    marginBottom: 2,
  },
  user: {
    color: PRIMARY,
    fontWeight: 'bold',
  },
  cardBox: {
    width: '100%',
    marginTop: 8,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  tipText: {
    fontSize: 16,
    color: TEXT,
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: TEXT,
  },
});

export default TipsScreen;
