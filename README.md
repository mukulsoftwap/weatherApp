# 🌦️ React Native Weather App

## 📌 Overview
This is a **React Native Weather App** built using **Expo**, providing real-time weather updates via the **OpenWeatherMap API**. Users can:
- Search for weather by **city name**.
- Get **weather updates based on location**.
- Toggle between **light and dark mode**.

---

## 🚀 How to Run the App
### **🔹 Prerequisites**
Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **Expo CLI**
- **Android Emulator/iOS Simulator** (or a physical device with Expo Go)

### **🔹 Installation Steps**
```sh
# 1️⃣ Clone the repository
git clone https://github.com/mukulsoftwap/weatherApp.git
cd weatherApp

# 2️⃣ Install dependencies
npm install  # or yarn install

# 3️⃣ Start the Expo development server
npm start  # or expo start
```

### **🔹 Running on a Device**
- **Android:** Scan the QR code in Expo Go.
- **iOS:** Scan the QR code in Expo Go.
- **Simulator:** Press **`a`** (Android) or **`i`** (iOS) in the Expo terminal.

---

## 🏗️ Architectural Decisions
### **1️⃣ State Management: Context API with Reducer (Redux-like Architecture)**
We use **React Context API with `useReducer`** to manage state efficiently, ensuring a clean and maintainable architecture.
- `WeatherContextProvider.tsx`: Manages state using `useReducer`.
- `weatherReducer.ts`: Handles state updates based on dispatched actions.
- `weatherActions.ts`: Contains functions that handle API calls and dispatch actions.

### **2️⃣ API Integration: OpenWeatherMap**
- `weatherService.ts` fetches real-time weather data.
-  I Store `API_KEY` in constants currently, it should not store in code but for now its a demo app so i sotre in code, it should be store in `.env` or using Secret Manager.

### **3️⃣ UI Components & Theming**
- `ThemedText` and `ThemedView` enable dynamic **light/dark mode** support.
- Theme toggling with `ThemeContextProvider.tsx` and `ThemeToggler.tsx`.
- Theme persistence using `AsyncStorage`.

### **4️⃣ Location Services: Expo-Location**
- Requests user permission to fetch the current location.
- Handles errors gracefully (e.g., when location services are denied).

### **5️⃣ Testing: Jest & React Native Testing Library**
- Unit tests for `WeatherCard`, `HomeScreen`, and `WeatherContextProvider`.
- Mocks API calls and location permissions.

---

## 📂 Project Structure
```
/weatherApp
│── /src
│   ├── /__tests__    # Testing UI components
│   ├── /components   # Reusable UI components
│   ├── /config       # Configuration files (constants, environment variables)
│   ├── /hooks        # Custom hooks for reuse
│   ├── /screens      # App screens (HomeScreen)
│   ├── /services     # API requests (weatherService.ts)
│   ├── /reducers     # Reducers for managing state (weatherReducer.ts)
│   ├── /actions      # Actions handling API calls (weatherActions.ts)
│   ├── /providers    # Context API Providers (WeatherContextProvider.tsx, ThemeContextProvider.tsx)
│   ├── _layout.tsx       # Main app entry point
│── package.json      # Dependencies & scripts
│── README.md         # Documentation
```


