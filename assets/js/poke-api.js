const pokeApi = {}


function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    pokemon.types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
    pokemon.type = pokemon.types[0];
    pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default;
    pokemon.height = pokeDetail.height / 10;
    pokemon.weight = pokeDetail.weight / 10;
    pokemon.abilities = pokeDetail.abilities.map(a => a.ability.name);
    pokemon.speciesUrl = pokeDetail.species.url;

    return pokemon
    

}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then(response => response.json())
    .then(pokeDetail => {
      const pokemonData = convertPokeApiDetailToPokemon(pokeDetail);
      return fetch(pokemonData.speciesUrl)
        .then(res => res.json())
        .then(speciesData => {
          pokemonData.eggGroup = speciesData.egg_groups.map(g => g.name).join(', ');
          pokemonData.eggCycle = speciesData.hatch_counter;
          return pokemonData;
        });
    });
}


pokeApi.getPokemons =  (offset = 0, limit = 5) =>{ 
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    


    .catch((error) => console.error(error))
        
}


Promise.all([ 
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2'),
    fetch('https://pokeapi.co/api/v2/pokemon/3'),
    fetch('https://pokeapi.co/api/v2/pokemon/4')

]).then((results) => {
    console.log(results);
})

