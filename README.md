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

_A fully functional showcase of responsive web design, API integration, and asynchronous JavaScript._
