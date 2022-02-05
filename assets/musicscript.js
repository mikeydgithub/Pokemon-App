let inputValue = docucment.getElemenById('input').value
let buttonEl = docoument.getElemenById('btn')


getArtist = (artist) => {
    var apiUrl = `https://spotify23.p.rapidapi.com/${inputValue}/?ids=2w9zwq3AktTeYYMuhMjju8=${apikey}`
    var apiHeaders = {
    "x-rapidapi-host": "spotify23.p.rapidapi.com",
    "x-rapidapi-key": "6386dccc25msh8d0535d2b279a5dp1acbc0jsnb4c82c8210df"
    }
}

var fetchApi = function(){
fetch(apiUrl, {
    method: "GET",
    headers: apiHeaders,
})

    .then(response => {
	console.log(response);
})
    .catch(err => {
	console.error(err);
});

btnEl.addEventListener('click', () => {
    e.preventDefault();
    var song = searchInput.inputValue
    val = inputValue.val
    searchInput(song);
})
