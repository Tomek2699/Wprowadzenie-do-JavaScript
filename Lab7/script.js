const lsWeatherKey = 'weatherApi';
const main = document.querySelector('main');
const removeBtn = document.querySelector('.remove');
const addBtn = document.querySelector('.newWeatherForecast');
const input = document.querySelector('.city');
let forecasts = [];
let moreThan = 0;

initializeApp();
addBtn.addEventListener('click', createWeatherNote);

async function getWeatherData() {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=57cc083a05fa6a2008dc652336e25912`);
    const data = await response.json();

    const weather = {
      city: data.name,
      desc: data.weather[0].description,
      temp: Math.round(data.main.temp),
      image: data.weather[0].icon,
      wind: data.wind.speed,
      pressure: data.main.pressure,
    };

    forecasts.push(weather);
    localStorage.setItem(lsWeatherKey, JSON.stringify(forecasts));
    displayForecast(weather);
  } catch (error) {
    console.error(error);
  }
}

function initializeApp() {
  getDataFromLocalStorage();
  displayForecasts();
}

function getDataFromLocalStorage() {
  const forecastsFromStorage = JSON.parse(localStorage.getItem(lsWeatherKey));

  if (forecastsFromStorage && forecastsFromStorage.length > 0) {
    forecasts = forecastsFromStorage;
  }
}

function displayForecasts() {
  forecasts.forEach(displayForecast);
}

function displayForecast(weather) {
  const htmlWeather = document.createElement('div');
  const deleteBtn = document.createElement('button');
  const htmlCity = document.createElement('h1');
  const htmlTemp = document.createElement('p');
  const htmlImg = document.createElement('div');
  const htmlDesc = document.createElement('p');
  const htmlWind = document.createElement('p');
  const htmlPressure = document.createElement('p');

  htmlWeather.classList.add('weather-container');
  deleteBtn.classList.add('deleteBtn');
  deleteBtn.addEventListener('click', () => deleteWeather(htmlWeather, weather));
  htmlCity.classList.add('city');
  htmlImg.classList.add('weather-img');
  htmlDesc.classList.add('desc');
  htmlTemp.classList.add('temp');
  htmlWind.classList.add('wind');
  htmlPressure.classList.add('pressure');

  deleteBtn.innerHTML = 'X';
  htmlImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.image}@2x.png"/>`;
  htmlCity.innerHTML = weather.city;
  htmlDesc.innerHTML = weather.desc;
  htmlTemp.innerHTML = `${weather.temp}°C`;
  htmlWind.innerHTML = `WIND <br><br> ${weather.wind} m/s`;
  htmlPressure.innerHTML = `PRESSURE <br><br> ${weather.pressure} hPa`;

  htmlWeather.appendChild(deleteBtn);
  htmlWeather.appendChild(htmlCity);
  htmlWeather.appendChild(htmlTemp);
  htmlWeather.appendChild(htmlImg);
  htmlWeather.appendChild(htmlDesc);
  htmlWeather.appendChild(htmlWind);
  htmlWeather.appendChild(htmlPressure);
  main.appendChild(htmlWeather);
}

function createWeatherNote() {
  if(moreThan < 10){
    console.log(moreThan)
    getWeatherData();
    input.value = '';
    moreThan++;
  }
}

function deleteWeather(htmlTag, weather) {
  htmlTag.remove();
  forecasts = forecasts.filter(f => f !== weather);
  localStorage.setItem(lsWeatherKey, JSON.stringify(forecasts));
  moreThan--;
}