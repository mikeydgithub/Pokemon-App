const pokedex = document.getElementById("pokedex");
console.log(pokedex)

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
    const pokemonHTMLString = pokemon.map (
         pokeman  => `
    <li>
        <img src="${pokeman.image}"/>
        <h2>${pokeman.id}. ${pokeman.name}</h2>
        <p>Type: ${pokeman.type}</p>
    </li>
    `)
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();