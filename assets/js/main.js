const limit = 10;
let offset = 0;
const maxRecords = 151

const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonDetail = document.getElementById('pokedex-card')


function renderPokemonDetail(pokemon) {
    const detail = document.getElementById('pokemonDetail');
  
    detail.innerHTML = `
      <section class="pokemon ${pokemon.types[0]}">
        <h1>${pokemon.name}</h1>
        <span class="number">#${pokemon.number}</span>
        <div class="detail">
          <ol class="types">
            ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>
          <img src="${pokemon.photo}" alt="${pokemon.name}">
          <p><strong>Height:</strong> ${pokemon.height} m</p>
          <p><strong>Weight:</strong> ${pokemon.weight} kg</p>
          <p><strong>Abilities:</strong> ${pokemon.abilities.join(', ')}</p>
          <p><strong>Egg Group:</strong> ${pokemon.eggGroup}</p>
          <p><strong>Egg Cycle:</strong> ${pokemon.eggCycle}</p>
        </div>
      </section>
    `;
  }

function convertPokemonToLi(pokemon){
    return ` 
    <li class="pokemon ${pokemon.type}" onclick="">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">

                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
 
                </ol>

                <img src="${pokemon.photo}" 
                alt=${pokemon.name}>
            </div>
            
        </li>
        `
        
}



        
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
    
}
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexpage = offset + limit

    if(qtdRecordsWithNexpage >=maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset, limit)
    }
})




