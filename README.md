# 🌦️ React Native Weather App

## 📌 Overview
This is a **React Native Weather App** built using **Expo**, providing real-time weather updates via the **OpenWeatherMap API**. Users can:
- Search for weather by **city name**.
- Get **weather updates based on location**.
- Device Specific **light and dark mode** (it will switch as per your device mode).

---

## 🚀 How to Run the App
### **🔹 Prerequisites**
Ensure you have the following installed:
- **Node.js** (v16 or higher)
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
- **iOS:**  Scan the QR code in Expo Go.
- **Simulator:** Press **`a`** (Android) or **`i`** (iOS) in the Expo terminal.

---

## 🏗️ Architectural Decisions
### **1️⃣ State Management: Context API**
We use **React Context API** for state management, ensuring a clean and maintainable architecture.
- `WeatherContext.ts`: Provides weather data and API calls.
- `WeatherContextProvider.tsx`: Manages state and API interactions.

### **2️⃣ API Integration: OpenWeatherMap**
- `apiService.ts` to get real-time weather data.
- I Store `API_KEY` in constants currently, it should not store in code but for now its a demo app so i sotre in code, it should be store in `.env` or using Secret Manager.

### **3️⃣ UI Components & Theming**
- Custom `ThemedText` and `ThemedView` for dynamic light/dark mode support.

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
│── /app
│   ├── /__test__    # Testing UI components
│   ├── /components  # Reusable UI components
|   ├── /config      # Config like. constants
|   ├── /hooks       # Reusable Hooks
│   ├── /context     # Context API
│   ├── /screens     # App screens (HomeScreen)
│   ├── /services    # API requests (fetchWeatherData)
|   ├── /providers   # Context API Providers
│   ├── _layout.tsx  # Main app entry point
│── package.json     # Dependencies & scripts
│── README.md        # Documentation
```

---