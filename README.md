# 🌍 AI Trip Planner Web  

**⚡ Tech Stack:**  

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)  
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)  
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-blue?style=for-the-badge&logo=google)  
![Unsplash](https://img.shields.io/badge/Unsplash-000000?style=for-the-badge&logo=unsplash&logoColor=white)  

[![Vercel](https://img.shields.io/badge/Deploy%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)  

---

## 🚀 Live Demo  

👉 [AI Trip Planner Web](https://ai-trip-planner-web-inky.vercel.app/create-trip)  
*(Replace with your deployed app link when ready!)*  

---

## 🛠️ Technologies Used  

- **Frontend:** React, Vite  
- **UI Components:** ShadCN UI  
- **Backend:** Firebase (Authentication & Firestore)  
- **AI Integration:** Google Gemini API  
- **Authentication:** Google OAuth 2.0  
- **Image Generation:** Unsplash API  

---

## ⚙️ Features  

✅ **Personalized Itineraries** – Generate AI-powered travel plans based on user preferences.  
🏨 **Hotel Recommendations** – Get AI-suggested hotels with budget-friendly options.  
🎡 **Places to Visit** – Discover attractions, landmarks, and activities at your destination.  
🔗 **Google Maps Integration** – Clicking on hotels or attractions redirects you to the exact location.  
🔐 **User Authentication** – Secure login & registration with Google OAuth.  
💾 **My Trips** – Save and view all your itineraries in one place.  
📱 **Responsive UI** – Sleek design powered by ShadCN UI.  
📷 **Image Integration** – Beautiful travel images from Unsplash API.  

---

## 📦 Installation & Setup  

### 1. Clone the Repository  
```bash
git clone https://github.com/vedduhijod/ai-trip-planner-web.git
cd ai-trip-planner-web
2. Install Dependencies
bash
Copy code
npm install
3. Set Up Environment Variables
Create a .env file in the root directory and add the following:

bash
Copy code
VITE_GOOGLE_GEMINI_API_KEY=your_gemini_api_key
VITE_GOOGLE_AUTH_CLIENT_ID=your_google_oauth_client_id
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
Replace the placeholder values with your actual API keys.

4. Run the Development Server
bash
Copy code
npm run dev
Visit http://localhost:3000 to view the application.

🔐 Authentication Setup
To enable Google OAuth authentication:

Go to the Google Cloud Console.

Create a new project (or select an existing one).

Enable Google Identity Platform API.

Configure the OAuth consent screen.

Create OAuth 2.0 credentials and obtain your Client ID.

Add your application’s authorized redirect URIs.

📖 Full guide: Google OAuth documentation.

🧠 AI Integration
The app uses Google Gemini 2.5 Flash Lite to generate personalized travel itineraries.

🔗 Learn more: Google Gemini Developer Guide

📸 Image Integration
High-quality travel images are fetched via the Unsplash API.

🔗 Unsplash Developer Portal

🚧 Roadmap
🗺️ Create a Trip – Choose any destination and generate a personalized itinerary.

🏨 Hotel Recommendations – Get AI-suggested hotels with budget-friendly options.

🎡 Places to Visit – Discover attractions, landmarks, and activities.

🔗 Google Maps Integration – Clicking hotels/attractions redirects to Google Maps.

💾 My Trips – Save trips and view all past itineraries in one place.

🤝 Contributing
Contributions are welcome! 🎉

Fork this repository

Create a feature branch (git checkout -b feature/YourFeature)

Commit your changes (git commit -m "Add Your Feature")

Push to the branch (git push origin feature/YourFeature)

Create a Pull Request

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.

📣 Acknowledgments
ShadCN UI – Modern UI components

Firebase – Authentication & real-time database

Google Gemini API – AI-powered recommendations

Unsplash API – High-resolution travel imagery
