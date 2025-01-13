
const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 5;

( async () => {


  const fs = require('fs');
  // Pokemons por id
  const pokemonIds = Array.from( {length: TOTAL_POKEMONS}, (_, i) => i + 1 );
  let fileContent = pokemonIds.map( id => `/pokemon/${id}` ).join('\n');
  // Pokemons por page
  for( let index = 1; index <= TOTAL_PAGES; index++ ){
    fileContent += `\n/pokemon/page/${index}`;
  }
  // Pokemons por nombres
  const pokemonNamesList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ TOTAL_POKEMONS }`)
    .then( res => res.json() );

  fileContent += '\n' + pokemonNamesList.results.map( pokemon => `/pokemon/${pokemon.name}` ).join('\n');


 fs.writeFileSync('routes.txt', fileContent);
  // fs.writeFileSync('routes.txt', fileContent);

  console.log('Prerender routes created');

})();
