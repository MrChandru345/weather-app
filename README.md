# Modern Weather App

![Weather App UI](assets/og%20bg.png)

## 📌 Project Overview

A sleek, modern, and fully responsive weather web application built to provide real-time meteorological data and a 5-day forecast. The project showcases advanced frontend UI/UX techniques, utilizing a "Glassmorphism" aesthetic with frosted glass effects against dynamic backgrounds. It integrates seamlessly with the OpenWeatherMap API to deliver accurate location-based weather updates.

## 🚀 Key Features

- **Real-Time Weather Data**: Fetches and displays current temperature, weather conditions, humidity, and wind speed.
- **5-Day Weather Forecast**: Provides an elegantly styled and horizontally aligned forecast for the upcoming 5 days.
- **Geolocation Integration**: Automatically detects the user's location on load via the browser's Geolocation API to instantly display local weather.
- **Smart City Search & Autocomplete**: Features a city search bar with a debounced autocomplete system, providing location suggestions as the user types (minimizing API calls).
- **Dynamic UI State Management**: Seamlessly transitions between a welcoming initial state, loading states, the active weather display, and robust error handling (e.g., custom 404 illustrations for invalid cities).
- **Glassmorphism Design System**: Employs CSS backdrop-filters and translucent containers to create a premium, modern visual experience.
- **Dynamic Weather Icons**: Displays custom, intuitive SVG/PNG graphics corresponding to specific live weather conditions (e.g., clear, rain, thunderstorm, snow).

## 💻 Tech Stack

- **Frontend Core**: HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Architecture**: Single Page Application (SPA) utilizing asynchronous JavaScript (`async/await`) and the Fetch API.
- **External API**: OpenWeatherMap API (Current Weather, 5-Day/3-Hour Forecast, and Geocoding API).
- **Iconography**: FontAwesome and custom vector assets.
- **Styling**: Vanilla CSS featuring modern flexbox layouts, media queries for mobile-responsiveness, and CSS variables/glass effects for theming.

## 📈 Highlights for Resume

- **API Integration**: Successfully integrated multiple endpoints of a third-party RESTful API (OpenWeatherMap), managing API keys securely and efficiently parsing complex nested JSON responses.
- **Performance Optimization**: Implemented a **debounce function** (300ms delay) on the search input to mitigate excessive API requests, demonstrating an understanding of frontend performance best practices and API rate limiting.
- **Asynchronous Programming**: Handled multiple concurrent asynchronous operations using modern `async/await` and `Promise.all()` to fetch current weather and forecasts simultaneously, reducing load times.
- **UI/UX Excellence**: Engineered a pixel-perfect, mobile-responsive interface using Flexbox. Resolved complex layout challenges, including absolute positioning for autocomplete dropdowns and dynamic sizing for forecast cards without overflow issues.
- **Error Handling & Edge Cases**: Built robust fallback UI components for scenarios like denied geolocation permissions or failed API lookups (404 Not Found handling).

## 🛠️ How to Run Locally

1. Clone the repository to your local machine.
2. Ensure you have a valid OpenWeatherMap API key (replace the `API_KEY` placeholder in `script.js` if necessary).
3. Open `index.html` directly in your browser, or use a local development server (e.g., Live Server extension in VS Code) for optimal performance.

---

_Created as a demonstration of frontend web development fundamentals, UI design execution, and asynchronous API integrations._
