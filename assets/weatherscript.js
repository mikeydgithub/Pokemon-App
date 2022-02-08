// Set global variables for weather
var citiesListArr = [];
var numOfCities = 9;
var personalAPIKey = "appid=7146bfe32a294fc2979b70219212c7a2";
var unit = "units=imperial";
var dailyWeatherApiStarts =
    "https://api.openweathermap.org/data/2.5/weather?q=";
var dailyUVIndexApiStarts = "https://api.openweathermap.org/data/2.5/uvi?";
var forecastWeatherApiStarts =
    "https://api.openweathermap.org/data/2.5/onecall?";
// Select from html element
var searchCityForm = $("searchCityForm");
var searchedCities = $("#searchedCityLi");

// Get weather info from OpenWeather starts here
var getCityWeather = function (searchCityName) {
    // Format the OpenWeather api url
    var apiUrl =
        dailyWeatherApiStarts + searchCityName + "&" + personalAPIKey + "&" + unit;
    // Make a request to url
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            return response.json().then(function (response) {
                $("#cityName").html(response.name);
                // Display date
                var unixTime = response.dt;
                var date = moment.unix(unixTime).format("MM/DD/YY");
                $("#currentdate").html(date);
                // Display weather icon
                var weatherIconUrl =
                    "http://openweathermap.org/img/wn/" +
                    response.weather[0].icon +
                    "@2x.png";
                $("#weatherIconToday").attr("src", weatherIconUrl);
                $("#tempToday").html(response.main.temp + " \u00B0F");
                $("#humidityToday").html(response.main.humidity + " %");
                $("#windSpeedToday").html(response.wind.speed + " MPH");
                // Return coordinate for getUVIndex to call
                var lat = response.coord.lat;
                var lon = response.coord.lon;
                getUVIndex(lat, lon);
                getForecast(lat, lon);
            });
        } else {
            alert("Please provide a valid city name.");
        }
    });
};
var getUVIndex = function (lat, lon) {
    // Formate the OpenWeather api url
    var apiUrl =
        dailyUVIndexApiStarts +
        personalAPIKey +
        "&lat=" +
        lat +
        "&lon=" +
        lon +
        "&" +
        unit;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // Remove all class background
            $("#UVIndexToday").removeClass();
            $("#UVIndexToday").html(response.value);
            if (response.value < 3) {
                $("#UVIndexToday").addClass("p-1 rounded bg-success text-white");
            } else if (response.value < 8) {
                $("#UVIndexToday").addClass("p-1 rounded bg-warning text-white");
            } else {
                $("#UVIndexToday").addClass("p-1 rounded bg-danger text-white");
            }
        });
};

// Create button starts
var creatBtn = function (btnText) {
    var btn = $("<button>")
        .text(btnText)
        .addClass("list-group-item list-group-item-action")
        .attr("type", "submit");
    return btn;
};
// Create button ends
// Load saved citeis names from localStorage starts here
var loadSavedCity = function () {
    citiesListArr = JSON.parse(localStorage.getItem("weatherInfo"));
    if (citiesListArr == null) {
        citiesListArr = [];
    }
    for (var i = 0; i < citiesListArr.length; i++) {
        var cityNameBtn = creatBtn(citiesListArr[i]);
        searchedCities.append(cityNameBtn);
    }
};
// Load saved citeis names from localStorage ends here
// Save searched city in to local storage starts here
var saveCityName = function (searchCityName) {
    var newcity = 0;
    citiesListArr = JSON.parse(localStorage.getItem("weatherInfo"));
    if (citiesListArr == null) {
        citiesListArr = [];
        citiesListArr.unshift(searchCityName);
    } else {
        for (var i = 0; i < citiesListArr.length; i++) {
            if (searchCityName.toLowerCase() == citiesListArr[i].toLowerCase()) {
                return newcity;
            }
        }
        if (citiesListArr.length < numOfCities) {
            // Create object
            citiesListArr.unshift(searchCityName);
        } else {
            // Control the length of the array. do not allow to save more than 10 cities
            citiesListArr.pop();
            citiesListArr.unshift(searchCityName);
        }
    }
    localStorage.setItem("weatherInfo", JSON.stringify(citiesListArr));
    newcity = 1;
    return newcity;
};
// Save searched city in to local storage ends here
// Create button with searched city starts here
var createCityNameBtn = function (searchCityName) {
    var saveCities = JSON.parse(localStorage.getItem("weatherInfo"));
    // check the searchCityName parameter against all children of citiesListArr
    if (saveCities.length == 1) {
        var cityNameBtn = creatBtn(searchCityName);
        searchedCities.prepend(cityNameBtn);
    } else {
        for (var i = 1; i < saveCities.length; i++) {
            if (searchCityName.toLowerCase() == saveCities[i].toLowerCase()) {
                return;
            }
        }
        // Check whether there are already have too many elements in this list of button
        if (searchedCities[0].childElementCount < numOfCities) {
            var cityNameBtn = creatBtn(searchCityName);
        } else {
            searchedCities[0].removeChild(searchedCities[0].lastChild);
            var cityNameBtn = creatBtn(searchCityName);
        }
        searchedCities.prepend(cityNameBtn);
        $(":button.list-group-item-action").on("click", function () {
            BtnClickHandler(event);
        });
    }
};

// Call functions directly 
loadSavedCity();
// Create button with searched city ends here
// Event handler from submit form starts here
var formSubmitHandler = function (event) {
    event.preventDefault();
    // Name of the city
    var searchCityName = $("#searchCity").val().trim();
    var newcity = saveCityName(searchCityName);
    getCityWeather(searchCityName);
    if (newcity == 1) {
        createCityNameBtn(searchCityName);
    }
};
var BtnClickHandler = function (event) {
    event.preventDefault();
    // Name of the city
    var searchCityName = event.target.textContent.trim();
    getCityWeather(searchCityName);
};
// Event handler from submit form ends here 
// Call functions with submit button starts here 
$("#searchCityForm").on("submit", function () {
    formSubmitHandler(event);
});
$(":button.list-group-item-action").on("click", function () {
    BtnClickHandler(event);
});
// Call functions with submit button ends here

