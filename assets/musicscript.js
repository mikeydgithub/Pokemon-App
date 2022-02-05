var searchInput = document.getElementById('input').value
var btnEl = document.getElementById('btn')

// pass in user input
searchSong = (song) => {
    var apiUrl = "https://spotify23.p.rapidapi.com/search/?q=q&type=multi&offset=0&limit=10&numberOfTopResults=5"
    var apiHeaders = {
        "x-rapidapi-host": "spotify23.p.rapidapi.com",
        "x-rapidapi-key": "10253f2aadmsh1a6744a84a4e18bp10c58fjsnfc1d2f172ccd"
    }
}


fetch(apiUrl, {
    method: "GET",
    headers: apiHeaders
})

    .then((response) => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    })



btnEl.addEventListener('click', () => {
    e.preventDefault();
    var song = searchInput.value
    val = inputValue.val
    searchInput(song);
})






