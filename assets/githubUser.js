var userFormEl = document.querySelector("#search-user-form");
var nameInputEl = document.querySelector("#search-user");

var githubUsr = [];

var getUserRepos = function (user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        });
    });
};

var addUserName = function(user) {

    var userExists = false;

    // check if the user already exists
    for (var i=0; i < githubUsr.length; i++) {
        if (githubUsr[i] == user) {
            userExists = true;
        };
    };
    // if the user doesn't exists
    if (!userExists) {
        // add user to the end of githubUsr array and refresh localStorage ghUsers array
        githubUsr[githubUsr.length] = user;
        localStorage.setItem("ghUsers", JSON.stringify(githubUsr));
    }
};

var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
        // Add username (if new) to LocalStorage and githubUsr array
        addUserName(username);
    } else {
        alert("Please enter a GitHub username");
    }
    console.log(event);
};





userFormEl.addEventListener("submit", formSubmitHandler);




