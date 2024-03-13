function updateWeather(response) {
  let updatedTempElement = document.querySelector("#temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let weatherDescription = document.querySelector("#description-weather");
  let humidityCurrent = document.querySelector("#humidity");
  let windSpeedCurrent = document.querySelector("#wind-speed");
  let currentTime = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconWeather = document.querySelector("#icon");

  updatedTempElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  weatherDescription.innerHTML = response.data.condition.description;
  humidityCurrent.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedCurrent.innerHTML = `${response.data.wind.speed} KM/H`;
  currentTime.innerHTML = formatDate(date);
  iconWeather.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-emoji"/>`;

  retreiveForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  return `${day} ${hours}:${minutes}`;
}

function submitCity(city) {
  let apiKey = "2950072abb4303db56f019dto24c1aca";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function actSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  submitCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form-weather");

searchFormElement.addEventListener("submit", actSearchSubmit);

submitCity("Amsterdam");

function formatForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function retreiveForecast(city) {
  let apiKey = "2950072abb4303db56f019dto24c1aca";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeeklyForecast);
}

function displayWeeklyForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="forecast-day"> 
              <div class="weather-forecast-day-of-week">${formatForecast(
                day.time
              )}</div>
              <div class="forecast-icon">
                <img
                  src="${day.condition.icon_url}"
                  alt=""
                 
                />
              </div>
              <div class="weather-forecast-temp">
                <span class="forecast-temp-max">${Math.round(
                  day.temperature.maximum
                )}°</span>
                <span class="forecast-temp-min">${Math.round(
                  day.temperature.minimum
                )}°</span>
              </div>
            </div>`;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

displayWeeklyForecast();
