const offset = 0;
const limit = 1;

const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;


fetch(url)
    .then(function(response){
    return response.json();
})
.then(function(json){
    console.log(json);
})      

.catch(function(error){
    console.log(error);
})
.finally(function(){
    console.log('requisiçao concluida');
});

