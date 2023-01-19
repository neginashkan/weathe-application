const searchBtn = document.querySelector("#search-btn");
let celsius = null;
function showUserSearch(response) {
  console.log(response);
  let cityEl = document.querySelector("#city");
  let countryEl = document.querySelector("#country");
  let humidityEl = document.getElementById("humidity");
  let windEl = document.getElementById("wind");
  let descriptionEl = document.getElementById("description");
  let degreeEl = document.querySelector("#degree");
  let bigIconEl = document.querySelector("#big-icon");
  let webIconEl = document.querySelector("#web-icon");
  celsius = Math.round(response.data.main.temp);
  cityEl.innerHTML = response.data.name;
  countryEl.innerHTML = response.data.sys.country;
  humidityEl.innerHTML = response.data.main.humidity;
  windEl.innerHTML = Math.round(response.data.wind.speed);
  descriptionEl.innerHTML = response.data.weather[0].description;
  webIconEl.href = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  bigIconEl.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  bigIconEl.alt = descriptionEl;
  degreeEl.innerHTML = celsius;
  currentTime(new Date(response.data.dt * 1000));
}
function handleClick(city) {
  const apiKey = "3c065e33596a9deda1b7045f5d3e8811";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(showUserSearch);
}
function userSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  handleClick(city);
}
searchBtn.addEventListener("click", userSearch);

// -----------------set time--------------------------
function currentTime(date) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let monthNumber = date.getMonth();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let year = date.getFullYear();
  let month = months[monthNumber];
  let day = days[date.getDay()];
  let numberDay = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  document.getElementById("number-day").textContent = numberDay;
  document.getElementById("month").textContent = month;
  document.getElementById("year").textContent = year;
  document.getElementById("week-day").textContent = day;
  document.getElementById("minute").textContent = minute;
  document.getElementById("hour").textContent = hour;
}
currentTime(new Date());
handleClick("urmia");

// ---------------------------
function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  document.querySelector("#degree").textContent = fahrenheit;
  document.querySelector("#celsius").classList.remove("active");
  document.querySelector("#fahrenheit").classList.add("active");
}
const fahrenheitEl = document.getElementById("fahrenheit");
fahrenheitEl.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  document.querySelector("#degree").textContent =celsius;
  document.querySelector("#fahrenheit").classList.remove("active");
  document.querySelector("#celsius").classList.add("active");
}
const celsiusEl = document.getElementById("celsius");
celsiusEl.addEventListener("click", showCelsius);
