var pokemonName = "";
var right = 0;
var wrong = 0;

const getPokemon = async (pokeID) => {
  const options = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`, options);
    const poke = await response.json();
    return poke;
  } catch (e) {
    return console.log("Api Error: " + e.message);
  }
};

const randPokeId = () => {
  return Math.floor(Math.random() * 893) + 1;
};

const changePoke = async () => {
  var pokemonId = randPokeId();
  pokemon = await getPokemon(pokemonId);
  pokemonName = pokemon.name;
  document.getElementById("pokeImg").src = pokemon.sprites.front_default;
};

const isPoke = () => {
  var pog = document.getElementById("pokeInput").value.toLowerCase();
  response(pog == pokemonName);
};

const response = (valor) => {
  if (valor) {
    console.log("You gotted");
    right++;
  } else {
    console.log("Your wrong buddy");
    wrong++;
  }

  changePoke();
};

// INIT //
changePoke();
