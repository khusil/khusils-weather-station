var searchInput = document.querySelector("#search-input");
var findCity = document.querySelector("#search-btn");
var listItemE1 = document.querySelector(".list-group");
var cityCard = document.querySelector("#city-container");
var clickForCity = document.querySelector(".list-group-item");
var saveCities = JSON.parse(localStorage.getItem(".list-group")) || [];