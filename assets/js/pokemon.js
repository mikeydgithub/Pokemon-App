// if #repo-search-term span gets displayed: 
// Search username for repos
// if user has amount of repos 1-10, 10-25, 25-50, 50-75, 75+
// Display different pokemon for each amount
// Repos 1-10=Dookie Pokemon
// 10-25=LvL 1 Pokemon
// 25-50=LvL 2 Pokemon
// 50-75= LvL 3 & No Evolution Pokemon
// 75+= Legendary Pokemon

const pokedex = document.getElementById("pokedex");
var gitUser = document.getElementById("repo-search-term");
var searchForm = document.getElementById("search-form");
var userFormEl = document.querySelector("#search-user-form");
var nameInputEl = document.querySelector("#search-user");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var username = "";
var lvl1Pokemon = [1, 4, 7, 11, 14, 17, 20, 22, 23, 27, 29, 32, 35, 37, 39, 42, 43, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 74, 84, 92, 129]
var lvl2Pokemon = [2, 5, 8, 12, 15, 18, 24, 25, 28, 30, 33, 36, 40, 44, 47, 49, 131, 51, 53, 55, 57, 59, 61, 64, 67, 70, 72, 75, 77, 79, 81, 83, 85, 86, 88, 90, 93, 96, 98, 100, 102, 104, 109, 111, 116, 120, 133, 137, 138, 140, 147]
var lvl3Pokemon = [3, 6, 9, 25, 31, 34, 38, 45, 62, 65, 68, 71, 73, 76, 78, 80, 82, 87, 89, 91, 84, 95, 97, 99, 101, 103, 105, 106, 107, 108, 110, 112, 113, 114, 115, 117, 119, 121, 122, 123, 124, 125, 126, 127, 128, 134, 135, 136, 137, 139, 141]
var legendaries = [26, 130, 132, 142, 143, 144, 145, 146, 147, 148, 149, 150]

$(document).ready(function () {
    $('.sidenav').sidenav();
});

// Array to store GitHub users history
var githubUsr = [];

// append an user in the option list for the "Search For Your Pokemon" field
var createUser = function (user) {

    // append user option to parent users
    $("#users").append("<option value='" + user + "'>");

}

// get the user names from localStorage ghUsers to add as users in the list for the "Search for Partner" field
var usersLs = JSON.parse(localStorage.getItem("ghUsers"));

// if GitHub users in localStorage

if (usersLs) {
    // if GitHub users in localStorage create user options
    var i = 0;

    // then loop over array to load users
    $.each(usersLs, function () {
        // asign values from local storage to users array
        githubUsr[i] = usersLs[i];
        createUser(githubUsr[i]);
        i++;
    });
};

var getUserRepos = function (user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    console.log(user)
    // make a get request to url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayRepos(data, user);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to GitHub");
        });
};


//getUserRepos();

var getUser = function (user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user;

    // make a request to the url
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            displayUser(data, user);
            console.log(data)
        });
    });
};

var addUserName = function (user) {

    var userExists = false;

    // check if the user already exists
    for (var i = 0; i < githubUsr.length; i++) {
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
    username = nameInputEl.value.trim();

    if (username) {
        getUser(username);
        nameInputEl.value = "";
        addUserName(username);
    } //else 
    // alert("Please enter a GitHub username");

    console.log(event);
};

var displayUser = function (repos, searchTerm) {
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    // loop over repos
    if (repos.public_repos >= 0 && repos.public_repos <= 25) {
        fetchKantoPokemon(lvl1Pokemon);


    } else if (repos.public_repos > 25 && repos.public_repos <= 50) {

        fetchKantoPokemon(lvl2Pokemon)

    } else if (repos.public_repos > 50 && repos.public_repos <= 75) {

        fetchKantoPokemon(lvl3Pokemon)

    } else if (repos.public_repos > 75) {

        fetchKantoPokemon(legendaries)

    }
    console.log(repos.public_repos)
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

    }
};

var fetchKantoPokemon = () => {

    var promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        // push promise that is returned from doing the fetch and .then
        // which returns res.json
        // whole thing returns promise that we're adding to our promises array
        promises.push(fetch(url).then((res) => res.json()));
    }

    // iterating through each result 
    // with each one of those its gonna transform it into an object in the form of our choosing
    Promise.all(promises).then((results) => {
        var pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', ')

        }));

        var randPokeman = pokemon[Math.floor(Math.random() * pokemon.length)]

        displayPokemon(randPokeman);

    });

};


var displayPokemon = (pokeman) => {
    console.log(pokeman);
    var pokemonHTMLString =
        `
    <li>
        <img src="${pokeman.image}"/>
        <h2>${pokeman.id}. ${pokeman.name}</h2>
        <p>Type: ${pokeman.type}</p>
    </li>
    `
    pokedex.innerHTML = pokemonHTMLString;
};


userFormEl.addEventListener("submit", formSubmitHandler);



