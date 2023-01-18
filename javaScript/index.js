const searchBtn = document.querySelector("#search-btn");
function showUserSearch(response) {
    // console.log(response)
  let cityEl = document.querySelector("#city");
  let humidityEl = document.getElementById("humidity");
  let windEl = document.getElementById("wind");
  let descriptionEl = document.getElementById("description");
  let degreeEl = document.querySelector("#degree");
  cityEl.innerHTML = response.data.name;
  humidityEl.innerHTML = response.data.main.humidity;
  windEl.innerHTML = Math.round(response.data.wind.speed);
  descriptionEl.innerHTML = response.data.weather[0].description;
  degreeEl.innerHTML = Math.round(response.data.main.temp);
}

function userSearch(event) {
  event.preventDefault();
  const apiKey = "3c065e33596a9deda1b7045f5d3e8811";
  const unit = "metric";
  let city = document.querySelector("#location-input").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(showUserSearch);
}
searchBtn.addEventListener("click", userSearch);
