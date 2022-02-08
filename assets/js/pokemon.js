const pokedex = document.getElementById("pokedex");
var lvl1Pokemon = ["1, 4, 7, 11, 14, 17, 20, 22, 23, 27, 29, 32, 35, 37, 39, 42, 43, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 74, 84, 92, 129"]
var lvl2Pokemon = ["2, 5, 8, 12, 15, 18, 24, 25, 28, 30, 33, 36, 40, 44, 47, 49, 51, 53, 55, 57, 59, 61, 64, 67, 70, 72, 75, 77, 79, 81, 83, 85, 86, 88, 90, 93, 96, 98, 100, 102, 104, 109, 111, 116, 120, 133, 137, 138, 140, 147"]
var lvl3Pokemon = ["3, 6, 9, 25, 31, 34, 38, 45, 62, 65, 68, 71, 73, 76, 78, 80, 82, 87, 89, 91, 84, 95, 97, 99, 101, 103, 105, 106, 107, 108, 110, 112, 113, 114, 115, 117, 119, 121, 122, 123, 124, 125, 126, 127, 128, 134, 135, 136, 137, 139, 141"]
var legendaries = ["26, 130, 131, 132, 142, 143, 144, 145, 146, 147, 148, 149, 150"]


// if #repo-search-term span gets displayed: 
// Search username for repos
// if user has amount of repos 1-10, 10-25, 25-50, 50-75, 75+
// Display different pokemon for each amount
// Repos 1-10=Dookie Pokemon
// 10-25=LvL 1 Pokemon
// 25-50=LvL 2 Pokemon
// 50-75= LvL 3 & No Evolution Pokemon
// 75+= Legendary Pokemon



const fetchPokemon = () => {

    const promises = [];
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
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', ')

        }));
        displayPokemon(pokemon);
    });

};



const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map(
        pokeman => `
    <li>
        <img src="${pokeman.image}"/>
        <h2>${pokeman.id}. ${pokeman.name}</h2>
        <p>Type: ${pokeman.type}</p>
    </li>
    `)
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();

