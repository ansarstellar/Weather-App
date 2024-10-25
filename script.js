document.getElementById('get-weather-btn').addEventListener('click', getWeather);

async function getWeather() {
  const city = document.getElementById('city-input').value.trim();
  const apiKey = '20351ef0deec04fa63152d49fe8d32d1';
  const weatherDisplay = document.getElementById('weather-display');
  const errorMessage = document.getElementById('error-message');
  
  weatherDisplay.classList.add('hidden');
  errorMessage.classList.add('hidden');

  if (!city) {
    showError('Please enter a city name.');
    return;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
}

function displayWeather(data) {
  const weatherIcon = document.getElementById('weather-icon');
  const cityName = document.getElementById('city-name');
  const weatherDescription = document.getElementById('weather-description');
  const temperature = document.getElementById('temperature');
  
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  weatherDescription.textContent = data.weather[0].description;
  temperature.textContent = `Temperature: ${data.main.temp} °C`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  document.getElementById('weather-display').classList.remove('hidden');
}

function showError(message) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
}
