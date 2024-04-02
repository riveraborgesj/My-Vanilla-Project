function updateWeatherInfo(response) {
  let temperatureElement = document.querySelector("#temp-display");
  let weatherDescription = document.querySelector("#description");
  let temperature = response.data.temperature.current;
  let humidityDisplay = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind-speed");
  let windSpeed = response.data.wind.speed;
  let cityElement = document.querySelector("#city");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  timeElement.innerHTML = formatDate(date);
  windElement.innerHTML = Math.round(windSpeed);
  humidityDisplay.innerHTML = Math.round(humidity);
  weatherDescription.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  //make API call and update interface
  let apiKey = "3b64aa0add5f4a0fc04de440775caeot";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeatherInfo);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function displayForecast() {
  let forecast = document.querySelector("#forecast");

  let days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      ` 
    <div class="weather-forecast-day">
      <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">
          <img
          src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/121/537/original/raincloud.jpeg?1712079775"
          alt="rain cloud"
          width="36"
          />
        </div>
    <div class="weather-forecast-temperatures">
      <span class="forecast-max">64°</span>
      <span class="forecast-min">49°</span>
    </div>
    </div>
    `;
  });
  forecast.innerHTML = forecastHtml;
}
searchCity("Raleigh");
displayForecast();
