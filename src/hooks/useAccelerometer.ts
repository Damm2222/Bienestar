// Hook personalizado para obtener los pasos usando el acelerómetro de Expo
import { useEffect, useRef, useState, useCallback } from 'react';
import { Accelerometer } from 'expo-sensors';

type ThreeAxisMeasurement = {
  x: number;
  y: number;
  z: number;
};

export default function useAccelerometer() {
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const lastStepTime = useRef(0);

  // Configuración para la detección de pasos
  const ACCELERATION_THRESHOLD = 1.1;
  const MIN_STEP_DELAY = 400;

  const detectStep = useCallback((acceleration: ThreeAxisMeasurement) => {
    const magnitude = Math.sqrt(
      acceleration.x * acceleration.x +
      acceleration.y * acceleration.y +
      acceleration.z * acceleration.z
    );
    const currentTime = Date.now();
    if (magnitude > ACCELERATION_THRESHOLD && (currentTime - lastStepTime.current) > MIN_STEP_DELAY) {
      setCurrentStepCount(prevCount => prevCount + 1);
      lastStepTime.current = currentTime;
    }
  }, []);

  const _subscribe = useCallback(() => {
    Accelerometer.addListener(data => {
      detectStep(data);
    });
    Accelerometer.setUpdateInterval(100);
  }, [detectStep]);

  const _unsubscribe = useCallback(() => {
    Accelerometer.removeAllListeners();
  }, []);

  useEffect(() => {
    let mounted = true;
    const initializeSensor = async () => {
      try {
        const isAvailable = await Accelerometer.isAvailableAsync();
        if (mounted && isAvailable) {
          _subscribe();
        }
      } catch (error) {}
    };
    initializeSensor();
    return () => {
      mounted = false;
      _unsubscribe();
    };
  }, [_subscribe, _unsubscribe]);

  return currentStepCount;
}
