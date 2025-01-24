const apiKey = "44c191c75e67db5ae470e0c879dee0d4";

// Add event listener to the search button
document.getElementById("get-weather").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if (city) {
        getCurrentWeather(city);
        getForecast(city);
    }
});

// Function to fetch current weather data
function getCurrentWeather(city) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {

            const weatherDiv = document.getElementById("weather");
            weatherDiv.style.display = 'block';
            // Update the DOM with styled weather details
            weatherDiv.innerHTML = `
                <h2 class="city-name">${data.name}, ${data.sys.country}</h2>
                <div class="weather-main">
                    <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="${data.weather[0].description}" />
                    <p class="temp">${data.main.temp}°C</p>
                </div>
                <p class="description">${capitalize(data.weather[0].description)}</p>
                <div class="weather-details">
                    <p>Humidity: <span>${data.main.humidity}%</span></p>
                    <p>Wind Speed: <span>${data.wind.speed} m/s</span></p>
                </div>
            `;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Error fetching weather data. Please check the city name and try again.");
        });
}

// Function to fetch 5-day forecast
function getForecast(city) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecastDiv = document.getElementById("forecast");

            forecastDiv.innerHTML = "<h2>5-Day Forecast</h2>";

            // Filter to get weather data at 12:00 PM each day
            const filteredData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

            filteredData.forEach(item => {
                const date = new Date(item.dt_txt).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric"
                });

                forecastDiv.innerHTML += `
                    <div class="forecast-card">
                        <p class="forecast-date"><strong>${date}</strong></p>
                        <img class="forecast-icon" src="https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png" alt="${item.weather[0].description}" />
                        <p class="forecast-temp">Temp: <span>${item.main.temp}°C</span></p>
                        <p class="forecast-desc">${capitalize(item.weather[0].description)}</p>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error("Error fetching forecast data:", error);
            alert("Error fetching forecast data. Please check the city name and try again.");
        });
}

// Helper function to capitalize the first letter of each word
function capitalize(str) {
    return str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}