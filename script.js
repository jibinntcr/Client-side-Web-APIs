// User data storage and retrieval
const userForm = document.getElementById('user-form');
const userInfo = document.getElementById('user-info');

userForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;

  localStorage.setItem('username', username);
  localStorage.setItem('email', email);

  updateUserDisplay();
});

const updateUserDisplay = () => {
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  if (username && email) {
    userInfo.style.display = 'block';
    userInfo.querySelector('p:first-child').textContent = `Name: ${username}`;
    userInfo.querySelector('p:last-child').textContent = `Email: ${email}`;
  } else {
    userInfo.style.display = 'none';
  }
};

const getWeatherButton = document.getElementById('get-weather');
const cityNameInput = document.getElementById('city-name');
const weatherInfo = document.getElementById('weather-info');

getWeatherButton.addEventListener('click', () => {
  const cityName = cityNameInput.value.trim();
  if (!cityName) {
    alert('Please enter a city name');
    return;
  }

  // Fetch weather data from OpenWeatherMap API
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod !== 200) {
        alert(`Error: ${data.message}`);
        return;
      }

      const city = data.name;
      const temperature = data.main.temp;
      const description = data.weather[0].description;

      weatherInfo.style.display = 'block';
      weatherInfo.innerHTML = `
        <p>City: ${city}</p>
        <p>Temperature: ${temperature} °C</p>
        <p>Description: ${description}</p>
      `;
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      alert('An error occurred while fetching weather data');
    });
});