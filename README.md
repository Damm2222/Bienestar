# 💙 Bienestar App

Aplicación móvil de monitoreo remoto de pacientes crónicos y acompañamiento deportivo, desarrollada en **React Native (Expo)**. Incluye simulación de pasos, sincronización BLE, consejos de salud personalizados y animaciones modernas.

---

## 🚀 Características principales

- **Pantalla de Login** con validación visual (nombre, edad, altura, peso, enfermedad)
- **Pantalla principal (Home):**
  - Muestra nombre y edad del usuario
  - Contador de pasos (usando acelerómetro de Expo)
  - Botón para simular sincronización BLE
  - Mensaje motivacional
  - Acceso rápido a consejos de salud
- **Pantalla de Consejos de Salud:**
  - Consejos personalizados usando la API de OpenAI
  - Feedback visual de carga y error
- **Animaciones modernas:**
  - Transición slide entre pantallas
  - Animación Lottie en transiciones de login y logout
- **Navegación moderna:**
  - Tabs minimalistas (Home, Consejos)
  - Botón flotante de logout
- **Estilos minimalistas:**
  - Paleta celeste/blanco, UI limpia y moderna
- **Manejo seguro de API Key:**
  - Uso de `.env` y `.gitignore`

---

## 📂 Estructura del proyecto

```
├── assets/
│   ├── Animation - 1749092439740.json   # Animación Lottie
│   ├── home.png / Heart.png             # Iconos
│   └── ...
├── src/
│   ├── components/                      # Componentes reutilizables
│   ├── hooks/                           # Custom hooks
│   ├── navigation/                      # Navegación principal
│   ├── screens/                         # Pantallas principales
│   ├── styles/                          # Estilos globales
│   ├── types/                           # Tipos y declaraciones
│   └── utils/                           # Utilidades (ej: BLE sync)
├── .env                                 # API Key OpenAI
├── .gitignore
├── App.tsx
├── app.json
├── package.json
└── README.md
```

---

## 🛠️ Instalación y ejecución

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/diego/bienestar-app.git
   cd bienestar-app
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configura tu API Key de OpenAI:**

   - Crea un archivo `.env` en la raíz:
     ```env
     EXPO_PUBLIC_OPENAI_KEY=sk-...tu-key...
     ```

4. **Inicia la app con Expo:**

   ```bash
   npx expo start
   ```
   - Escanea el QR con Expo Go (Android/iOS) 📱
   - O usa un emulador Android/iOS 💻

---

## 📝 Notas técnicas

- Compatible con Expo Go (no requiere build nativo)
- Animaciones Lottie funcionan en Android, iOS y web
- Código organizado y fácil de mantener
- Puedes personalizar los consejos de salud editando `TipsScreen.tsx`

---

## ✨ Bonus y mejoras

- Animación Lottie en transiciones
- Sincronización BLE simulada con feedback visual
- Consejos personalizados vía OpenAI
- UI moderna y minimalista

---

## 📸 Capturas de pantalla

| Login | Home | Consejos |
|:-----:|:----:|:--------:|
| ![Login](assets/register.png) | ![Home](assets/bienestarApp.png) | ![Tips](assets/Heart.png) |

---

## 🧑‍💻 Autor

- [Damm2222](https://github.com/Damm2222)

---

## 🏥 ¡Listo para acompañar tu bienestar!
