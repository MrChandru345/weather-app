// --- DOM Element Selection ---
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const suggestionsBox = document.querySelector('.suggestions-box');
const cityIntro = document.querySelector('.city-intro');
const notFoundView = document.querySelector('.not-found');
const weatherBody = document.querySelector('.weather-body');

// --- API Configuration ---
const API_KEY = 'c250e916197e9464c3282f79d44660ba';

// =================================================================
// GEOLOCATION LOGIC (Re-added)
// =================================================================

const handleLocationSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    fetchWeatherByCoords(latitude, longitude);
};

const handleLocationError = (error) => {
    console.error("Geolocation error:", error.message);
};

const fetchWeatherByCoords = async (lat, lon) => {
    const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    
    try {
        const [currentWeatherResponse, forecastResponse] = await Promise.all([
            fetch(CURRENT_WEATHER_URL),
            fetch(FORECAST_URL)
        ]);
        if (!currentWeatherResponse.ok || !forecastResponse.ok) throw new Error("Coords weather fetch failed");
        const currentData = await currentWeatherResponse.json();
        const forecastData = await forecastResponse.json();
        updateUI(currentData, forecastData);
    } catch (error) {
        console.error("Error fetching weather by coords:", error);
        cityIntro.style.display = 'none';
        weatherBody.style.display = 'none';
        notFoundView.style.display = 'block';
    }
};

// This runs when the page loads to ask for location permission
window.addEventListener('load', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError);
    } else {
        console.log("Geolocation is not supported.");
    }
});


// =================================================================
// AUTOCOMPLETE SEARCH LOGIC
// =================================================================

let debounceTimer;

const getCitySuggestions = async () => {
    const query = searchInput.value;
    if (query.length < 3) {
        suggestionsBox.style.display = 'none';
        return;
    }
    const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`;
    try {
        const response = await fetch(GEOCODING_API_URL);
        const data = await response.json();
        displaySuggestions(data);
    } catch (error) {
        console.error("Error fetching city suggestions:", error);
    }
};

const displaySuggestions = (cities) => {
    suggestionsBox.innerHTML = '';
    if (cities.length === 0) {
        suggestionsBox.style.display = 'none';
        return;
    }
    cities.forEach(city => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        const state = city.state ? `, ${city.state}` : '';
        suggestionItem.textContent = `${city.name}${state}, ${city.country}`;
        suggestionItem.addEventListener('click', () => {
            searchInput.value = city.name;
            suggestionsBox.style.display = 'none';
            checkWeather(city.name);
        });
        suggestionsBox.appendChild(suggestionItem);
    });
    suggestionsBox.style.display = 'block';
};

searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(getCitySuggestions, 300);
});

// =================================================================
// CORE WEATHER FETCH & UI LOGIC
// =================================================================

const checkWeather = async (city) => {
    if (city === '') return;
    const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

    try {
        const [currentWeatherResponse, forecastResponse] = await Promise.all([
            fetch(CURRENT_WEATHER_URL),
            fetch(FORECAST_URL)
        ]);
        if (!currentWeatherResponse.ok || !forecastResponse.ok) {
            cityIntro.style.display = 'none';
            weatherBody.style.display = 'none';
            notFoundView.style.display = 'block';
            return;
        }
        const currentData = await currentWeatherResponse.json();
        const forecastData = await forecastResponse.json();
        updateUI(currentData, forecastData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        cityIntro.style.display = 'none';
        weatherBody.style.display = 'none';
        notFoundView.style.display = 'block';
    }
};

const updateUI = (currentData, forecastData) => {
    document.getElementById('city').textContent = currentData.name;
    document.getElementById('date').textContent = new Date().toLocaleString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
    document.getElementById('temp').innerHTML = `${Math.round(currentData.main.temp)}°c`;
    document.getElementById('description').textContent = currentData.weather[0].description;
    document.getElementById('humidity').textContent = `${currentData.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `${currentData.wind.speed} M/s`;
    const mainIcon = document.getElementById('main-icon');
    mainIcon.src = getWeatherImageUrl(currentData.weather[0]);

    const forecastContainer = document.querySelector('.forecast');
    forecastContainer.innerHTML = '';
    const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5);

    dailyForecasts.forEach(day => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        const dayName = new Date(day.dt * 1000).toLocaleString('en-US', { weekday: 'short', day: 'numeric' });
        const temp = `${Math.round(day.main.temp)}°c`;
        const iconUrl = getWeatherImageUrl(day.weather[0]);
        forecastItem.innerHTML = `<p>${dayName}</p><img src="${iconUrl}" alt="Forecast weather icon"><span>${temp}</span>`;
        forecastContainer.appendChild(forecastItem);
    });

    cityIntro.style.display = 'none';
    notFoundView.style.display = 'none';
    weatherBody.style.display = 'block';
    setTimeout(() => {
        weatherBody.style.opacity = 1;
    }, 10);
};

function getWeatherImageUrl(weatherData) {
    const mainCondition = weatherData.main;
    const description = weatherData.description;

    switch (mainCondition) {
        case 'Clear':
            return 'assets/sun.png';
        case 'Clouds':
            if (description.includes('few clouds') || description.includes('scattered clouds')) {
                return 'assets/cloudy.png';
            } else {
                return 'assets/cloud.png';
            }
        case 'Rain':
            return 'assets/rainy-day.png';
        case 'Drizzle':
            return 'assets/sunwitrain.png';
        case 'Thunderstorm':
            return 'assets/thunder.png';
        case 'Snow':
            return 'assets/snow.png';
        case 'Mist':
        case 'Haze':
        case 'Fog':
            return 'assets/mist.png';
        default:
            return 'assets/cloudy.png';
    }
}

// --- Event Listeners ---
searchButton.addEventListener('click', () => checkWeather(searchInput.value));
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkWeather(searchInput.value);
        suggestionsBox.style.display = 'none';
    }
});