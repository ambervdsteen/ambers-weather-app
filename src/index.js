function updateWeather(response) {
  let updatedTempElement = document.querySelector("#temp");
  updatedTempElement.innerHTML = response.data.temperature.current;
}

function submitCity(city) {
  let apiKey = "2950072abb4303db56f019dto24c1aca";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function actSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInput.value;
  submitCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form-weather");

searchFormElement.addEventListener("submit", actSearchSubmit);
