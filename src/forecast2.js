let now = new Date();
let h4 = document.querySelector("h4");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h4.innerHTML = `${day}, ${hours}:${minutes}`;

function look(city) {
  let units = "metric";
  let apiKey = "8d9838178b5b401f1b4e7cb5af18e210";
  let apiSource = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiSource}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  console.log(response.data.name);
  document.querySelector("#city-search").innerHTML = response.data.name;
  document.querySelector("#cels-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector(
    "#humid-amount"
  ).innerHTML = `${response.data.main.humidity} %`;
  document.querySelector("#wind-amount").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  celsiusTemp = response.data.main.temp;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#cels-temp");
  let fahrenTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#cels-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-result").value;
  look(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahr-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#cels-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let celsiusTemp = null;

look("Halifax");
