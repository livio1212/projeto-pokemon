const url = 'https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}';

const offset = 0;
const limit = 1;

fetch(url)
    .then(function(response){
    console.log(response);
})

.catch(function(error){
    console.log(error);
})
.finally(function(){
    console.log('requisiçao concluida');
});

