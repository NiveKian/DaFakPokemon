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
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokeID}`,
      options
    );
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
  let pokemonId = randPokeId();
  pokemon = await getPokemon(pokemonId);
  pokemonName = pokemon.name;
  document.getElementById("pokeImg").src = pokemon.sprites.front_default;
};

const submit = () => {
  let pog = document.getElementById("pokeInput").value.toLowerCase();
  response(pog == pokemonName);
};

const response = (valor) => {
  let bord = document.getElementById("pbox");
  let but = document.getElementById("but")

  if (valor) {
    bord.style.border = "10px solid #22ff00";
    but.style.backgroundColor = "#22ff00";
    but.innerText = "New";
    right++;
  } else {
    bord.style.border = "10px solid #ff9900";
    but.style.backgroundColor = "#ff9900";
    but.innerText = "New";
    wrong++;
  }

  but.onclick = newPoke;
};

const newPoke = () => {
  document.getElementById("pbox").style.border = "";
  document.getElementById("but").style.backgroundColor = "#1b1d1c";
  document.getElementById("but").innerText = "Submit";
  document.getElementById("but").onclick = submit;
  changePoke();
};

changePoke();
