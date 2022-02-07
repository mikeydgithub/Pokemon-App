var userFormEl = document.querySelector("#search-user-form");
var nameInputEl = document.querySelector("#search-user");

var githubUsr = [];

// append an user in the option list for the "Search for Partner" field
var createUser = function(user) {

    // append option to parent users
    $("#users").append("<option value='" + user + "'>");
    
}

// get the user names from localStorage to add as users in the list for the "Search for Partner" field
var usersLs = JSON.parse(localStorage.getItem("ghUsers"));

// if users in localStorage

if (usersLs) {
  // if cities in localStorage create city buttons
  var i =0;
  
  // then loop over array to load tasks
  $.each(usersLs, function() {
          // asign values from local storage to task array
          githubUsr[i] = usersLs[i];
          createUser(githubUsr[i]);
          i++;
      });

  };

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

  
// Add username to githubUsr Array to localStorage and create a new user in the list for the Search for Partner field

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
        createUser(user);
        localStorage.setItem("ghUsers", JSON.stringify(githubUsr));

    }
};

var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);

        // remove and create p element with username
        $(".userGit").remove();
        var userP= $("<P>").addClass("userGit").text(username);
        $("#userName").append(userP);

        nameInputEl.value = "";
        
        // Add username (if new) to LocalStorage and githubUsr array
        addUserName(username);
    } else {
        alert("Please enter a GitHub username");
    }
    console.log(event);
};





userFormEl.addEventListener("submit", formSubmitHandler);




