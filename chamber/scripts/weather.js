const currentTemp = document.querySelector('#temperature');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#description');
const url = `https://api.openweathermap.org/data/2.5/weather?lat=34.54&lon=-117.29&appid=cee662efbfc91c6a11cf659402b99ce4&units=imperial`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}°F`;
    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconSrc);
    let desc = data.weather[0].description;
    // Convert description to capitalized words with spaces
    const capitalizedDesc = desc
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    captionDesc.textContent = `${capitalizedDesc}`;
}

apiFetch();