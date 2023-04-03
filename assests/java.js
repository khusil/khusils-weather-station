var searchInput = document.querySelector("#search-input");
var findCity = document.querySelector("#search-btn");
var listItemE1 = document.querySelector(".list-group");
var cityCard = document.querySelector("#city-container");
var clickForCity = document.querySelector(".list-group-item");
var saveCities = JSON.parse(localStorage.getItem(".list-group")) || [];

var getWeatherInfo = function (city) {
    // format the github api url
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&appid=8d1c76621b3c56e2c6ba4131cbdbfec9";
  
    // make a repo request to the url
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
  