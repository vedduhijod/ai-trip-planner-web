# 🌍 AI Trip Planner Web  

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)  
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)  
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)  
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-blue?style=for-the-badge&logo=google)](https://developers.google.com/gemini)  
[![Unsplash](https://img.shields.io/badge/Unsplash-000000?style=for-the-badge&logo=unsplash&logoColor=white)](https://unsplash.com/developers)  
[![Vercel](https://img.shields.io/badge/Deploy%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)  

---

## 📌 Table of Contents

- [Live Demo](#-live-demo)  
- [Technologies Used](#-technologies-used)  
- [Features](#-features)  
- [Installation & Setup](#-installation--setup)  
- [Authentication Setup](#-authentication-setup)  
- [AI Integration](#-ai-integration)  
- [Image Integration](#-image-integration)  
- [Roadmap](#-roadmap)  
- [Contributing](#-contributing)  
- [License](#-license)  
- [Acknowledgments](#-acknowledgments)  

---

## 🚀 Live Demo  

👉 [AI Trip Planner Web](https://ai-trip-planner-web-inky.vercel.app/)  

---

## 🛠️ Technologies Used  

- Frontend: React, Vite  
- UI Components: ShadCN UI  
- Backend: Firebase (Authentication & Firestore)  
- AI Integration: Google Gemini API  
- Authentication: Google OAuth 2.0  
- Image Generation: Unsplash API  

---

## ⚙️ Features  

- ✅ Personalized Itineraries – AI-generated travel plans based on user preferences  
- 🏨 Hotel Recommendations – Budget-friendly AI-suggested hotels  
- 🎡 Places to Visit – Attractions, landmarks, and activities  
- 🔗 Google Maps Integration – Redirects to exact location for hotels/attractions  
- 🔐 User Authentication – Secure login & registration with Google OAuth  
- 💾 My Trips – Save and view all itineraries  
- 📱 Responsive UI – Powered by ShadCN UI  
- 📷 Image Integration – Beautiful travel images from Unsplash API  

---

## 📦 Installation & Setup  

### 1. Clone the Repository  

```bash
git clone https://github.com/vedduhijod/ai-trip-planner-web.git
cd ai-trip-planner-web
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_GOOGLE_GEMINI_API_KEY=your_gemini_api_key
VITE_GOOGLE_AUTH_CLIENT_ID=your_google_oauth_client_id
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

Replace placeholders with your actual API keys.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🔐 Authentication Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google Identity Platform API
4. Configure the OAuth consent screen
5. Create OAuth 2.0 credentials and obtain your Client ID
6. Add authorized redirect URIs

📖 [Google OAuth Documentation](https://developers.google.com/identity)

---

## 🧠 AI Integration

The app uses **Google Gemini 2.5 Flash Lite** for AI-generated personalized itineraries.

🔗 [Google Gemini Developer Guide](https://developers.google.com/gemini)

---

## 📸 Image Integration

High-quality travel images are fetched via **Unsplash API**.

🔗 [Unsplash Developer Portal](https://unsplash.com/developers)

---

## 🚧 Roadmap

* 🗺️ Create a Trip – Generate personalized itineraries
* 🏨 Hotel Recommendations – AI-suggested hotels
* 🎡 Places to Visit – Attractions and landmarks
* 🔗 Google Maps Integration – Redirects to maps
* 💾 My Trips – Save and view all past itineraries

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m "Add Your Feature"`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** – see the LICENSE file.

---

## 📣 Acknowledgments

* **ShadCN UI** – Modern UI components
* **Firebase** – Authentication & real-time database
* **Google Gemini API** – AI-powered recommendations
* **Unsplash API** – High-resolution travel imagery
