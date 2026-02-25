// 🔑 Replace with your OpenWeather API key
const API_KEY = "213498a7d03a900524fcd36b3318eb6c";

// DOM Elements
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const errorMessage = document.getElementById("error-message");
const loadingMessage = document.getElementById("loading-message");

// Button click
searchBtn.addEventListener("click", getWeather);

// Enter key support
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {
    const city = cityInput.value.trim();

    // Validation
    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        temperature.textContent = "";
        description.textContent = "";
        return;
    }

    // Reset UI
    errorMessage.textContent = "";
    loadingMessage.textContent = "Loading...";
    temperature.textContent = "";
    description.textContent = "";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found. Please try again.");
        }

        const data = await response.json();

        temperature.textContent = `Temperature: ${data.main.temp}°C`;
        description.textContent = `Condition: ${data.weather[0].description}`;

    } catch (error) {
        errorMessage.textContent = error.message;
    } finally {
        loadingMessage.textContent = "";
    }
}