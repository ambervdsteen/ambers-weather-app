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

function displayWeeklyForecast() {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
              <div class="weather-forecast-day-of-week">${day}</div>
              <div class="forecast-icon">
                <img
                  src="data:image/png;base64,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"
                  alt=""
                  width="60px"
                />
              </div>
              <div class="weather-forecast-temp">
                <span class="forecast-temp-max">18°</span>
                <span class="forecast-temp-min">12°</span>
              </div>
            </div>
          </div>`;
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

displayWeeklyForecast();
