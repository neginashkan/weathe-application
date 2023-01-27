const searchForm = document.querySelector("#search-form");
let celsius = null;
function setForecastWeekDay(timeNumber) {
  let date = new Date(timeNumber * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}
function displayForecast(response) {
  let forecastArray = response.data.daily;
  let weatherForecastEl = document.getElementById("weather-forecast");
  let allDayForecast = `<div class="row mb-3">`;
  forecastArray.forEach(function (eachForecastDay,index) {
    if(index===0){
      let bigIconEl = document.querySelector("#big-icon");
      bigIconEl.src = `${eachForecastDay.condition.icon_url}`
      bigIconEl.alt = `${eachForecastDay.condition.icon}`;
    }
    if(index>0 && index<6){
      allDayForecast += `
      <div class="col-2 style-forecast me-2 ">
              <div class="temperature">
                <span id="max-degree" class="max-degree">${Math.round(
                  eachForecastDay.temperature.maximum
                )}</span
                ><span class="celsius-sign">&#x2103;</span><br /><span
                  id="min-degree"
                  class="min-degree"
                  >${Math.round(eachForecastDay.temperature.minimum)}</span
                ><span class="celsius-sign c-style">&#x2103;</span>
              </div>
              <img
                src="${eachForecastDay.condition.icon_url}"
                alt="${eachForecastDay.condition.icon}"
                class="forecast-img"
              />
              <div class="week-day">${setForecastWeekDay(
                eachForecastDay.time
              )}</div>
            </div>`;
      
    }
  });
  allDayForecast += `</div>`;
  weatherForecastEl.innerHTML = allDayForecast;
}
function getForecast(coordinates, city) {
  let apiKey = "04oabt67c234956913f3d410bfd5b681";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(url).then(displayForecast);
}
function showUserSearch(response) {
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
  showCelsius(event);
  currentTime(new Date(response.data.dt * 1000));
  getForecast(response.data.coord, response.data.name);
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
searchForm.addEventListener("submit", userSearch);

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

// -------------remove Fahrenheit--------------
// function showFahrenheit(event) {
//   event.preventDefault();
//   let fahrenheit = Math.round((celsius * 9) / 5 + 32);
//   document.querySelector("#degree").textContent = fahrenheit;
//   document.querySelector("#celsius").classList.remove("active");
//   document.querySelector("#fahrenheit").classList.add("active");
// }
// const fahrenheitEl = document.getElementById("fahrenheit");
// fahrenheitEl.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  document.querySelector("#degree").textContent = celsius;
  // document.querySelector("#fahrenheit").classList.remove("active");
  // document.querySelector("#celsius").classList.add("active");
}
const celsiusEl = document.getElementById("celsius");
celsiusEl.addEventListener("click", showCelsius);

currentTime(new Date());
handleClick("urmia");
