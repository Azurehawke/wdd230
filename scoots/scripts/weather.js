const currentTemp = document.querySelector('#temperature');
const currentHumidity = document.querySelector('#humidity'); // New element for humidity
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#description');
const forecastTemp = document.querySelector('#forecast-temp'); // New element for forecast temperature
const forecastDesc = document.querySelector('#forecast-desc'); // New element for forecast description
const forecastIcon = document.querySelector('#forecast-icon'); // New element for forecast icon

// API details for Cozumel, Mexico
const LAT = 20.5083; // Cozumel latitude
const LON = -86.9458; // Cozumel longitude
const APP_ID = 'cee662efbfc91c6a11cf659402b99ce4'; // Your app ID
const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${LAT}&lon=${LON}&appid=${APP_ID}&units=imperial`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // For debugging
            displayResults(data);
        } else {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('weather').innerHTML =
            '<p>Error fetching weather data. Please try again later.</p>';
    }
}

function displayResults(data) {
    // Current weather
    currentTemp.innerHTML = `${Math.round(data.current.temp)}°F`;
    currentHumidity.innerHTML = `${data.current.humidity}%`; // Display humidity
    const currentIcon = data.current.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/wn/${currentIcon}@2x.png`; // Use @2x for higher resolution
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', data.current.weather[0].description); // Accessibility
    let desc = data.current.weather[0].description;
    captionDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1); // Capitalize description

    // Next day's forecast at 15:00 local time (Cozumel is UTC-5)
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1); // Get tomorrow's date
    tomorrow.setHours(15, 0, 0, 0); // Set to 15:00 local time

    // Convert tomorrow's 15:00 local time (UTC-5) to UTC timestamp
    const localOffset = -5 * 60; // Cozumel offset in minutes (UTC-5)
    const tomorrowLocalTime = tomorrow.getTime();
    const tomorrowUTCTime = tomorrowLocalTime - (localOffset * 60 * 1000); // Convert to UTC
    const tomorrowUnix = Math.floor(tomorrowUTCTime / 1000); // Convert to Unix timestamp

    // Find the closest hourly forecast to tomorrow at 15:00
    const hourlyForecasts = data.hourly;
    let closestForecast = null;
    let smallestDiff = Infinity;

    for (const forecast of hourlyForecasts) {
        const forecastTime = forecast.dt; // Unix timestamp in seconds
        const diff = Math.abs(forecastTime - tomorrowUnix);
        if (diff < smallestDiff) {
            smallestDiff = diff;
            closestForecast = forecast;
        }
    }

    if (closestForecast) {
        forecastTemp.innerHTML = `${Math.round(closestForecast.temp)}°F`;
        const forecastIconCode = closestForecast.weather[0].icon;
        const forecastIconSrc = `https://openweathermap.org/img/wn/${forecastIconCode}@2x.png`;
        forecastIcon.setAttribute('src', forecastIconSrc);
        forecastIcon.setAttribute('alt', closestForecast.weather[0].description); // Accessibility
        let forecastDescription = closestForecast.weather[0].description;
        forecastDesc.textContent = forecastDescription.charAt(0).toUpperCase() + forecastDescription.slice(1);
    } else {
        forecastTemp.innerHTML = 'N/A';
        forecastDesc.textContent = 'Forecast unavailable';
        forecastIcon.setAttribute('src', '');
        forecastIcon.setAttribute('alt', 'No forecast icon');
    }
}

apiFetch();