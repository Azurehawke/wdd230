// const apiKey = 'cee662efbfc91c6a11cf659402b99ce4';

// function getWeather(lat, lon) {
//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°F`;
//             document.getElementById('description').textContent = data.weather[0].description;
//             document.getElementById('weather-icon').src = 
//                 `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             document.getElementById('temperature').textContent = 'Error loading weather';
//         });
// }

// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//         position => {
//             getWeather(position.coords.latitude, position.coords.longitude);
//         },
//         error => {
//             console.error('Geolocation error:', error);
//             document.getElementById('temperature').textContent = 'Location access denied';
//         }
//     );
// } else {
//     document.getElementById('temperature').textContent = 'Geolocation not supported';
// }


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
        }
        else {
        const errorText = await response.text();
        throw new Error(errorText);
        }
    } 
    catch (error){
        console.error('Error:', error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}°F`;
    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconSrc);
    let desc = data.weather[0].description;
    captionDesc.textContent = `${desc}`;

}

apiFetch();