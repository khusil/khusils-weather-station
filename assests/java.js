var searchInput = document.querySelector("#search-input");
var findCity = document.querySelector("#search-btn");
var listItemE1 = document.querySelector(".list-group");
var cityCard = document.querySelector("#city-container");
var clickForCity = document.querySelector(".list-group-item");
var saveCities = JSON.parse(localStorage.getItem(".list-group")) || [];

var getWeatherInfo = function (city) {
    
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&appid=8d1c76621b3c56e2c6ba4131cbdbfec9";
        fetch(apiUrl).then(function (response) {
      response.json().then(function (data) {
        var latitude = data.city.coord.lat;
        var longitude = data.city.coord.lon;
  
        return fetch(
          "https://api.openweathermap.org/data/2.5/uvi?lat=" +
            latitude +
            "&lon=" +
            longitude +
            "&appid=8d1c76621b3c56e2c6ba4131cbdbfec9"
        ).then(function (uvResponse) {
          uvResponse.json().then(function (uvData) {
            displayWeather(data, city, uvData);
          });
        });
      });
    });
};
var searchHandler = function (event) {
    event.preventDefault();
  
    var searchInput = document.querySelector("#search-input");
    var city = searchInput.value.trim();
    saveCities[saveCities.length] = city;
    cityHistory(city);
    getWeatherInfo(city);
  
    searchInput.value = "";
    localStorage.setItem(".list-group", JSON.stringify(saveCities));
  };
  
  window.addEventListener("load", function () {
    var list = document.getElementById("city-container");
    for (i = 0; i < saveCities.length; i++) {
      var city = document.createElement("li");
      city.classList.add("list-group-item");
      city.innerHTML = saveCities[i];
      list.appendChild(city);
    }
  

    localStorage.clear();
  });
  
  var displayWeather = function (data, city, uvData) {
  document.querySelector(".weather-data").textContent = "";
    document.querySelector(".card-deck").innerHTML = "";
    var currentTemp = data.list[0].main.temp;
    var currentHumid = data.list[0].main.humidity;
    var currentWind = data.list[0].wind.speed;
    var currentUv = uvData.value;
  