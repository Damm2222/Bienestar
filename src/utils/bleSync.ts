// Simulación de sincronización BLE
export const simulateBleSync = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};
