const apiKey = 'cee662efbfc91c6a11cf659402b99ce4';
const city = 'Victorville, CA';
const cityId = '5404198'; // City ID for Victorville, CA (from OpenWeatherMap city list)
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=34.54&lon=-117.29&appid=cee662efbfc91c6a11cf659402b99ce4&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/weather?lat=34.54&lon=-117.29&appid=cee662efbfc91c6a11cf659402b99ce4&units=imperial`;

fetch(currentUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch current weather data');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°F`;
            document.getElementById('description').textContent = data.weather[0].description;
            document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
            document.getElementById('temperature').textContent = 'Unavailable';
            document.getElementById('description').textContent = 'Unable to load weather data';
        });

    fetch(forecastUrl)
        .then(response => {
            console.log('Forecast response status:', response.status);
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(`Failed to fetch forecast data: ${errData.message}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Forecast data:', data);
            const forecastDiv = document.getElementById('forecast');
            if (!forecastDiv) return;

            if (!data.list || !Array.isArray(data.list)) {
                throw new Error('Invalid forecast data: list is missing or not an array');
            }

            const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
            dailyData.forEach(day => {
                const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
                const temp = Math.round(day.main.temp);
                const desc = day.weather[0].description;
                forecastDiv.innerHTML += `<p>${date}: ${temp}°F, ${desc}</p>`;
            });
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            const forecastDiv = document.getElementById('forecast');
            if (forecastDiv) {
                forecastDiv.innerHTML = '<p>Unable to load forecast data.</p>';
            }
        });