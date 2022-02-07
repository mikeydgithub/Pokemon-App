fetch("https://spotify23.p.rapidapi.com/playlist/?id=37i9dQZF1DX70RN3TfWWJh", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spotify23.p.rapidapi.com",
		"x-rapidapi-key": "d29bf19194mshe8959d50f8d1d6bp1aa53bjsn3b32d72190a4"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});